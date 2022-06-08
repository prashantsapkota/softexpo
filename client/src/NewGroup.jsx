// import axios from './axios';
import React, { useState, useEffect } from 'react'
import './NewGroup.css';
import { getSavedLoginInfo, getThreads } from './utils/users';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import axios from './axios';
import { useHistory } from 'react-router';
// import { getThreadRecipent } from './utils/users';

function NewGroup() {
    const history = useHistory();
    const [Threads, setThreads] = useState('');
    const [GroupName, setGroupName] = useState('');
    const User = getSavedLoginInfo();
    const [Members, setMembers] = useState([User.uid]);

    useEffect(() => {
      let threads  = getThreads();
      setThreads(threads);
      console.log(threads);
    }, [])

    const addMembers = (e) =>{
      if(Members.includes(e.target.value,0)){
        let index = Members.indexOf(e.target.value);
        delete Members[index];
        setMembers(Members.filter(item => item))
      }else{
        setMembers([...Members, e.target.value]);
      }
    }

    const HandleSubmit = (e) =>{
      e.preventDefault()
      if(!GroupName){
        return alert("Enter a group name");
      }
      if(Members.length < 3){
        return alert("Select at least two members");
      }
      axios.post('/createNewGroup',{roomName: GroupName, members: Members}).then((result)=>{
          history.push(`/thread/${result.data._id}/true`);
      })
    }

  
    return (
     
        <>
          <div className="newgroup">
            <div className="newgroup__input">
            <label htmlFor="groupName">Group Name</label>
              <input type="text" id="groupName" onChange={(e)=>setGroupName(e.target.value)} />
              </div>
              <div className="newgroup__members">

              <h3>Add Members </h3>
              <div className="newgroup__members__list">
                { Threads && Threads.map(value=>{
                    return  <FormControlLabel
                    control={<Checkbox value={value.recipentId} onChange={(e)=>addMembers(e)} />}
                    label={value.displayname}
                  />
                })}
                </div>
          </div>
          <div className="newgroup__create">
            <button onClick={(e)=>HandleSubmit(e)}>Create Group</button>
          </div>
          </div>
        </>
    )
}

export default NewGroup
