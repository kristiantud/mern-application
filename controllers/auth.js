import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// REGISTER USER

export const register = async (req,res) => { 
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        
        const savedUser = await newUser.save();
        res.status(201).send({msg: "success"});  // send user back (user created) if there's no error, important to send back to prevent blocking but lemme try something real quick
        // we don't need to send back the savedUser to the frontend client because this is a security risk, this will cause the password, even though it is hashed, to be sent back which is a security risk
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

// LOGGING IN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});

        if (!user){
            return res.status(400).json({ msg: "User doesn't exist."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            console.log("invalid credentials");
            return res.status(400).json({ msg: "Invalid credentials."});
        }
        
        

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user })
        
    } catch(error){
        res.status(500).json({error: error.message});
    }
}


