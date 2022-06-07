const { queryUserInfoByEmail, queryAdminByOrganization } = require('./queries');
const bcrypt = require('bcryptjs');

const signupCheck = async function (email, password, confirm_password, organization, permission_type) {

    if (permission_type === 'admin') {
        try {
            const user = await queryAdminByOrganization(organization);
            console.log(user);
            if (user) return 'Cannot register as admin.'
        } catch (error) {
            throw error;
        }
    }

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

const loginCheck = async function (email, password) {
    try {
        const user = await queryUserInfoByEmail(email);
        if (!user) {
            return 'User does not exist.'
        }
        let passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return "Please check your credentials."
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signupCheck,
    loginCheck,
}