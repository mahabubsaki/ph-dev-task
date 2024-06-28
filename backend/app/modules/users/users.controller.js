
const catchAsync = require("../../utils/catchAsync");
const { signUpUser, loginUser } = require("./users.service");


const signUpController = catchAsync(async (req, res) => {
    const { email, password, username } = req.body;
    const result = await signUpUser({ email, password, username });

    res.send({ success: true, message: 'Signup successful', data: result });
});

const loginController = catchAsync(async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    const result = await loginUser({ loginEmail, loginPassword });

    res.send({ success: true, message: 'Login successful', data: result });
});

const meController = catchAsync(async (req, res) => {
    const { id, email, username } = req.user || {};
    res.send({ success: true, message: 'User is verified', data: { id, email, username } });
});

module.exports = {
    signUpController, loginController, meController
};