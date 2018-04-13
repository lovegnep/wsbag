/**
 * Created by Administrator on 2018/4/13.
 */

//返回随机姓名
function randomName(){

}

//验证合法性，帐号1，密码2，昵称3
function validate(str, index){
    switch(index){
        case 1:
            if(!str || str.length < 4){
                return {message: '帐号太短，必须大于4个字符', status:0};
            }else{return {message: '帐号合法', status:1};}
            break;
        case 2:
            if(!str || str.length < 10){
                return {message: '密码非法', status:0};
            }else{return {message: '密码合法', status:1};}
            break;
        case 3:
            if(!str || str.length < 4){
                return {message: '昵称非法', status:0};
            }else{return {message: '昵称合法', status:1};}
            break;
        default:
            Logger.error('validate: invalid index.');
    }
}

//验证url的合法性
function isUrlValid(url){
    let reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    if(!reg.test(url)){
        return {status:0, message:"这网址不是以http://https://开头，或者不是网址！"};
    }
    else{
        return {status:1};
    }
}

exports = {
    randomName: randomName,
    validate: validate,
    isUrlValid: isUrlValid,
};
Object.assign(module.exports, exports);