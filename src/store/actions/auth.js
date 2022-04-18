import * as actionTypes from "./actionTypes";
// import endpoints from "./endpoints";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


const clearStorage = (identifier) => {
    localStorage.removeItem(identifier);
};

const setStorage = (identifier, value) => {
    localStorage.setItem(identifier, value);
};

const getStorage = (identier) => {
    localStorage.getItem(identier);
}

export const logout = () => {
    const removeItems = ["token", "expirationDate"];
    for (let item in removeItems) {
        clearStorage(item);
    }
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());

        }, expirationTime * 1000);
    }
}

export const auth = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        //replace this endpoints.login with your login endpoint. Also modify the logic of the authentication depending on the requirement and the API.
        fetch("endpoints.login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authData),
        }).then((response) => {
            if (response.status === 401 || response.status === 403) {
                const error = { message: "Access denied!! Wrong credentials", };
                error.statusCode = 401;
                throw error;
            }
            return response.json();
        }).then((response) => {
            const expirationDate = new Date(
                new Date().getTime() + response.expiresIn * 1000
            );
            setStorage("token", response.idToken);
            setStorage("expirationDate", expirationDate);
            dispatch(authSuccess(response.token, response.username));
            dispatch(checkAuthTimeout(response.expiresIn));
        }).catch((err) => {
            console.log(err.message, "[error]");
            if (err.message === undefined) {
                err.message = "Server not responding. Please try again later";
            }
            dispatch(authFail(err.message));
        })
    }
}

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(getStorage("expirationDate"));
            if (expirationDate < new Date()) {
                dispatch(logout());
            }
            else {
                const username = getStorage("username");
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                ));
            }
        }
    };

};