// const [Rooms, setRooms] = useState([])

import axios from "../axios";

const saveLoginInfo = (data) =>{
    // console.log(data);
    return localStorage.setItem('userInfo', JSON.stringify(data));
}

const getSavedLoginInfo = () =>{
    if( localStorage.getItem('userInfo') ){
        var data = localStorage.getItem('userInfo');
        return JSON.parse(data);
    }
    return false;
}

const clearSavedInfo = ()=>{
    if(localStorage.getItem('userInfo')){
        localStorage.setItem('userInfo','');
        // localStorage.setItem('threads','');
        // localStorage.clear()
        return true;
    }
    return null;
}

const getThreadRecipent = (roomId)=>{
    if( localStorage.getItem('threads') ){
        var data =  JSON.parse(localStorage.getItem('threads'));
        let threadItem = {};
        for (const thread in data) {
            if (Object.hasOwnProperty.call(data, thread)) {
                const element = data[thread];
                if(element.id===roomId){
                    threadItem =  element;
                   
                    break;
                } 
            }
        }
       
        if (threadItem) {
            return threadItem;
        }
        return null;
    }
    return null;
}

const SaveThreads = async(Threads) => {
    const currentUser = getSavedLoginInfo();
    let threadsData = [];
      let i = 0;
      async function getThreadsData(){
      for (const key in Threads) {
        if (Object.hasOwnProperty.call(Threads, key)) {
          const element = Threads[key];
          let recipentId = (currentUser.uid===element.user1)?element.user2:element.user1;
          await axios.post('/findUser',{uid:recipentId}).then((res)=>{
            let data = {
              displayname: res.data.displayName,
              photoUrl:  res.data.photoUrl,
              recipentId: recipentId,
              id:element._id
            }
            threadsData[i] = data;
            i++;
        })
      
        }
      }
    }
    return await getThreadsData().then(()=>localStorage.setItem('threads',JSON.stringify(threadsData)));
    
}
const getThreads = () =>{
    return JSON.parse(localStorage.getItem('threads')) || []
}


export { saveLoginInfo, getSavedLoginInfo, clearSavedInfo, getThreadRecipent, SaveThreads, getThreads }
