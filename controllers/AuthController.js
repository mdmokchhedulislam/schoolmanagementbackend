
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, schoolId } = req.body;
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      schoolId
    });

    res.status(201).json({ message: "Admin registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, role: user.role, schoolId: user.schoolId },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      res.json({ token, role: user.role, schoolId: user.schoolId });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default { registerAdmin, login }
