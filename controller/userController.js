const fs = require("fs").promises;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config();
const User = require("../models/userModel");

const storeTo = process.env.STORE_TO;
const user_file = path.join(__dirname, "../data/user.json");

const readDatafile = async (filename) => {
    try {
        const data = await fs.readFile(filename, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = async (filename, data) => {
    await fs.writeFile(filename, JSON.stringify(data), "utf-8");
};

const createToken = ( username ) => {
    const payload = {
      username: username
    };
    const token = jwt.sign(payload, 'qwertyytrewq123321', { expiresIn: '1h' });
    return token;
  }

// create account(signUp)
const signUp = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        if (storeTo === "FS") {
            const users = await readDatafile(user_file);

            const index = users.findIndex((user) => user.email === email);

            if (index !== -1) {
                return res.status(401).json({ message: "Email already exists" });
            }
            const newUser = {
                username,
                email,
                password: hashedPassword,
            };

            users.push(newUser);
            await writeData(user_file, users);
            res.status(201).json(newUser);
        } else if (storeTo === "DB") {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(401).json({ message: "Email already exists" });
            }

            const newUser = new User({
                username,
                email,
                password: hashedPassword
            });

            await newUser.save();
            res.status(200).json(newUser);
        } else {
            return res.status(500).json({ message: "Invalid Storage Configuration" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login
const login = asyncHandler(async (req, res) => {
    try {
        // Validate input data
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let token;

        if (storeTo === "FS") {
            const users = await readDatafile(user_file);
            const index = users.findIndex((u) => u.username === username);

            const passwordMatch = await bcrypt.compare(password, users[index].password);

            if (!passwordMatch) {
                return res.status(401).json({ message: "Password did not match" });
            }
            token = createToken(users[index].username);
        } else if (storeTo === "DB") {
            const foundUser = await User.findOne({ email: user.email });

            if (!foundUser) {
                return res.status(404).json({ message: "User not found in the database" });
            }

            const passwordMatch = await bcrypt.compare(password, foundUser.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid Password" });
            }
            token = createToken(foundUser.username);
        } else {
            return res.status(500).json({ message: "Invalid Storage Configuration" });
        }

       // Set token and send response with success message
res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update user
const updateUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields and user ID are required' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        if (storeTo === "FS") {
            const users = await readDatafile(user_file);

            const index = users.findIndex(user => user.email === email);

            if (index === -1) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user details
            users[index] = {
                username,
                email,
                password: hashedPassword,
            };
            await writeData(user_file, users);
            res.status(200).json(users[index]);
        } else if (storeTo === "DB") {
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(404).json({ message: 'User not found' });
            }

             // Update user details
             existingUser.username = username;
             existingUser.email = email;
             existingUser.password = hashedPassword;
 
             await existingUser.save();
             res.status(200).json(existingUser);
        } else {
            return res.status(500).json({ message: "Invalid Storage Configuration" });
        }

       // Set token and send response with success message
res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = { signUp, login , updateUser};
