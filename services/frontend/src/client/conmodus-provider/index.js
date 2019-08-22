import provider from '../../conmodus/provider';

const config = {
    tasks: {
        axios: {
            filter: item => ({
                data: item.data,
            }),
        },
    },
};

export const { withProvider, Provider, Context } = provider.create(config);
