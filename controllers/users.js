import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (error) { 
        res.status(404).json({msg: error.message });
    }
}

export const getUserFriends = async(req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => { 
            return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({message: error.message});
    } 
}


// UPDATE
export const addRemoveFriend = async (req,res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => { 
            return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
}

export const notifyUsersComment = async (req, res) => {
    try {
        // console.log(Object.keys(req.body));
        const userIds = Object.keys(req.body);

        // console.log(Object.values(req.body)[0]);

        // now, we're going to loop through each of these guys 
        for (var x = 0; x < userIds.length; x++){
            var user = await User.findById(userIds[x]);
            user.notifications.push(Object.values(req.body)[0]);
            
            await user.save();
        }

    } catch (error){ 
        res.status(404).json({message: error.message});
    }


}

export const notifyUsersLike = async (req, res) => {
    try {

        // console.log(Object.keys(req.body)[0]);
        // console.log(Object.keys(req.body));
        const userId = Object.keys(req.body)[0];
        
        var user = await User.findById(userId);
        user.notifications.push(Object.values(req.body)[0]);
            
        await user.save();
        

    } catch (error){ 
        res.status(404).json({message: error.message});
    }


}

export const getNotifications = async (req,res) => {
    try{
        const { id } = req.params;
        var user = await User.findById(id);
        // console.log(user.notifications);
        res.status(200).json(user.notifications);
    } catch (error){
        res.status(404).json({ message: error.message })
    }
    

}


// this will be called when user navigates to notification screen
export const changeToSeen = async (req,res) => {
    try {
        const { id } = req.params;
        var user = await User.findById(id);

        for (var x = 0; x < user.notifications.length; x++){
            // console.log("isRead: " + user.notifications[x][3]);
            if (user.notifications[x][3] === false){
                console.log("changing...");
                user.notifications[x][3] = true;
            }
        }
        
        // console.log(user.notifications);
        user.markModified('notifications');
        await user.save();

    }catch (error) {
        res.status(404).json({message: error.message });
    }



}

export const getUserMessageById = async (req,res) => {
    try {
        const { id } = req.params;
        const { messageId } = req.params;
        var user = await User.findById(id);
        var messageToSend = user.inbox.get(messageId);
        res.status(200).json(messageToSend.messages);

    } catch(error) { 
        res.status(404).json({message: error.message});
    }
}