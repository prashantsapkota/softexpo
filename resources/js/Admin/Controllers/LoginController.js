import { now, rest } from 'lodash';


function LoginAdmin({data}) {
    console.log(data)
    if (data!=null) {
        const access_token = data.token;
        const user_role = data.role;
        const expires_at = now()+1500;
        const remember_me = false;
        const user = data.user;

    //storing in localstorage
    const status = localStorage.getItem('slot');
    if (status) {
        localStorage.clear()
    }
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user_role',user_role);
    localStorage.setItem('expires_at',expires_at);
    localStorage.setItem('remember_me',remember_me );
    localStorage.setItem('user', user);
    localStorage.setItem('slot',true);
    return true;
    }
    return false;

}

const isAdminLogin = () =>{
    const data = getCurrentData();
    if (data.role=="admin" || data.role=="superadmin") {
        return true;
    }
    return false;
}

const isSuperAdmin = () =>{
    const data = getCurrentData();
    if (data.role=="superadmin") {
        return true;
    }
    return false;
}

function getCurrentData(){
    var data = {
        token: localStorage.getItem('access_token'),
        role: localStorage.getItem('user_role'),
        expiry: localStorage.getItem('expires_at'),
        slot: localStorage.getItem('slot'),
        user: localStorage.getItem('user')
    }
    return data;
}

export { LoginAdmin, isAdminLogin, isSuperAdmin }
