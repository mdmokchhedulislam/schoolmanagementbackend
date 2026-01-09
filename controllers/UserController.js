

import bcrypt from 'bcryptjs';
import User from '../model/User.js';
 const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role, 
      schoolId: req.user.schoolId  
    });

    res.status(201).json({
      success: true,
      message: `${role} created successfully`,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default createUser