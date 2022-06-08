import React, { useState, useEffect } from 'react'
import './Sidebar.css';
import { AppBar, Avatar, Box, IconButton, Tab, Tabs, Typography } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import SidebarChat from './SidebarChat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from './firebase';
import { clearSavedInfo, getSavedLoginInfo, SaveThreads } from './utils/users';
import axios from './axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Loading } from './Loading';
import SidebarGroup from './SidebarGroup';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



function Sidebar() {

    const [loading, setloading] = useState(true);
    const history = useHistory();
    const [value, setValue] = React.useState(0);
    const [Groups, setGroups] = useState([]);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const User = getSavedLoginInfo();
    const [Threads, setThreads] = useState([]);
    useEffect(() => {
        async function fetchRoom() {
            if (User) {
                await axios.post('/getAllrooms', { id: User.uid }).then((result) => {
                    setThreads(result.data)
                    SaveThreads(result.data);
                    setloading(false);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
        fetchRoom();

    }, [])

    useEffect(() => {
        async function fetchGroups() {
            if (User) {
                await axios.post('/getAllgroups', { id: User.uid }).then((result) => {
                    setGroups(result.data)
                    // SaveGroups(result.data);
                    console.log(result.data)
                    setloading(false);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
        fetchGroups();
    }, [])


    const signOut = (e) => {
        e.preventDefault();
        auth.app.auth().signOut().then(() => {
            clearSavedInfo();
            return history.push(`/`);

        }).catch((error) => {
            alert(error)
        });
    }
    return (
        <div className="sidebar" >
            <div className="sidebar__header">
                <Link to="/">
                    <Avatar src={User && User.photoUrl} />
                </Link>
                <div className="sidebar__headerRight">
                    <p>{User.displayName}</p>

                    <IconButton onClick={e => signOut(e)}>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">

                    <Link to={location => ({ ...location, pathname: `/createNewRoom` })}>
                        <IconButton>
                            <GroupAddIcon /><span className="createNewGroup">Create a group</span>
                        </IconButton>
                    </Link>

                </div>
            </div>
            <div className="sidebar__tabs">
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="tabs">
                        <Tab label="General" {...a11yProps(0)} />
                        <Tab label="Groups" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                <div className="sidebar__chats">
                {loading ? <Loading loading={loading} /> : (Threads.map(index => {
                    return <SidebarChat room={index} key={index._id} />
                }))}

            </div>
            </TabPanel>
                <TabPanel value={value} index={1}>
                <div className="sidebar__chats">
                    {loading ? <Loading loading={loading} /> : (Groups.map(index => {
                        return <SidebarGroup room={index} key={index._id} />
                    }))}
                </div> 
            </TabPanel>

            </div>
           
        </div>
    )
}

export default Sidebar
