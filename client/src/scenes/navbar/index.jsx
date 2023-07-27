import { useState, useEffect } from "react";
import { Box,
         IconButton,
         InputBase,
         Typography,
         Select,
         MenuItem,
         FormControl,
         useTheme,
         useMediaQuery
 } from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "components/FlexBetween";



const Navbar = () => {

    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);
    // let [notifications, setNotifications] = useState(null);
    let [ dataReturned, setDataReturned ] = useState(false); 
    let [ notifsIsRead, setNotifsIsRead ] = useState(true);
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)") // determines if the current screen size is below x to figure out if user is using smallscreen
    
    
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;


    const fullName = `${user.firstName} ${user.lastName}`;


    // navbar will be in charge of fetching for notifications to see if there are any new ones
    const getNotifs = async () => {
        const response = await fetch (`http://localhost:3001/users/${_id}/notifications`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        })

        const data = await response.json();
        // console.log(data);
        setDataReturned(true);

        for (var x = 0; x < data.length; x++){
            // console.log(data[x][3])
            if (data[x][3] === false) {
                setNotifsIsRead(false);
                break;
            }
        }
        
        
        

        // go over notifications and set isUnread to false if we find a notification with false
        // if (dataReturned){
        //     console.log("notifs: " + notifications);    
        // } else {
        //     console.log("no data returned.");
        // }
        
        // const data = await response.json();
        // setNotifications(data);  
    }

    

    useEffect(() => {
        getNotifs();
        
    }, [])



    return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            <Typography 
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                onClick={()=> navigate("/home")}
                sx={{
                    "&:hover" : {
                        color: primaryLight,
                        cursor: "pointer",
                    },
                }}
                >
                False Social
            </Typography>
            {isNonMobileScreens && (
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                    <InputBase placeholder="Search..."></InputBase>
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>
        {/* DESKTOP NAV*/ }
        {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
            <IconButton onClick={()=> dispatch(setMode())}>
                { theme.palette.mode === "dark" ? (
                    <DarkMode sx={{fontSize: "25px"}}></DarkMode>
                ) : (
                    <LightMode sx={{color: dark, fontSize: "25px"}}></LightMode>
                )}
            </IconButton>
            <IconButton>
                <Message sx={{color: dark, fontSize: "25px"}} onClick={() => navigate("/messages")}></Message>
            </IconButton>
            
            {(notifsIsRead === true ? (
                <IconButton>
                    <Notifications onClick={() => navigate("/notifications")} sx={{color: dark, fontSize: "25px"}} />
                </IconButton>
            ) : (
                <IconButton sx={{backgroundColor: "rgba(255, 0, 0, 0.5)"}}>
                    <NotificationImportantIcon onClick={() => navigate("/notifications")} sx={{color: dark, fontSize: "25px"}} />
                </IconButton>
            ))}
            {/* <IconButton>
                <Notifications onClick={() => navigate("/notifications")} sx={{color: dark, fontSize: "25px"}} />
            </IconButton> */}
            <Help sx={{color: dark, fontSize: "25px"}}></Help>   
            <FormControl variant="standard" value={fullName}>
                <Select value={fullName}
                sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    padding: "0.25rem 1rem",
                    "& .MuiSvgIcon-root" : {
                        pr: "0.25rem",
                        width: "3rem"
                    },
                    "& .MuiSelect-select:focus" : {
                        backgroundColor: neutralLight
                    }
                    }}
                    input={<InputBase></InputBase>}
                >
                    <MenuItem value={fullName}>
                        <Typography>
                            {fullName}
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setLogout())}>
                        Log Out
                    </MenuItem>
                </Select>
            </FormControl>  
        </FlexBetween>
        ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
            <Menu></Menu>
        </IconButton>)}

        {/*MOBILE NAV*/}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" backgroundColor={background}>
                {/* CLOSE ICON */ }
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Close></Close>
                    </IconButton>
                </Box>

                {/*MENU ITEMS*/}
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <IconButton onClick={()=> dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{fontSize: "25px"}}></DarkMode>
                        ) : (
                            <LightMode sx={{color: dark, fontSize: "25px"}}></LightMode>
                        )}
                    </IconButton>
                    <Message sx={{color: dark, fontSize: "25px"}}></Message>
                    <Notifications sx={{color: dark, fontSize: "25px"}} />
                    <Help sx={{color: dark, fontSize: "25px"}}></Help>   
                    <FormControl variant="standard" value={fullName}>
                        <Select value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "150px",
                            borderRadius: "0.25rem",
                            padding: "0.25rem 1rem",
                            "& .MuiSvgIcon-root" : {
                                pr: "0.25rem",
                                width: "3rem"
                            },
                            "& .MuiSelect-select:focus" : {
                                backgroundColor: neutralLight
                            }
                            }}
                            input={<InputBase></InputBase>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>
                                    {fullName}
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>  
                </FlexBetween>
                
            </Box>
        )}
    </FlexBetween>
    )
};

export default Navbar;