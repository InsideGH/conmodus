import React from 'react';
import PropTypes from 'prop-types';
import Message from './message';

// This providers context.
export const Context = React.createContext();

// Each 'message' that is shown have these default options.
const defaultOptions = {
    delay: 400,
    enterDuration: 200,
    showDuration: 800,
    exitDuration: 200,
    untilCancelOrNext: false,
};

// Each message is shown after a certain delay.
// This is to be able to cancel showing a messadge.
const delay = time => {
    let id;
    const promise = new Promise(resolve => {
        id = setTimeout(() => {
            resolve('done');
        }, time);
    });

    return [id, promise];
};

class SnackBarProvider extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            options: null,
        };
        this.cancelShow = null;
        this.cancelHide = null;
        this.services = {
            untilCancelOrNext: payload => this.pushMessage(payload, 'until-cancel'),
            info: payload => this.pushMessage(payload, 'info'),
            error: payload => this.pushMessage(payload, 'error'),
            cancel: () => this.cancel(),
        };
    }

    pushMessage = async (payload, type) => {
        const entry = { ...defaultOptions, ...payload, type };

        // If there is a pending message that has not been shown yet, cancel it.
        this.cancel();

        // Schedule a delayed show of the message.
        // Before waiting the delayed time, save the cancelation id to make it possible
        // to cancel.
        const [id, delayShow] = delay(entry.delay);
        this.cancelShow = id;
        await delayShow;

        if (this.cancelShow) {
            // Show the message.
            this.setState({
                options: { ...entry, animationName: 'enter' },
            });
        }

        const { enterDuration, showDuration, untilCancelOrNext } = entry;
        // If untilCancelOrNext is set to true, we show the message until a cancel
        // is called.
        if (!untilCancelOrNext) {
            const [id, delayHide] = delay(enterDuration + showDuration);
            this.cancelHide = id;
            await delayHide;
            if (this.cancelHide) {
                this.setState({
                    options: { ...entry, animationName: 'exit' },
                });
            }
        }
    };

    // Removes scheduled message that yet has not been shown if 'untilCancelOrNext' was set to true.
    cancel = () => {
        clearTimeout(this.cancelShow);
        clearTimeout(this.cancelHide);
        this.cancelShow = null;
        this.cancelHide = null;
        const { options } = this.state;
        if (options) {
            this.setState({
                options: { ...options, animationName: 'exit' },
            });
        }
    };

    render() {
        const { options } = this.state;
        const { children } = this.props;
        return (
            <Context.Provider value={this.services}>
                {options ? (
                    <Message
                        type={options.type}
                        animationName={options.animationName}
                        enterDuration={options.enterDuration}
                        exitDuration={options.exitDuration}
                    >
                        {options.message}
                    </Message>
                ) : null}
                {children}
            </Context.Provider>
        );
    }
}

SnackBarProvider.propTypes = {
    children: PropTypes.any,
};

export default SnackBarProvider;
