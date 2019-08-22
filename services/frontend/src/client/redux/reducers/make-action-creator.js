/**
 * Create 'action creators'
 *
 * Usage const myAction = makeActionCreator("MY_ACTION", 'foo', 'bar');
 *
 * then dispatch(myAction("foo value", "bar value"))
 */
export default function makeActionCreator(type, ...argNames) {
    return function(...args) {
        const action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
}
