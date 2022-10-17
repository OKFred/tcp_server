let net = require('net');
let HOST = '0.0.0.0';
let PORT = 98;
let ModbusIP =  '192.168.11.249'
let taskO2CO2 = require('./taskO2CO2.js');

net.createServer((socket) =>{
	let interval; //自动轮询
    console.log('新TCP连接: ' + socket.remoteAddress + ':' + socket.remotePort);
	let { read_O2, read_CO2 } = taskO2CO2.main;
	socket.setEncoding('hex');
	if (socket.remoteAddress === ModbusIP){
		interval=setInterval(()=>socket.write('0103000100141405','hex'), 20000);
	}
    socket.on('data', (data)=> {
        //console.log('数据传入 ' + socket.remoteAddress + ': ');
		if (data.length === 90) {
			let O2 = read_O2(data);
			let CO2 = read_CO2(data);
			console.log(new Date().toLocaleString(), O2, CO2);
		}
    });
    socket.on('close', (data)=> {
        console.log('连接已关闭> ' + socket.remoteAddress + ':' + socket.remotePort);
		if (socket.remoteAddress === ModbusIP){
			clearInterval(interval);
		}
    });
}).listen(PORT, HOST);

console.log('TCP服务已开启监听：' + HOST +':'+ PORT);