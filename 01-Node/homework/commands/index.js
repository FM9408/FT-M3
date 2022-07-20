var fs = require('fs');
var request = require('request');

function date() {
    process.stdout.write(Date());
}
function pwd() {
    process.stdout.write(process.cwd())
}

const ls = () => {
    fs.readdir('.', function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
          process.stdout.write(file.toString() + "\n");
        })
        process.stdout.write("prompt > ");
    })
}

function echo(data) {
    process.stdout.write(data.join(' '))
}

const cat = (input) => {
    try {
        const readFile = fs.readFileSync(input[0], 'utf8');
        process.stdout.write(readFile)
    } catch (error) {
        throw error
    }

}

const head = (input) => {
    fs.readFile(input[0], 'utf-8', (err, lectura) => {
        if (err) throw err
        else {
            process.stdout.write(lectura.split('\n').splice(0,5).join('\n'))
        }
        process.stdout.write("\nprompt >")
    })

}

const tail = (input) => {
    fs.readFile(input[0], 'utf-8', (err, lectura) => {
        if (err) throw err
        else {
            let lineas = lectura.split('\n')
            let ultimasLineas = lineas.splice(lineas.length -5 , lineas.length).join('\n');
            process.stdout.write(ultimasLineas);
        }
        process.stdout.write("\nprompt >")
    })

}

const curl = (input) => {
    request(`https://${input[0]}`, (err, res, body) => {
        if(err) throw err;
        else {
            process.stdout.write(body);
            process.stdout.write("\nprompt > ")
        }
    })
}

module.exports = {
 date,
 pwd,
 ls,
 echo,
 cat,
 head,
 tail,
 curl 
}