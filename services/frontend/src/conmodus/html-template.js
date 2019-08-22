/**
 * Find div with specific id.
 *
 * Groups:
 *      $1 before div
 *      $2 opening div
 *      $3 content inside div
 *      $4 closing div
 */
const getElementById = id => `(.*)(<div\\s+id\\s*=\\s*['"]${id}['"]\\s*>)(.*)(<\\/div>)`;

/**
 * Insert content into the div, any original countent is placed after content.
 *
 * Groups:
 *      $1 before div
 *      $2 opening div
 *      $3 content inside div
 *      $4 closing div
 */
const subStr = content => `$1$2\n$1\t${content}\n$1$3$4`;

/**
 * Insert content into the bottom of head content.
 *
 * Groups:
 *      $1 opening head and it's content
 *      $2 closing head
 */
const headRe = /(<head>(?:.|\n)*)(<\/head>)/;

/**
 * Insert content into the bottom of body content.
 *
 * Groups:
 *      $1 opening head and it's content
 *      $2 closing head
 */
const bodyRe = /(<body>(?:.|\n)*)(<\/body>)/;

/**
 * <html something>
 * Groups:
 *      $1 <html
 *      $2 something
 *      $3 >
 */
const htmlOpeningTag = /(<html)(.*)(>)/;

/**
 * <body something>
 * Groups:
 *      $1 <body
 *      $2 something
 *      $3 >
 */
const bodyOpeningTag = /(<body)(.*)(>)/;

const scriptUrl = url => `<script src="${url}"></script>`;
const linkUrl = url => `<link rel="stylesheet" href="${url}"></link>`;
const scriptWindowData = (id, data) => `<script id="${id}">window.${id}=${JSON.stringify(data).replace(/</g, '\\u003c')};</script>`;

module.exports = config => {
    const markupRe = new RegExp(getElementById(config.reactRoot));

    return function() {
        let html = config.src;
        const worker = {
            insertMarkup: reactDom => {
                html = html.replace(markupRe, subStr(reactDom));
                return worker;
            },
            insertBody: data => {
                html = html.replace(bodyRe, `$1${data}\n$2`);
                return worker;
            },
            insertUrlsHead: urls => {
                const links = urls.map(url => linkUrl(url)).join(' ');
                html = html.replace(headRe, `$1${links}\n$2`);
                return worker;
            },
            insertStateHead: entries => {
                const scripts = entries.map(e => scriptWindowData(e.id, e.data)).join('\n');
                html = html.replace(headRe, `$1${scripts}\n$2`);
                return worker;
            },
            insertHead: data => {
                html = html.replace(headRe, `$1${data}\n$2`);
                return worker;
            },
            insertHtmlOpeningTag: data => {
                html = html.replace(htmlOpeningTag, `$1$2 ${data}$3`);
                return worker;
            },
            insertBodyOpeningTag: data => {
                html = html.replace(bodyOpeningTag, `$1$2 ${data}$3`);
                return worker;
            },
            html: () => html,
        };
        return worker;
    };
};
