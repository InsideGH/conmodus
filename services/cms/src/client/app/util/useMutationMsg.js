import { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Context } from '../providers/snack-bar/snack-bar';

const defaultMsg = {
    loading: 'Please wait',
    error: '',
};

const useMutationMsg = (query, options = {}) => (msgOptions = {}) => {
    const message = useContext(Context);

    const onCompleted = data => {
        message.cancel();
        if (options.onCompleted instanceof Function) {
            options.onCompleted(data);
        }
    };

    const [mutation, variables] = useMutation(query, { ...options, onCompleted });

    const msg = { ...defaultMsg, ...msgOptions };
    const { loading, error } = variables;

    useEffect(() => {
        if (loading) {
            message.info({ message: `${msg.loading}`, untilCancelOrNext: true });
        } else if (error) {
            message.error({ message: `${msg.error} ${error.message}`, untilCancelOrNext: true });
        }
    }, [loading, error]);

    return [mutation, variables];
};

useMutationMsg.propTypes = {};

useMutationMsg.propTypes = {};

export default useMutationMsg;
