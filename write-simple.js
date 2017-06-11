const fs=require('fs');

fs.writeFile(
    'target.txt',
    'crap, is this \n really happen???\n\tUnbeleiveable!!', 
    (err)=>{
        if (err) { throw err;}
        console.log('File saved!!')
    } );
