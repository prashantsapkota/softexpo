import React, { useState, useEffect} from 'react'
// import {  Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { getSavedLoginInfo } from './utils/users'
import './Home.css';
import { Button } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import axios from './axios';
import AddCommentIcon from '@material-ui/icons/AddComment';
// import PageviewIcon from '@material-ui/icons/Pageview';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import Sidebar from './Sidebar';
import { Loading } from './Loading';

function Home() {
    const [UserInfo, setUserInfo] = useState('')
    const [FindUser, setFindUser] = useState('');
    const [buddy,setBudy] = useState('');
    const [loading, setloading] = useState(false)
    const Threads = JSON.parse(localStorage.getItem('threads')) || [];
    const history = useHistory()
    useEffect(() => {
        let data = getSavedLoginInfo();
        if(data){
            setUserInfo(data);
        }
        var v = document.body;
        v.className = "application_home";
    }, [])

    const chatWithBuddy = () =>{
        if(buddy){
            const data = buddy;
            const roomData = {
                user1:UserInfo.uid,
                user2:data.uid,
            }

            const checkRoom = Threads.filter(value =>{
                if((value.user1===roomData.user1 && value.user2===roomData.user2) || (value.user2===roomData.user1 && value.user1===roomData.user2)){
                    return value;
                }else{
                    return null;
                }
            })
            console.log(checkRoom);
            if(checkRoom.length > 0){
                return history.push(`/thread/${checkRoom[0]._id}`);
            }

            axios.post('/createNewRoom',roomData).then((result)=>{
                if(result.data){
                    console.log(result.data);
                    return history.push(`/thread/${result.data._id}`);
                }
                else{
                    alert("500 error");
                }
            })

        }
    }

    const FindUSerInDatabase = (e) =>{
        e.preventDefault();
        setloading(true);
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(FindUser)) {
            setloading(false);
            return alert("Please enter valid email")
        }
        if (FindUser==UserInfo.email) {
            setFindUser('');
            setloading(false);
            return alert("Oops! you entered your own email")
        }
        // console.log(FindUser);
        axios.post('/findUser',{email: FindUser}).then((result)=>{
            setBudy(result.data)
            setFindUser('');
            setloading(false);
        })
    }

   
    return (
        <>
         {/* <Sidebar /> */}
        <div className="home">
            <div className="home__profile">
                <img
                    src={UserInfo.photoUrl}
                    alt="profile"
                />
                <h2>{UserInfo.displayName}</h2>
                <p>{UserInfo.email}</p>
                <p>{UserInfo.phone}</p>
                <p>GChat Buddies : {Threads.length}</p>
                <div className="home__finder">
                <label htmlFor="buddy">Find by email</label>
                <div className="home__finder__form">
                    <SearchOutlined />
                    <input type="email" onChange={e=>setFindUser(e.target.value)} placeholder="Add new buddy" id="buddy" />
                    <Button onClick={e=>FindUSerInDatabase(e)}>
                       <FindReplaceIcon /> Find</Button>
                </div>
               
                {
                    loading ? <Loading loading={loading} /> : 
                    buddy && 
                    <div className="buddy_profile">
                        <img src={buddy.photoUrl} alt={buddy.displayName} />
                        <div className="buddy_profile__name">
                        <h4>
                        {buddy.displayName}
                        </h4>
                        <br/>
                        <Button onClick={ ()=>chatWithBuddy() }>
                            <AddCommentIcon /> <span>GChat now</span>
                        </Button>
                    </div>
                    </div>
                }
            </div>
            </div>
        </div>
        </>
    )
}

export default Home
