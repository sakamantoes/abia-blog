import generateToken from '../utils/generateToken.js';
import db from '../models/index.js'
import asyncHandler from 'express-async-handler';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const userExists = await db.User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await db.User.create({
    name,
    email,
    password,
    role: 'user'
  });

  if (user) {
   const token = generateToken(res, user.id);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  } 

  const user = await db.User.findOne({ where: { email } });

  if (user && (await user.matchPassword(password))) {
   const token = generateToken(res, user.id);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await db.User.findByPk(req.user.id, {
    attributes: { exclude: ['password'] }
  });
  res.json(user);
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getMe
};