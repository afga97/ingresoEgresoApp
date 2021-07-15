import { createReducer, on } from '@ngrx/store';
import * as uiActions from './ui.actions';

export interface State {
    isLoading: boolean;
};

const initialState: State = {
    isLoading: false,
};

const _uiReducer = createReducer(
    initialState,
    on(uiActions.isLoading, state => ({ ...state, isLoading: true }) ),
    on(uiActions.stopLoading, state => ({ ...state, isLoading: false }) )
);

export function uiReducer(state : any, action: any) {
    return _uiReducer(state, action)
}