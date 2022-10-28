
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');//Para poder dibujar elementos 2D

const width = canvas.width = window.innerWidth; //Dimensiones del canvas
const height = canvas.height = window.innerHeight;


//Funció que recibe dos números como argumentos y devuelve un número aleatorio
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }


//Nuestro constructor pelota, Los prototipos son un mecanismo 
//mediante el cual los objetos en JavaScript heredan características entre sí.
function Ball(x, y, velX, velY, color, size) {
    this.x = x; //posición horizontal det por la anchura de la ventana
    this.y = y; //posición vertical
    this.velX = velX; //velocidad horizontal v
    this.velY = velY; //velocidad vertical
    this.color = color; //color
    this.size = size; //tamaño
  }


Ball.prototype.draw = function() {
    ctx.beginPath(); //declara que se dibuja en el canvas
    ctx.fillStyle = this.color; //color de la ball
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    //arc(x,y,size,0,2pi) = (centro arco, centro arco, radio arco, angulo inicial y final)
    ctx.fill() //finito
}

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX; //movimiento
    this.y += this.velY;
  }

var balls =[]; //guarda las pelotitas

Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) { //j++ incremento, añade +1
      if (!(this === balls[j])) { //solo si miramos dos pelotas diferentes (!)
        var dx = this.x - balls[j].x; //pos x- la pos x ball
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy); //distancia entre centros
  
        if (distance < this.size + balls[j].size) {//indica que hay impacto
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
          //window.print('touched')
        }
      }
    }
  }
  

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';//relleno del canvas negro-seminegro
    ctx.fillRect(0, 0, width, height);//dibuja un rectangulo
  
    while (balls.length < 25) {
      var size = random(10,20);
      var ball = new Ball(//nueva instancia
        // la posición de las pelotas, se dibujará al menos siempre
        // como mínimo a un ancho de la pelota de distancia al borde del
        // canvas, para evitar errores en el dibujo
        random(0 + size,width - size),//pos-x
        random(0 + size,height - size),//pos-y
        random(-7,7),//velx
        random(-7,7),//vely
        'rgb(' + random(0,200) + ',' + random(0,100) + ',' + random(0,70) +')', //color
        random(10,20) //ya definida, es el size
      );
      balls.push(ball);//se añade al array
    }
    //Solo mostrara si <25 pelotas
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();//por cada pelota, se dibuja y se actualiza su pos
      balls[i].collisionDetect()
        
      }
      
  
    requestAnimationFrame(loop);//se ejecuta la funció de nuevo una y otra vez de forma recursiva
  }
  
  //llamamos la función
  loop()

  //Añadimos ahora una detección de colisiones
