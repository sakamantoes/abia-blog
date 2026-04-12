import db from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    
    const adminExists = await db.User.findOne({ where: { email: 'admin@abiastate.gov' } });
    
    if (!adminExists) {
      await db.User.create({
        name: 'Admin User',
        email: 'admin@abiastate.gov',
        password: 'Admin123!',
        role: 'admin'
      });
      console.log('Admin user created: admin@abiastate.gov / Admin123!');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    process.exit();
  }
};

seedAdmin();