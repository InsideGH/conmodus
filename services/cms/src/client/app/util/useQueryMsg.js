import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Context } from '../providers/snack-bar/snack-bar';

const defaultMsg = {
    loading: 'Loading',
    error: '',
};

const useQueryMsg = (query, options = {}) => (msgOptions = {}) => {
    const message = useContext(Context);

    const onCompleted = data => {
        message.cancel();
        if (options.onCompleted instanceof Function) {
            options.onCompleted(data);
        }
    };

    const { loading, error, ...rest } = useQuery(query, { ...options, onCompleted });
    const msg = { ...defaultMsg, ...msgOptions };

    useEffect(() => {
        if (loading) {
            message.info({ message: `${msg.loading}`, untilCancelOrNext: true });
        } else if (error) {
            message.error({ message: `${msg.error} ${error.message}`, untilCancelOrNext: true });
        }
    }, [loading, error]);

    return { loading, error, ...rest };
};

useQueryMsg.propTypes = {};

useQueryMsg.propTypes = {};

export default useQueryMsg;
