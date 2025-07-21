const Account = require("../../model/account.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role_id: user.role_id
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};


// Dang ki
module.exports.register = async (req, res) => {
    const { fullName, email, password, phone } = req.body;

    try {
        const existingUser = await Account.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Account({
            fullName,
            email,
            password: hashedPassword,
            phone,
            status: "active"
        });

        await newUser.save();
        res.status(201).json({ message: "Register successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Dang nhap
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Account.findOne({ email });
        if (!user || user.deleted) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = generateToken(user);
        res.status(200).json({ token, user: { fullName: user.fullName, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Dang xuat
module.exports.logout = async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
};
