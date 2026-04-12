import jwt from 'jsonwebtoken'
import db from'../models/index.js'

const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await db.User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }
    
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
};

export {protect} ;