import { connect } from 'react-redux';
import { decrease } from '../../../../redux/reducers/counter/actions';
import ExampleReduxClass from '../component/redux-class';
import { fetchQuote } from '../../../../redux/reducers/counter/actions';

const mapStateToProps = state => {
    return { ...state.counterReducer };
};

const mapDispatchToProps = dispatch => {
    return {
        decrease: amount => {
            dispatch(decrease(amount));
        },
        fetchQuote: ctx => {
            /**
             * Just need to wrap your thunk in the 'register' function.
             * On browser, it returns your thunk.
             * On server, it returns an empty function and resolves the thunk later.
             */
            dispatch(ctx.ssrThunk('fetch-quote', fetchQuote()));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExampleReduxClass);
