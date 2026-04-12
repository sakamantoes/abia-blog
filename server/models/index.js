import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

// Create connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Create db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models (ESM style)
import UserModel from './User.js';
import PostModel from './Post.js';
import CommentModel from './Comment.js';
import LikeModel from './Like.js';

// Initialize models
db.User = UserModel(sequelize, Sequelize);
db.Post = PostModel(sequelize, Sequelize);
db.Comment = CommentModel(sequelize, Sequelize);
db.Like = LikeModel(sequelize, Sequelize);

// ================= ASSOCIATIONS =================

// User → Post
db.User.hasMany(db.Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Post.belongsTo(db.User, { foreignKey: 'userId' });

// User → Comment
db.User.hasMany(db.Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId' });

// Post → Comment
db.Post.hasMany(db.Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
db.Comment.belongsTo(db.Post, { foreignKey: 'postId' });

// User → Like
db.User.hasMany(db.Like, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Like.belongsTo(db.User, { foreignKey: 'userId' });

// Post → Like
db.Post.hasMany(db.Like, { foreignKey: 'postId', onDelete: 'CASCADE' });
db.Like.belongsTo(db.Post, { foreignKey: 'postId' });

// ================= EXPORT =================
export default db;