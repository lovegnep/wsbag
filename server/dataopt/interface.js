const Config = require('../config');
const Logger = require('../common/logger');
const Model = require('./model');

//注册帐号
function newAccount(data, cb){
    let user = new Model.UserModel({...data});
    user.save(function(err, doc){
        if(err){
            Logger.error('newAccount: save err.', data);
            cb(err, doc);
        }else{
            Logger.debug('newAccount: save success.', data);
            cb(null, doc);
        }
    });
}

//查找帐号
function getAccount(account, cb){
    Model.UserModel.findOne({account}, function(err, doc){
        if(err){
            Logger.error('getAccout: failed,err:',err);
            cb(err, doc);
        }else{
            Logger.debug('getAccount: success');
            cb(null, doc);
        }
    });
}

//修改密码
function modifyPasswd(old, data, cb){
    old.passwd = data.passwd;
    old.save(function(err, doc){
        if(err){
            Logger.error('modifyPasswd: save err.', old, data);
            cb(err, doc);
        }else{
            Logger.debug('modifyPasswd: save success.', old, data);
            cb(null, doc);
        }
    });
}

//新建收藏
function newCollection(data, cb) {
    if (!data || !data.url) {
        return Logger.error('newCollection !data || !data.url');
    }
    let collection = new Model.Collection({
        url: data.url,
        abstract: data.abstract,
        account: data.account
    });
    collection.save(function (err, doc) {
        if (err) {
            Logger.error('newCollection: save error.', data);
            cb(err, doc);
        } else {
            Logger.debug('newCollection: save success.', data);
            cb(null, doc);
        }
    });
}

//修改收藏
function modifyCollection(old, data, cb){
    Object.assign(old, data);
    old.save(function(err, doc){
        if (err) {
            Logger.error('modifyCollection: save error.', data);
            cb(err, doc);
        } else {
            Logger.debug('modifyCollection: save success.', data);
            cb(null, doc);
        }
    });
}

//删除收藏
function rmCollection(old, cb){
    old.delete = true;
    old.save(function(err, doc){
        if (err) {
            Logger.error('rmCollection: save error.', data);
            cb(err, doc);
        } else {
            Logger.debug('rmCollection: save success.', data);
            cb(null, doc);
        }
    });
}

//查询收藏
function getCollection(query, option, cb){
    Model.Collection.find(query, {}, option, function(err, docs){
        if(err){
            Logger.error('getCollection: error:',err);
            cb(err, docs);
        }else{
            Logger.debug('getCollection: success.');
            cb(null, docs);
        }
    });
}

//新建分享
function newShare(data, cb){
    let share = new Model.Share({
        ...data,
    });
    share.save(function(err, doc){
        if(err){
            Logger.error('newShare: save err.', data);
            cb(err, doc);
        }else{
            Logger.debug('newShare: save success.', data);
            cb(null, doc);
        }
    });
}

//查询分享
function getShare(query, option, cb){
    Model.Share.find(query, {}, option, function(err, docs){
        if(err){
            Logger.error('getShare: error:',err);
            cb(err, docs);
        }else{
            Logger.debug('getShare: success.');
            cb(null, docs);
        }
    });
}

exports = {
    newAccount: newAccount,
    modifyCollection: modifyCollection,
    modifyPasswd: modifyPasswd,
    newCollection: newCollection,
    rmCollection: rmCollection,
    newShare: newShare,
    getShare: getShare,
    getAccount: getAccount,
};
Object.assign(module.exports, exports);
