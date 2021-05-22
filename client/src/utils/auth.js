import decode from 'jwt-decode';

class AuthService {
    // Decode the tokens data
    getProfile() {
        return decode(this.getToken());
    }

    // Check if user is logged in and if the token is still valid
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // Check if the token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);

            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // Get token from localStorage
    getToken() {
        return localStorage.getItem('fit_friends_token');
    }

    // Store the token in localStorage
    login(idToken) {
        localStorage.setItem('fit_friends_token', idToken);
        window.location.assign('/');
    }

    // Clear user token and profile data from localStorage
    logout() {
        localStorage.removeItem('fit_friends_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();
