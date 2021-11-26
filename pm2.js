const { execSync } = require('child_process');
const net = require('net');

const argv = process.argv.slice(2);
const commandOption = {
  cwd: __dirname,
};
if (argv.includes('--build')) {
  // 拉取代码并打包
  console.log('command: git pull');
  execSync('git pull', commandOption);

  console.log('command: cnpm install');
  execSync('cnpm install', commandOption);

  console.log('command: npm run build');
  execSync('npm run build', commandOption);
}

const port = 3000;
const server = net.createServer().listen(port);
const serverName = 'vite:' + port;
server.on('listening', function () {
  server.close();
  execSync('pm2 start npm --name ' + serverName + ' -- run start', commandOption);
  console.log(serverName + ' 服务已启动');
});

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    execSync('pm2 restart ' + serverName, commandOption);
    console.log(serverName + ' 服务重启');
  }
});
