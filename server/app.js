const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const index = require('./routes/index');
const config = require('./config');
const busboy = require('connect-busboy');
const bytes = require('bytes');
const app = express();
const _ = require('lodash');
const Logger = require('common/logger');

function isOriginAllowed(origin, allowedOrigin) {
    if (_.isArray(allowedOrigin)) {
        for(let i = 0; i < allowedOrigin.length; i++) {
            if(isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
            }
        }
        return false;
    } else if (_.isString(allowedOrigin)) {
        return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
    } else {
        return !!allowedOrigin;
    }
}


const ALLOW_ORIGIN = [ // 域名白名单
    'http://localhost:3000',
    'http://39.108.56.116:3001',
    'http://www.5min8.com:3001',
    'http://www.5min8.com',
    'http://39.108.56.116:3005',
    'http://39.108.56.116:4001',
    'http://39.108.56.116:5000',
];

app.use(Logger.connectLogger(logger, {level:Logger.levels.INFO}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.session_secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
}));
app.use(busboy({
    limits: {
        fileSize: bytes(config.file_limit)
    }
}));
app.use('/',function (req,res,next) {
    let reqOrigin = req.headers.origin; // request响应头的origin属性
    if(!reqOrigin){
        return next();
    }
    // 判断请求是否在域名白名单内
    if(isOriginAllowed(reqOrigin, ALLOW_ORIGIN)) {
        // 设置CORS为请求的Origin值
        res.header("Access-Control-Allow-Origin", reqOrigin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        // 你的业务代码逻辑代码 ...
        // ...
    }else{
        return res.send({ code: -2, msg: '非法请求' });
    }

   next();
});

app.use('/', index);

module.exports = app;
