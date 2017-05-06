let server = require('./module/server.js');
let router = require('./module/router.js');
let handler = require('./module/handler.js');

var handlers = {};
handlers['/data'] = handler.app;   // API路径对应的处理函数
handlers['/date'] = handler.bpp;   // API路径对应的处理函数

server.start(router.route,handlers)
