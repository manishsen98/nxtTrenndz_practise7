import User from "../models/User.mjs"
import jwt from 'jsonwebtoken';




const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the required fields are present
    if (!username || !email || !password  ) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const newUser = await User.create({ username, email });
    res.status(200).json({ user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    // Check if the error is a validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', details: error.errors });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  


const login = async (req, res) => {
  try {
    // Assuming you have a valid username and password validation logic here
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error_msg: 'username and password required' });
    }

    // Check if the user exists in your database
    const user = await User.findOne({ username });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If the username and password are valid, create a JWT token
    const token = jwt.sign({ userId: user._id }, 'test', { expiresIn: '60' });

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export {register, login }









