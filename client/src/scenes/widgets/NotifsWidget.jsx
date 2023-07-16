import { useDispatch, useSelector } from "@react-redux";
import { setNotifs } from "state";
import NotifWidget from "./NotifWidget";

const NotifsWidget = ({}) => {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const getNotifs = async () => {
        const response = await fetch(`http://localhost:3001/users/${loggedInUserId}/notifications/`,{
            methods: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
    }


}

export default NotifsWidget;