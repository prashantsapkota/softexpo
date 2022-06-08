function isLogin(){
    return true;
}



function validator(object, rules){
    for (const key in rules) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            const rule = rules[key];
            if (rule=="required") {
                if (element=='') {
                    var msg = key + " is required";
                    alert(msg);
                    return false;
                }
                continue;

            }

        }
        var msg = "key not found ["+key+"] in object";
        console.log(msg);
        return false;
    }
    return true;
}

function redirectApp(route){
    return location.href=route;
}

export { isLogin, validator, redirectApp };
