'use strict'
const
    fs = require('fs'),
    net = require('net'),

    filename = process.argv[2],

    server = net.createServer((connection)=>{
        console.log('Subscriber connected.');
        connection.write(
		JSON.stringify({
				type: 'watching',
				file: filename
			}) + '\n');
        //watch setup
        let watcher = fs.watch(filename, ()=>{
            connection.write(
		JSON.stringify({
			type: 'changed',
			file: filename,
			time: Date().now()
			})
		+ '\n');
        })
        //cleanup
        connection.on('close', ()=>{
            console.log('Subscriber is closed.');
            watcher.close();
        })
    });

    if (!filename){
        throw Error ('No target filename is specified!');
    }

    server.listen('5432', ()=>{
        console.log('Listening for subscribers...');
    });
