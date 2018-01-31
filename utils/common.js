function echoHello(user){
  return '欢迎用户：'+ user+'回来';
}

function echoExit(user){
  return '用户：' + user +'已经退出';
}

module.exports.echoHello = echoHello;
exports.echoExit = echoExit;