import { readFile } from 'fs';


console.log('starting');

readFile("a.txt", "utf-8",function(err, data) {
    console.log(data);
})


console.log('done');

async function r(){
    console.log('async function');
}

r();