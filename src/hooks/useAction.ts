import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store';

const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreators.default, dispatch);
};

export default useAction;
