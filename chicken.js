var validCredentials = [
    {username: "p", password: "testuser"}
];
var  intervalTimer ;
var then;
var ctx;
var canvas;
var spaceship;
var background;
var keysDown;
var G_shoot_array = [];
var can_shoot;
var interval_counter=0;
var bad_ships = [];
var dir_right; 
var bad_coolDown;
var B_shoot_array = [];
var bad;
var score=0;
var accel_count;
var five_sec = 167;
var flag ;
var bullet_speed;
var music= new Audio("audio/Bee_Gees_-_Stayin_Alive_[NaijaGreen.Com]_.mp3");
var good_hit = new Audio("audio/good_hit.wav")
var bad_hit = new Audio("audio/bad_hit.wav")
var shoot_sound = new Audio("audio/shoot.wav")
var lives = 3;
var shootKey;
var gameLength=2;

function closeDialog() {
    document.getElementById("about").style.display = "none";
  }

document.addEventListener("keydown", function(event) {
if (event.key === "Escape") {
    closeDialog();
}
});

function newGame(){
    then = Date.now();
    intervalTimer = setInterval(main,30);

 }


function main(){
    var now = Date.now();
    var delta = now - then;
    update_spaceship_Position();
    draw()
    draw_bad_ships();
    update_Shoot_Position();
    draw_all_shoots();
    draw_bad_shoot();
    draw_all_bad_shoots();
    bad_shoot_colider();
    good_shoot_colider();
    
    then=now;
    
}

// draws the bad ships 4*5 
function draw_bad_ships(){
    five_sec--;
    bad_ship_img = new Image();
    bad_ship_img.src = "images/bad.jpg"
    flag = false
    if(five_sec == 0 && accel_count<4){
        flag = true;
        accel_count++
        five_sec =167;
        bullet_speed +=3;
    }

    bad_ships.forEach(bad_ship=>{
            if (flag==true){
                bad_ship.speed += 2;
            }
            if (bad_ship.is_alive == true){
        ctx.drawImage(bad_ship_img,bad_ship.x,bad_ship.y,60,60)}
    }
    )
    if (dir_right == true){
        if (bad_ships[0].x +bad_ships[0].speed >=900)
        dir_right = false 
    bad_ships.forEach(bad_ship=>{
      bad_ship.x +=bad_ship.speed ;
    })
    }
    else{
        if (bad_ships[0].x -bad_ships[0].speed <= 0)
            dir_right = true;
        bad_ships.forEach(bad_ship=>{
                bad_ship.x -=bad_ship.speed ;
            
    })
}
}


function draw_all_shoots(){
    G_shoot_array.forEach(newshoot=>{
        draw_shoot(newshoot,'red')
        newshoot.y-=newshoot.speed;
    });
    G_shoot_array.forEach((newshoot, index) => {
        if(newshoot.y<5){
            G_shoot_array.splice(index,1);
        }
    });
}
function draw_shoot(newshoot,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(newshoot.x, newshoot.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}
function draw_bad_shoot(){
    if (B_shoot_array.length ==0 || B_shoot_array[B_shoot_array.length -1].y >= 525) { 
        bad = bad_ships[Math.floor(Math.random()*20)]
        if(bad.is_alive == true){
            const bad_shoot = {
                x : bad.x + 3,
                y : bad.y + 60,
                speed: bullet_speed};
            bad_coolDown = 0;
            B_shoot_array.push(bad_shoot);
    }
    }
}
function draw_all_bad_shoots(){
    B_shoot_array.forEach(bad_shoot=>{
        draw_shoot(bad_shoot,'yellow')
        bad_shoot.y+=bad_shoot.speed;
    });
    G_shoot_array.forEach((bad_shoot, index) => {
        if(bad_shoot.y>=790){
            B_shoot_array.splice(index,1);
        }
    });
}


function draw(){
    ctx.drawImage(background,0,0,1300,700);
    ctx.drawImage(spaceship_img,spaceship.x,spaceship.y,80,80)  
}

function bad_shoot_colider(){
    B_shoot_array.forEach((bad_shoot,index)=>{
        if(bad_shoot.x >= spaceship.x + 20 && 
            bad_shoot.x <=spaceship.x +80 -20 && 
            bad_shoot.y >= spaceship.y &&
            bad_shoot.y<= spaceship.y +80){
                bad_hit.load()
                bad_hit.play()
                spaceship.x = canvas.width/2
                spaceship.y = canvas.height -100;
                lives--;
                B_shoot_array.splice(index,1);
                updateLives();
            }  


    })
}
function good_shoot_colider(){
    G_shoot_array.forEach((good_shot,index)=>{
        bad_ships.forEach(bad_ship=>{
            if (bad_ship.is_alive == true){
                if(good_shot.x >= bad_ship.x + 20 && 
                    good_shot.x <=bad_ship.x +80 -20 && 
                    good_shot.y >= bad_ship.y &&
                    good_shot.y<= bad_ship.y +80){
                        good_hit.load()
                        good_hit.play()
                        
                        bad_ship.is_alive= false;
                        G_shoot_array.splice(index,1);
                        score += (4 - bad_ship.row) *5;
                        updateScore();
                        
                    }
            }
        })
    })
}
//window.addEventListener("load", startgame,false);

function startgame(){

    //initilize all the variables
    G_shoot_array = [];
    B_shoot_array = [];
    bad_ships = [];
    dir_right = true;
    accel_count = 0;
    bullet_speed = 3;
    lives = 3;
    score = 0;
    five_sec = 167; 


    music.volume =0.3
    music.play();

    canvas = document.getElementById("theCanvas");
    ctx = canvas.getContext("2d");
    

    //backgruond
    background = new Image();
    background.src= "images/CI5Galaxy.webp";
    background.onload = function(){
        ctx.drawImage(background,0,0,1300,700);   
    }
    
    //good spaceship
    spaceship = new Object();
    spaceship_img = new Image();
    spaceship_img.src= "images/Spaceship4.png"
    spaceship.x = canvas.width/2
    spaceship.y = canvas.height -100;
    spaceship.onload = function(){
        ctx.drawImage(spaceship_img,spaceship.x,spaceship.y,50,50) 
    }
    //shoot of good spaceShip
   

    //bad ships:
    var x_pos = 0;
    var y_pos=0;
    for (var i =0; i<5; i++){
        for (var j=0; j<4; j++){
         bad_ship = {
            x: x_pos,
            y: y_pos ,
            is_alive: true,
            row: j,
            speed : 3
        }
        bad_ships.push(bad_ship);
        y_pos += 80;
        }
        y_pos = 0;
        x_pos += 80;
        
    }

    keysDown = {};
	// Check for keys pressed where key represents the keycode captured
	addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
	addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);
    // newGame();

    then = Date.now();
    intervalTimer = setInterval(main,30);
}
function update_Shoot_Position(modifier){
    interval_counter++;
    if (32 in keysDown){// player holding space}
        if (interval_counter >=8 || interval_counter == 0){
            const newshoot = {
            x : spaceship.x +40 ,
            y : spaceship.y,
            speed: 8,
        };
            G_shoot_array.push(newshoot);
            interval_counter =1;
            shoot_sound.load();
            shoot_sound.play();
        }
    }
}
function update_spaceship_Position(modifier){
    if ((38 in keysDown) ){// player holding up
        if(spaceship.y >= canvas.height - 0.4 * canvas.height)
        spaceship.y -= 5;
    }
    if ((40 in keysDown) ){// player holding down
        if(spaceship.y <= canvas.height-55 )
        spaceship.y += 5;
    }
    if ((37 in keysDown) ){// player holding left
        if(spaceship.x >= 8 )
        spaceship.x -= 8;
    }
    if ((39 in keysDown) ){// player holding right
        if(spaceship.x <= canvas.width - 58 )
        spaceship.x += 8;
    }
    
}

function check(event){
    event.preventDefault();
    var pass =  document.forms["myForm"]["password"].value;
    var pass2 =  document.forms["myForm"]["password2"].value;
    var pass3 =  document.forms["myForm"]["first"].value;
    var pass4 =  document.forms["myForm"]["last"].value;
    var pass5=  document.forms["myForm"]["email"].value;
    if(pass != pass2){
        alert("Passwords do not match");
        return false;
    }
    if (!/[a-z]/.test(pass)) {
        alert("Password must contain at least one lowercase letter.");
        return false;
    }
    if (!/[A-Z]/.test(pass)) {
        alert("Password must contain at least one uppercase letter.");
        return false;
    }
    if (!/[0-9]/.test(pass)) {
        alert("Password must contain at least one digit.");
        return false;
    }
    if (!/^[a-zA-Z]+$/.test(pass3)) {
        alert("Please enter a valid name with only letters (A-Z, a-z).");
        return false;
    }
    if (!/^[a-zA-Z]+$/.test(pass4)) {
        alert("Please enter a valid name with only letters (A-Z, a-z).");
        return false;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(pass5)) {
        alert("Please enter a valid email address.");
        return false;
    }
    var username1 = document.getElementById("username").value;
    var password1 = document.getElementById("password").value;
    validCredentials.push({username: username1, password: password1});
    alert("Account created");
    console.log(validCredentials);
    document.getElementById("game page").style.display="block";
    document.getElementById("theCanvas").style.display="block";
    document.getElementById("login page").style.display="none";
    document.getElementById("welcome page").style.display="none";
    document.getElementById("sign up page").style.display="none";
    return true;

}
function login(){
    music.pause();                    
    document.getElementById("welcome page").style.display = "none";
    document.getElementById("sign up page").style.display = "none";
    document.getElementById("game page").style.display = "none";
    document.getElementById("theCanvas").style.display = "none";
    document.getElementById("login page").style.display = "block";
    document.getElementById("about").style.display = "none";
    document.getElementById("configuration").style.display = "none";



}
function signup(){
    music.pause();
    document.getElementById("welcome page").style.display = "none";
    document.getElementById("game page").style.display = "none";
    document.getElementById("theCanvas").style.display = "none";
    document.getElementById("login page").style.display = "none";
    document.getElementById("sign up page").style.display = "block";
    document.getElementById("about").style.display = "none";
    document.getElementById("configuration").style.display = "none";


}
function welcome(){
    music.pause();
    document.getElementById("welcome page").style.display = "block";
    document.getElementById("login page").style.display = "none";
    document.getElementById("sign up page").style.display = "none";
    document.getElementById("game page").style.display = "none";
    document.getElementById("theCanvas").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("configuration").style.display = "none";

}
function about(){
    music.pause();
    document.getElementById("about").style.display = "block";

}  


function config(event)
{
    event.preventDefault();
    shootKey = event.key;
    document.getElementById("shootKeyInput").value= shootKey;
    
}


function game_after_config(event){
    event.preventDefault();
    gameLength=parseInt(document.getElementById("gameLengthInput").value);
    document.getElementById("gameLengthInput").value= gameLength;
    document.removeEventListener("keydown", config);
    document.getElementById("game page").style.display="block";
    document.getElementById("theCanvas").style.display="block";
    document.getElementById("configuration").style.display="none";
    
    startgame();
}