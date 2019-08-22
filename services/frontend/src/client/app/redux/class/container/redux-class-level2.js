import { connect } from 'react-redux';
import { decrease } from '../../../../redux/reducers/counter/actions';
import ExampleReduxClassLevel2 from '../component/redux-class-level2';
import { fetchQuote2 } from '../../../../redux/reducers/counter/actions';

const mapStateToProps = state => {
    return { ...state.counterReducer };
};

const mapDispatchToProps = dispatch => {
    return {
        decrease: amount => {
            dispatch(decrease(amount));
        },
        fetchQuote2: ctx => {
            /**
             * Just need to wrap your thunk in the 'register' function.
             * On browser, it returns your thunk.
             * On server, it returns an empty function and resolves the thunk later.
             */
            dispatch(ctx.ssrThunk('fetch-quote2', fetchQuote2()));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExampleReduxClassLevel2);
