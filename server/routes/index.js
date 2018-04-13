const express = require('express');
const router = express.Router();
const Async = require('async');
const Interface = require('../dataopt/interface');
const Util = require('../common/util');

let canvas = require('../canvas-img/validate');

//注册帐号
router.post('/signup', function(req, res, next){
    let account = req.body.account;
    let passwd = req.body.passwd;//已经哈希过
    let name = req.body.name;
    if(name === '' || !name){
        name = Util.randomName();
    }
    let aflag = Util.validate(account,1);
    let pflag = Util.validate(account,2);
    let nflag = Util.validate(account,3);
    if(!aflag.status){
        return res.send({status:0, message:aflag.message});
    }else if(!pflag.status){
        return res.send({status:0, message:pflag.message});
    }else if(!nflag.status){
        return res.send({status:0, message:nflag.message});
    }

    Interface.newAccount({account,passwd,name}, function(err, doc){
        if(err){
            Logger.error('post -- /signup: failed.', err);
            return res.send({status:0, message:'未知错误'});
        }else{
            return res.send({status:1, message:'注册成功'});
        }
    });
});

//登陆
router.post('/signin', function(req, res, next){
    let account = req.body.account;
    let passwd = req.body.passwd;
    let aflag = Util.validate(account,1);
    let pflag = Util.validate(account,2);
    if(!aflag.status){
        return res.send({status:0, message:aflag.message});
    }else if(!pflag.status){
        return res.send({status:0, message:pflag.message});
    }
    Interface.getAccount(account, function(err, doc){
        if(err){
            Logger.error('post -- /signin: unknown error.', err);
            return res.send({status:0, message:'unknown'});
        }
        if(!doc){
            res.send({status:0,message:'不存在此帐户'});
        }else{
            if(doc.passwd === passwd){
                req.session.regenerate(function () {
                    req.session.user = doc;
                    res.send({status:1, message:'登陆成功'});
                });
            }else{
                res.send({status:0, message:'密码错误'});
            }
        }
    });
});

//新建收藏
router.post('/newcollection', function(req, res, next){
    let url = req.body.urlsite;
    let abstract = req.body.abstract;
    if(!req.session.user){
        return res.send({status:0, message:'请先登陆'});
    }
    let account = req.session.user.account;
    let uflag = Util.isUrlValid(url);
    if(!uflag.status){
        res.send(uflag);
    }
    Interface.newCollection({url,abstract,account}, function(err, doc){
        if(err){
            Logger.error('post -- /newcollection: err:',err);
            res.send({status:0, message:'unknown'});
        }else{
            res.send({status:1,message:'创建成功'});
        }
    })
});

//查询收藏
router.post('/getcollection', function(req, res, next){
    let user = req.session.user;
    if(!user){
        return res.send({status:0,message:'请先登陆'});
    }
    let account = user.account;
    let limit = req.body.limit || 20;
    let skip = req.body.skip || 0;

});

//拉取分享列表
router.get('/share', function(req, res, next){
    let type = req.query.type;//按什么排序
    let skip = req.query.skip || 0;
    let limit = req.query.limit || 20;
    let sort = '-'+type;
    let options = { skip: skip, limit: limit, sort: sort};
    let query = {
        deleted: false
    };
    Interface.getShare(query, options, function(err, docs){
        if(err){
            res.send({data:[],message:'查询失败',status:0});
        }else if(!docs || docs.length < 1){
            res.send({data:[],message:'无分享',status:1});
        }else{
            res.send({data:docs, message:'查询成功', status:1});
        }
    });
});


module.exports = router;
