let config = {
    // mongodb 配置
    db: 'mongodb://127.0.0.1/wsbag',

    session_secret: 'hehehaha', // 

    // 程序运行的端口
    port: 5000,
    file_limit: '10MB',
    visit_per_day: 1000, // 每个 ip 每天能访问的次数
    redis:{
        port: 6379,
        host: '127.0.0.1',
    }
};

module.exports = config;
