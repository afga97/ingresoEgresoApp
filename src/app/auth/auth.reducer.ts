import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import * as authActions from './auth.actions';

export interface State {
    user?: Usuario;
};

const initialState: State = {
    user: undefined,
};

const _authReducer = createReducer(
    initialState,
    on(authActions.setUser, (state, { user }) => ({ ...state,  user: { ...user }}) ),
    on(authActions.unSetUser, state => ({ ...state, user: undefined }) ),
);

export function authReducer(state : any, action: any) {
    return _authReducer(state, action)
}