/**
 * Created by Administrator on 2018/4/12.
 */
const mongoose = require('mongoose');
const Logger = require('../common/logger');

mongoose.connect(Config.db, function(err){
    if(err){
        Logger.error('mongoose connect failed.');
    }else{
        Logger.info('mongoose connect success.');
    }
});

//用户表
let usermodal = new mongoose.Schema({
    account: String, //帐号
    passwd: String, //密码
    name: String, //昵称
    icon: String, //头像地址
    createTime: {type: Date, default: Date.now},
});

let UserModel = mongoose.model('UserModel', usermodal);

//完全树状结构图
let tree = new mongoose.Schema({
    name:{type:String, default:'root'},
    children:Array,//{_id,name,children}
});
let Tree = mongoose.model('Tree', tree);

//单条分类
let item = new mongoose.Schema({
    name:String,
    createTime:{type:Date, default:Date.now},
    collections:Array,//每个收藏表的ID
    parent:ObjectId,//父节点的ID
    children:Array,//孩子节点
});

//收藏表
let collection = new mongoose.Schema({
    url: String, //网址
    abstract: String, //简介
    createTime: { type: Date, default: Date.now }, //创建时间
    account: String, //创建者
    type:ObjectId,//分类
    share: { type:Boolean, default: false}, //是否分享
    delete: { type:Boolean, default: false}, //是否已经删除
});
let Collection = mongoose.model('Collection', collection);

//分享表
let share = new mongoose.Schema({
    collectionId: ObjectId, //针对哪个收藏进行的分享
    createTime: { type: Date, default: Date.now }, //创建时间
    introduction: String, //分享内容
    account: String, //创建者
    viewCount: { type: Number, default: 0 }, //浏览数量
    commentCount: { type: Number, default: 0 }, //评论数量
});
let Share = mongoose.model('Share', share);

//评论表
let comment = new mongoose.Schema({
    shareId: ObjectId, //针对哪个分享进行的评论
    createTime: { type: Date, default: Date.now }, //创建时间
    content: String, //内容
    account: String, //创建者
});
let Comment = mongoose.model('Comment', comment);

exports = {
    UserModel: UserModel,
    Collection: Collection,
    Share: Share,
    Comment: Comment
};
Object.assign(module.exports, exports);
