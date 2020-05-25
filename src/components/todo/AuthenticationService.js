import axios from 'axios'
import { API_URL } from '../../Constants.js'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ':' + password)
    }

    createJwtToken(token) {
        return 'Bearer ' + token
    }

    executeJwtAuthenticationService(username, password) {
        //let basicAuthHeader = this.createBasicAuthToken(username, password)
        return axios.post(`${API_URL}/authenticate`,
            {
                username: username,
                password: password
            });
    }

    executeBasicAuthenticationService(username, password) {
        let basicAuthHeader = this.createBasicAuthToken(username, password)
        return axios.get(`${API_URL}/basicauth`, { headers: { authorization: basicAuthHeader } });
    }

    registerSuccessfulLogin(username, password) {
        let basicAuthHeader = this.createBasicAuthToken(username, password)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(basicAuthHeader)
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false;
        return true;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return '';
        return user;
    }

    setupAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()