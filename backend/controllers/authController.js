const User = require('../models/userModel')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils');







const register = async (req, res) => {
    const { name, email, password } = req.body;

    const findUserByEmail = await User.findOne({ email: email });
   

    if (!findUserByEmail) {
      
       const user = await User.create({ name, email, password})

        

        // generate token
        const tokenUser = createTokenUser(user);
        attachCookiesToResponse({ res, user: tokenUser });

    
        // send verification token back only while testing in postman!!!
        res.status(StatusCodes.CREATED).json({
            msg: 'Success! Please check your email to verify account',
            user: tokenUser
        });

    } else {
        throw new BadRequestError('User Already Exists')
    }

}


const login = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    if (!email || !password) {
        throw new BadRequestError('Please provide userName and password')
    }
    const user = await User.findOne({ email });

    // check if user exists
    if (!user) {
        throw new NotFoundError('User doesn\'t exist. Please create account and try again')
    }

    // compare password

    const isPasswordCorrect = user.email === email && user.comparePassword(password)
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }



    // generate token
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: tokenUser, id: user._id });
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
}
const getUserDetails = async (req, res) => {
    const { _id } = req.user;
    console.log(_id)
        const user = await User.findOne({ _id: _id }).select('-password');
        if (!user) {
            throw new CustomError.NotFoundError(`No user with id : ${_id}`);
        }
        res.status(StatusCodes.OK).json({ user });

}

module.exports = {
    register,
    login,
    logout,
    getUserDetails
}