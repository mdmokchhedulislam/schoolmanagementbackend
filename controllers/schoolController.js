
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import School from '../model/School.js';
import User from '../model/User.js';

export const registerSchool = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, subdomain, address, contactEmail, adminName, password } = req.body;
    // console.log(name);
    


    const existingSchool = await School.findOne({ subdomain });
    if (existingSchool) {
      return res.status(400).json({ message: "Subdomain already exists!" });
    }


    const newSchool = await School.create([{
      name,
      subdomain,
      address,
      contactEmail,
      subscription: {
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // ৩০ দিনের ফ্রি ট্রায়াল
      }
    }], { session });

  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create([{
      name: adminName,
      email: contactEmail,
      password: hashedPassword,
      role: 'admin',
      schoolId: newSchool[0]._id
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ 
      success: true, 
      message: "School and Admin account created successfully!" 
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getSchoolProfile = async (req, res) => {
  try {
    const school = await School.findById(req.user.schoolId);
    if (!school) return res.status(404).json({ message: "School not found" });
    res.status(200).json({ success: true, data: school });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};