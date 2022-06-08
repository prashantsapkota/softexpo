import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import {  withRouter, Link } from 'react-router-dom'
import { getSavedLoginInfo } from './utils/users';
import axios from './axios';
import Pusher from 'pusher-js'
import ReactEmoji from 'react-emoji';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';


function SidebarGroup({room}) {

    const [chatUser, setchatUser] = useState({}); //get recipents
    const currentUser = getSavedLoginInfo(); // current loggedin user
    const [lastMsg, setlastMsg] = useState('');
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        let recipentId = (currentUser.uid===room.user1)?room.user2:room.user1; //find recipent from room
        axios.post('/findUser',{ uid: recipentId }).then((result)=>{
            setchatUser(result.data)
            setloading(false)
        })
    },[room])

    useEffect(() => {

        // Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;

        const pusher = new Pusher('2142cda6d39765cba2a9', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function (data) {
            // alert(JSON.stringify(data));
            if(data.threadId===room._id){
                setlastMsg(data);
            }
            
        });
        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }

    }, [room])


    return (
        
       <Link to={location=>({...location,pathname:`/thread/${room._id}/true`})} exact="true" className="sidebar__links">
            <div className="SidebarChat">
                {  !loading ? (<><Avatar />
            <div className="SidebarChat__info">
                <h2>{room.roomName }</h2>
                <p className={(lastMsg.sender!==currentUser.uid) ? 'recieved':''}>{ ReactEmoji.emojify(lastMsg.message) }</p>
            </div></>) : <>
        <Typography>
            <Skeleton variant="circle" animation="wave" ><Avatar /></Skeleton>
        </Typography>
        <Skeleton width="90%" variant="text"/>
    </>}
            
        </div>
        </Link>
        ) 
           
}

export default withRouter(SidebarGroup)
