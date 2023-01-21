//Inicializacion de Variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivoId = null;

//DOM HTML
let seeMovement = document.getElementById("movimientos");
let seeHits = document.getElementById("aciertos");
let seeTime = document.getElementById("tiempoRestante");

//Generador de numeros aleatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

numbers = numbers.sort(()=>{ return Math.random()-0.5})



//Functions
function contarTiempo(){
   tiempoRegresivoId = setInterval(()=>{
        timer--;
        seeTime.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0){
    clearInterval(tiempoRegresivoId);
    bloquearTarjetas();
        }
       }, 1000)
}


function bloquearTarjetas(){
    for(let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numbers[i];
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    
   tarjetasDestapadas++;
   

   if(tarjetasDestapadas===1){
    //Mostrar primer numero
       tarjeta1 = document.getElementById(id);
       primerResultado = numbers[id];
       tarjeta1.innerHTML = primerResultado;
    //Deshabilitar primer boton
    tarjeta1.disabled = true;

   }
   else if (tarjetasDestapadas ===2 ){
    //Mostrar segundo numero
      tarjeta2 = document.getElementById(id);
      segundoResultado = numbers[id];
       tarjeta2.innerHTML = segundoResultado;

       //Deshabilitar segundo boton

       tarjeta2.disabled = true;

       //Incrementar movimientos
       movimientos++;
       seeMovement.innerHTML = `Movimientos: ${movimientos}`;

       if(primerResultado === segundoResultado){
        //Poner contador en cero
        tarjetasDestapadas = 0;

        //Aumentar aciertos
        aciertos++;
        seeHits.innerHTML =   `Aciertos: ${aciertos}`;
        if(aciertos === 8){
            clearInterval(tiempoRegresivoId);
            seeHits.innerHTML = `Aciertos: ${aciertos} 🚀`;
            seeTime.innerHTML = ` Fantastico solo te demoraste ${timerInicial - timer} segundos`
            seeMovement.innerHTML =  `Movimientos: ${movimientos} 🤟`;  

        }
       } else{
        //Mostrar valores de forma momentanea y volver a tapar
        setTimeout(()=>{
            tarjeta1.innerHTML = "";
            tarjeta2.innerHTML = "";
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        }, 800)
       }
   } 

}