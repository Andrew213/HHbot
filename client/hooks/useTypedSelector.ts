import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store';

// хук типизирует селекторы

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
