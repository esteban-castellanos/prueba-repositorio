// Necesitamos que la calculadora responda a las operaciones basicas
// tomando los argumentos desde la terminal
// node app.js [operacion] [operandos] [operandos]
//const process = require("process");
//-------------------------------------------------------------------------
//Traemos las operaciones del script "Calculadora"
const calculadora = require ('./calculadora');

//Traemos del modulo de filesystem de nodejs
const fs = require ("fs");

//Leer el archivo (sincronicamente)
const historialJSON = fs.readFileSync("historial.json", {encoding: "utf-8"});

//convertimos el JSON en objeto literal (osea de string a un array de historial)
const historial= JSON.parse(historialJSON);


//Tomamos los argumentos desde terminal, gracias a la funcion .ARGV en este caso la operacion y la cantidad de operandos
const [, , operacion, ...operandos] = process.argv;



switch(operacion){
    case "sumar":
        {
           let resultado= calculadora.sumar(...operandos)
           console.log(resultado);    
           //Guardar la operacion en un array llamado historial
           historial.push(
               //con reduce concatenamos los operandos separados por el signo de la operacion.
               operandos.reduce((valor1, valor2)=>
           {
               return valor1 + "+" + valor2;
               //concatenamos el signo igual con el resultado de la operacion 
           })+ "="+ resultado);

        }
        break;
    case "restar":
        {
            let resultado= calculadora.restar(...operandos)
            console.log(resultado); 
            historial.push(operandos.reduce((valor1, valor2) =>
            {
                return valor1 + "-" + valor2;
            }
            )+ "="+ resultado); 
         }
         break;
    case "multiplicar":
        {
            let resultado= calculadora.multiplicar(...operandos)
            console.log(resultado);   
            historial.push(operandos.reduce((valor1, valor2)=>
            {
                return valor1 +"*"+valor2;
            }
            )+"="+resultado);
         }
         break;
    case "dividir":
        {
            let resultado= calculadora.dividir(...operandos)
            console.log(resultado);
            historial.push(operandos.reduce((valor1, valor2)=>
            {
                return valor1 +"/"+valor2;
            }
            )+"="+resultado);   
         }
         break;
    case "historial":
        {
            historial.forEach((valor1, i) =>
            {
                console.log("["+ i +"]"+ valor1);
            }
            );
        }
        break;
    default:
        console.log("No reconozco la operación");
        
}

//Convertimos el array de historial a un string de JSON.
let strigified = JSON.stringify(historial, null, 4);

//Escribimos el string al archivo "historial.JSON"
fs.writeFileSync("historial.json", strigified)
    