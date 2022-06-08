import { htmlPrefilter } from 'jquery'
import React, { useEffect, useState } from 'react'
import { AdminAxios } from '../../../axios'

function Notifications() {
    const [notifications, setnotifications] = useState([])
    useEffect(() => {
        AdminAxios.get('getNotifications').then(res=>setnotifications(res.data))
    }, [])
    return (
        <div className="card">
            {
                notifications.map((n,i)=>{
                return <p key={i}>{htmlPrefilter(n.notification)}</p>
            })
            }
        </div>
    )
}

export default Notifications
