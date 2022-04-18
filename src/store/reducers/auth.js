import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";
const initialState = {
    token: null,
    username: null,
    loading: false,
    error: null
};

const resetState = {
    token: null,
    username: null,
    loading: false,
    error: null
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, { token: action.token, username: action.username, loading: false, error: null })
}

const authFail = (state, action) => {
    return updateObject(state, updateObject(resetState, { error: action.error }))
};

const authLogout = (state, action) => {
    return updateObject(state, resetState);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    }
};

export default reducer;