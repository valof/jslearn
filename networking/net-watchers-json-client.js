// net-watchers-json-client.js
'use strict'
const
	net=require('net'),
	client=net.connect({port:5432});
	client.on('data',(data)=>{
		let message = JSON.parse(data);
		if (message.type === 'watching') {
			console.log(`Now watching ${message.file}`);
		} else if (message.type === 'changed') {
			let date = new Date(message.time);
			console.log(`File ${message.file} has changed at ${date}`);
		} else {
			throw Error (`Unrecognized type ${message.type}!`);
		}
	})

