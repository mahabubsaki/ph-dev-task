// custome error code by message
// const obj ={
//     1:"User not found",
//     2:"Invalid password",
//     3:"Account with email already exist",
//     4:"Account with username already exist",
//     5:"Document failed validation",
//     6:"Invalid email address",
//     7:"Password must be at least 8 characters",
//     8:"Username must be at least 2 characters",
//     9:"Invalid email address",
//     10:"Password must be at least 8 characters"

// }


function CustomError(message = "", code) {
    this.name = "CustomError";
    this.code = code;
    this.message = message;
}

CustomError.prototype = Error.prototype;
module.exports = CustomError;