import express from "express";
import { 
    getUser,
    getUserFriends,
    addRemoveFriend,
    notifyUsersComment,
    notifyUsersLike,
    getNotifications,
    changeToSeen,
    getUserMessageById
    
 } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// represents routes where we grab information
// not updating anything (CUD), just R
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/notifications", verifyToken, getNotifications);
router.get("/:id/messages/:messageId", verifyToken, getUserMessageById)


// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// POST
router.post("/notifyComment", verifyToken, notifyUsersComment);
router.post("/notifyLike", verifyToken, notifyUsersLike);

// UPDATE
router.post("/:id/notifications", verifyToken, changeToSeen);


export default router;

