 const commands  = require('./commands');
 
 // Output un prompt
 process.stdout.write('prompt > ');
 // El evento stdin 'data' se dispara cuando el user escribe una línea
 process.stdin.on('data', function (data) {
   var cmd = data.toString().trim().split(' ');
   let comando = cmd.shift()
   if(commands[comando]) {
    commands[comando](cmd)
        
   } 
   else process.stdout.write('Comando no reconocido')
   
   process.stdout.write('\nprompt > ');
 });