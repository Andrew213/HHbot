import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store';

const useAction = () => {
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return bindActionCreators(actionCreators.default, dispatch);
};

export default useAction;
