import express from "express";
import { 
    getUser,
    getUserFriends,
    addRemoveFriend,
    notifyUsersComment,
    notifyUsersLike
    
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
router.post("/notifyComment", verifyToken, notifyUsersComment);
router.post("/notifyLike", verifyToken, notifyUsersLike);


export default router;

