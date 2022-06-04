const { queryUserInfoByEmail } = require('./queries');

const signupCheck = async function (email, password, confirm_password) {
    let user;
    if (!email || email.trim().length === 0) return 'email not vsalid';
    try {
        user = await queryUserInfoByEmail(email);
        if (user) return 'User already exist.';
    } catch (error) {
        throw error['message'];
    }
    if (password.trim().length === 0 || !password) return 'Password invalid.';
    if (password.trim() != confirm_password.trim()) return 'Passwords does not match.';
}


const loginCheck = function (email, password, confirm_password) {


}


module.exports = {
    signupCheck,
    loginCheck,
}
