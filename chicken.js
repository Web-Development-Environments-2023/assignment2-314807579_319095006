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
const G_shoot_array = [];
var can_shoot;
var interval_counter=0;
const bad_ships = [];
var dir_right; 
var bad_coolDown;
const B_shoot_array = [];
var bad;
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
    intervalTimer = setInterval(main,30)
    
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
    then=now;
}

// draws the bad ships 4*5 
function draw_bad_ships(){
    bad_ship_img = new Image();
    bad_ship_img.src = "images/bad.jpg"
    bad_ships.forEach(bad_ship=>{
        if (bad_ship.is_alive ==true)
        ctx.drawImage(bad_ship_img,bad_ship.x,bad_ship.y,60,60)
    })
    if (dir_right == true){
        if (bad_ships[0].x +3 ==900)
        dir_right = false 
    bad_ships.forEach(bad_ship=>{
      bad_ship.x +=3 ;
    })
    }
    else{
        if (bad_ships[0].x -3 == 0)
            dir_right = true;
        bad_ships.forEach(bad_ship=>{
                bad_ship.x -=3 ;
            
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
    bad_coolDown ++;
    if (bad_coolDown >= 40){ 
        bad = bad_ships[Math.floor(Math.random()*20)]
        if(bad.is_alive == true){
            const bad_shoot = {
                x : bad.x + 3,
                y : bad.y + 60,
                speed: 5};
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
window.addEventListener("load", startgame,false);
function startgame(){
    
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
        const bad_ship = {
            x: x_pos,
            y: y_pos ,
            is_alive: true
        }
        bad_ships.push(bad_ship);
        y_pos += 80;
        }
        y_pos = 0;
        x_pos += 80;
        
    }
    dir_right = true
    bad_coolDown=0;

    

    keysDown = {};
	// Check for keys pressed where key represents the keycode captured
	addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
	addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);
    newGame();
}
function update_Shoot_Position(modifier){
    interval_counter++;
    if (32 in keysDown){// player holding space}
        if (interval_counter >=8 || interval_counter == 0){
            const newshoot = {
            x : spaceship.x +40 ,
            y : spaceship.y,
            speed: 8};
            G_shoot_array.push(newshoot);
            interval_counter =1;
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
  