const bcrypt = require('bcrypt');
const User = require('./users.model');
const CustomError = require('../../errors/CustomError');
const signUpUser = async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await User.create(user);
    return newUser.toObject({
        useProjection: true
    });
};

const loginUser = async (user) => {

    const found = await User.findOne({ email: user.loginEmail }).select({ password: 1, email: 1, username: 1 }).lean();

    if (!found) {

        throw new CustomError('User not found', 1);

    }
    const match = await bcrypt.compare(user.loginPassword, found.password);
    if (!match) {
        throw new CustomError('Invalid password', 2);
    }

    const { password, ...rest } = found;
    return rest;
};

module.exports = {
    signUpUser,
    loginUser
};