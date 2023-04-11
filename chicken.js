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
    intervalTimer = setInterval(main,50)
    intervalTimer =setInterval(G_shoot,150)
}
function G_shoot(){
    var now = Date.now();
    var delta = now - then;
    update_Shoot_Position();
    draw_all_shoots();
    then=now
}
function main(){
    var now = Date.now();
    var delta = now - then;
    update_spacesheep_Position();
    draw()

    then=now;
}
function draw_all_shoots(){
    G_shoot_array.forEach(newshoot=>{
        draw_shoot(newshoot)
        newshoot.y-=newshoot.speed;
    });
    G_shoot_array.forEach((newshoot, index) => {
        if(newshoot.y<5){
            G_shoot_array.splice(index,1);
        }
    });
}
function draw_shoot(newshoot){
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(newshoot.x, newshoot.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}


function draw(){
    ctx.drawImage(background,0,0,1100,500);
    ctx.drawImage(spaceship_img,spaceship.x,spaceship.y,50,50)
    
   
     
}
window.addEventListener("load", startgame,false);
function startgame(){
    
    canvas = document.getElementById("theCanvas");
    ctx = canvas.getContext("2d");


    //backgruond
    background = new Image();
    background.src= "images/CI5Galaxy.webp";
    background.onload = function(){
        ctx.drawImage(background,0,0,1100,500);   
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
   
    

    

    keysDown = {};
	// Check for keys pressed where key represents the keycode captured
	addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
	addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);
    newGame();
}
function update_Shoot_Position(modifier){
    if (32 in keysDown){// player holding space}
        console.log("space button pressed")
        const newshoot = {
        x : spaceship.x,
        y : spaceship.y,
        speed: 7
        };
        G_shoot_array.push(newshoot);
        }
}
function update_spacesheep_Position(modifier){
    if ((38 in keysDown) ){// player holding up
        if(spaceship.y >= canvas.height - 0.4 * canvas.height)
        spaceship.y -= 3;
    }
    if ((40 in keysDown) ){// player holding down
        if(spaceship.y <= canvas.height-53 )
        spaceship.y += 3;
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
  