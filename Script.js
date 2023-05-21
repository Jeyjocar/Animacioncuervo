/*15-04-2023
Animación Cuervo JAVASCRIPT
Jeyfrey Calero*/


const canvas= document.getElementById("canvas1");
const ctx= canvas.getContext("2d");
canvas.width= window.innerWidth; //InnerWidth ajusta la ventana en el ancho del navegador
canvas.height= window.innerHeight; ///InnerHeight ajusta la ventana en el alto del navegador

let tiemposSiguienteCuervo= 0;
let intervaloCuervo=500;
let tiempoTranscurrido=0;
let cuervos=[];

class Cuervo{
    constructor(){
        this.anchoSprite= 270;
        this.altoSprite= 190;
        this.modificarSize= Math.random()*0.5+0.4; //tamaño máx. y min. de la imagen
        this.width=this.anchoSprite*this.modificarSize;
        this.height=this.altoSprite*this.modificarSize;
        this.x=canvas.width;
        this.y=Math.random()*(canvas.height-this.height);
        this.direccionX=Math.random()*5+3;
        this.direccionY=Math.random()*5-2.5;
        this.marcado=false;
        this.imagen=new Image();
        this.imagen.src="cuervo.png";
        this.frame=0;
        this.frameMax=4; 
    
    }

    actualizarAnimacion(){
        this.x-=this.direccionX;
        if (this.x < 0 - this.width) this.marcado=true;
        if (this.frame > this.frameMax) this.frame=0;
        else this.frame++;

        
    }

    dibujarAnimacion(){
        //ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.imagen, this.frame* this.anchoSprite, 0, this.anchoSprite, this.altoSprite, this.x, this.y, this.width, this.height);
            //Siempre hay que darle un ancho y alto a la imagen
    }
   
}

/**const cuervo=new Cuervo();*/

function animarCuervo(timestamp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let tiempoDelta=timestamp-tiempoTranscurrido;
    tiempoTranscurrido=timestamp;
    tiemposSiguienteCuervo+=tiempoDelta;
    if(tiemposSiguienteCuervo>intervaloCuervo){
        cuervos.push(new Cuervo());
        tiemposSiguienteCuervo=0;
    };
    /**console.log("test");*/
    /**cuervo.actualizarAnimacion();*/
    /**cuervo.dibujarAnimacion();*/
    [...cuervos].forEach(object=> object.actualizarAnimacion());
    [...cuervos].forEach(object=> object.dibujarAnimacion());
    cuervos = cuervos.filter(object=> !object.marcado);
    console.log(cuervos);
    requestAnimationFrame(animarCuervo);
}

animarCuervo(0);