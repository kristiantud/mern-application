import express from "express";
import { 
    getUser,
    getUserFriends,
    addRemoveFriend,
    notifyUsers
    
 } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// represents routes where we grab information
// not updating anything (CUD), just R
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);


// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// POST
router.post("/notify", verifyToken, notifyUsers);


export default router;

