"use strinct"
const
    events = require('events'),
    util = require('util'),
    LDJClient = function(stream){
        console.log(`Ldj class is created`);
        events.EventEmitter.call(this);
        let
            self=this;
            buffer = '';
            stream.on('data', (data)=>{
             console.log(`Data is incoming`);
                buffer += data;
                let boundary = buffer.indexOf('\n');
                while ( boundary != -1 ){
                    let input = buffer.substr(0, boundary);
                    buffer = buffer.substr(boundary+1);
                    self.emit('message', JSON.parse(input));
                    console.log(`Emit data....`);
                    boundary = buffer.indexOf('\n');
                }
            })
    };
    util.inherits(LDJClient, events.EventEmitter);

    exports.LDJClient=LDJClient;
    exports.connect = (stream)=>{
        return new LDJClient(stream);
    };
