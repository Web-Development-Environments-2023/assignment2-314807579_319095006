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
var G_shoot_array ;
var can_shoot;
var interval_counter;
var bad_ships ;
var dir_right; 
var bad_coolDown;
var B_shoot_array ;
var bad;
var score = 0 ;
var accel_count;
var five_sec;
var flag ;
var bullet_speed;
var music = new Audio("audio/Bee_Gees_-_Stayin_Alive_[NaijaGreen.Com]_.mp3");
var good_hit
var bad_hit
var shoot_sound 
var lives = 3;
var shootKey=" ";
var gameLength= 2;
var elapsedTime;
var intrval_id;
var timerElement;
var startTime;
var minutes;
var seconds;
var best_scores;
var screenWidth 
var screenHeight 

function closeDialog() {
    document.getElementById("about").style.display = "none";
  }


  //this is the main function of the game 
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
    bad_ship_img1 = new Image();
    bad_ship_img1.src = "images/bad.jpg"
    bad_ship_img2 = new Image();
    bad_ship_img3 = new Image();
    bad_ship_img4 = new Image();
    bad_ship_img2.src = "images/bad2.webp"
    bad_ship_img3.src = "images/bad3.webp"
    bad_ship_img4.src = "images/bad4.webp"

    flag = false
    if(five_sec == 0 && accel_count<4){
        flag = true;
        accel_count++
        five_sec =167;
        bullet_speed +=3;
    }
    counter = 0
    bad_ships.forEach(bad_ship=>{
            if (flag==true){
                bad_ship.speed += 2;
            }
            if (bad_ship.is_alive == true){
                if (counter % 4 ==0 ){
                    ctx.drawImage(bad_ship_img4,bad_ship.x,bad_ship.y,canvas.width / 20 ,canvas.width / 20)
                }
                if (counter % 4 ==1 ){
                    ctx.drawImage(bad_ship_img3,bad_ship.x,bad_ship.y,canvas.width / 20 ,canvas.width / 20)
                }
                if (counter % 4 ==2 ){
                    ctx.drawImage(bad_ship_img2,bad_ship.x,bad_ship.y,canvas.width / 20 ,canvas.width / 20)
                }
                if (counter % 4 ==3 ){
                    ctx.drawImage(bad_ship_img1,bad_ship.x,bad_ship.y,canvas.width / 20 ,canvas.width / 20)
                }
                
            }
            counter ++;W
    })
    if (dir_right == true){
        if (bad_ships[0].x +bad_ships[0].speed >=(canvas.width - (canvas.width / 20) * 5 ))
        dir_right = false 
    bad_ships.forEach(bad_ship=>{
      bad_ship.x +=bad_ship.speed ;})
    }
    else{
        if (bad_ships[0].x -bad_ships[0].speed <= 0)
            dir_right = true;
        bad_ships.forEach(bad_ship=>{
                bad_ship.x -=bad_ship.speed ;
    })
}}

//iterate through list of shotos to draw or remove
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

//draw shooting of the spaceship
function draw_shoot(newshoot,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(newshoot.x, newshoot.y, canvas.width/160, 0, 2 * Math.PI);
    ctx.fill();
}

//bad ships shooting
function draw_bad_shoot(){
    if (B_shoot_array.length ==0 || B_shoot_array[B_shoot_array.length -1].y >= canvas.height * 0.75) { 
        bad = bad_ships[Math.floor(Math.random()*20)]
        if(bad.is_alive == true){
            const bad_shoot = {
                x : bad.x + canvas.width / 40,
                y : bad.y + canvas.width / 20,
                speed: bullet_speed};
            B_shoot_array.push(bad_shoot);
    }
    }
}

//drawing the shooting of the bad ships
function draw_all_bad_shoots(){
    B_shoot_array.forEach(bad_shoot=>{
        draw_shoot(bad_shoot,'yellow')
        bad_shoot.y+=bad_shoot.speed;
    });
    B_shoot_array.forEach((bad_shoot, index) => {
        if(bad_shoot.y>=canvas.height){
            B_shoot_array.splice(index,1);
        }
    });
}

//draw image of background and spaceship
function draw(){
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    ctx.drawImage(spaceship_img,spaceship.x,spaceship.y,canvas.width / 20 ,canvas.width / 20)  
}

//check for collision of the bad shoots with the spaceship
function bad_shoot_colider(){
    B_shoot_array.forEach((bad_shoot,index)=>{
        if(bad_shoot.x >= spaceship.x + 0.2 * canvas.width / 20 && 
            bad_shoot.x <=spaceship.x +canvas.width / 20 - 0.3 * canvas.width / 20 && 
            bad_shoot.y >= spaceship.y &&
            bad_shoot.y<= spaceship.y +canvas.width / 20){
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

//check for collision of the good shoots with the bad ships
function good_shoot_colider(){
    G_shoot_array.forEach((good_shot,index)=>{
        bad_ships.forEach(bad_ship=>{
            if (bad_ship.is_alive == true){
                if(good_shot.x >= bad_ship.x + 0.2 * canvas.width / 20 && 
                    good_shot.x <=bad_ship.x +canvas.width / 20 - 0.3 * canvas.width / 20  && 
                    good_shot.y >= bad_ship.y &&
                    good_shot.y<= bad_ship.y +canvas.width / 20){
                        good_hit.currentTime =0;
                        good_hit.play()
                        
                        bad_ship.is_alive= false;
                        G_shoot_array.splice(index,1);
                        score += (4 - bad_ship.row) *5;
                        updateScore();
                        
                    }}
                })
            })
        }

 //resizing the canvas in a way that it will fit the screen       
function resize_cancas(){
    screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || canvas.parentElement.clientWidth;
    screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || canvas.parentElement.clientHeight;
    canvas.width = screenWidth * 0.7;
    canvas.height = screenHeight* 0.7;
    spaceship.x = canvas.width /2
    spaceship.y = canvas.height - 100
    x_pos = 0
    y_pos =0
    for (var i =0; i<5; i++){
        y_pos = 0;
        for (var j=0; j<4; j++){
            if (i ==0 && j == 0 ){
                x_pos = bad_ships[0].x
            }
            bad_ships[i*4 +j].x = x_pos
            bad_ships[i*4 +j].y = y_pos 
            y_pos += canvas.width / 20
        }
        bad_ships[i*4 +j].x = x_pos + canvas.width / 20 
        x_pos += canvas.width / 20 
    }
}

//lisening to resizing 
window.addEventListener('resize',resize_cancas)

//all actions for new game to start 
function startgame(){
    clearInterval(intrval_id)
    clearInterval(intervalTimer)
    good_hit = new Audio("audio/good_hit.wav")
    bad_hit = new Audio("audio/bad_hit.wav")
    shoot_sound = new Audio("audio/shoot.wav")

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
    flag = false;
    interval_counter = 0;
    if(music.currentTime > 0){
        music.pause();
        music.currentTime =0;
    }
    music.volume =0.08
    music.play();
    good_hit.volume =0.4
    bad_hit.volume =0.4
    shoot_sound.volume = 0.4
    

    canvas = document.getElementById("theCanvas");
    ctx = canvas.getContext("2d");
    screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth ||canvas.parentElement.clientWidth;;
    screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight ||canvas.parentElement.clientHeight;;
    canvas.width = screenWidth * 0.7;
    canvas.height = screenHeight *0.7;
  

    //backgruond
    background = new Image();
    background.src= "images/CI5Galaxy.webp";
    background.onload = function(){
        ctx.drawImage(background,0,0,canvas.width,canvas.height);   
    }
    
    //good spaceship
    spaceship = new Object();
    spaceship_img = new Image();
    spaceship_img.src= "images/Spaceship4.png"
    spaceship.x = canvas.width/2
    spaceship.y = canvas.height -100;
    spaceship.onload = function(){
        ctx.drawImage(spaceship_img,spaceship.x,spaceship.y,(canvas.width / 20),(canvas.width / 20)) 
    }
   

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
        y_pos += canvas.width / 20;
        }
        y_pos = 0;
        x_pos += canvas.width / 20 ;
    }

    //listerner for shooting 
    keysDown = {};
    addEventListener("keydown", key_down, false);
    addEventListener("keyup", key_up, false);


    then = Date.now();
    intervalTimer = setInterval(main,30);
    timer();
    updateLives()
    updateScore()
}



function key_down(e){
    keysDown[e.keyCode] = true;
     e.preventDefault();
}

function key_up(e){
    delete keysDown[e.keyCode];
}


//update shoot position
function update_Shoot_Position(modifier){
    interval_counter++;
    key = shootKey.toUpperCase().charCodeAt(0)
   
    if (key in keysDown){// player holding space}
        if (interval_counter >=8 || interval_counter == 0){
            const newshoot = {
            x : spaceship.x +(canvas.width / 20) / 2 ,
            y : spaceship.y,
            speed: 8,
        };
            G_shoot_array.push(newshoot);
            interval_counter =1;
            shoot_sound.currentTime = 0;
            shoot_sound.play();
        }
    }
}

//update spaceship position
function update_spaceship_Position(modifier){
    if ((38 in keysDown) ){// player holding up
        if(spaceship.y >= canvas.height - 0.4 * canvas.height)
        spaceship.y -= 4;
    }
    if ((40 in keysDown) ){// player holding down
        if(spaceship.y <= canvas.height-(canvas.width / 20 ) - 4 )
        spaceship.y += 4;
    }
    if ((37 in keysDown) ){// player holding left
        if(spaceship.x >= 5 )
        spaceship.x -= 5;
    }
    if ((39 in keysDown) ){// player holding right
        if(spaceship.x <= canvas.width - (canvas.width / 20) + 5 )
        spaceship.x += 5;
    }
    
}


//check sign up form
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
    if (!/[a-zA-Z]/.test(pass)) {
        alert("Password must contain at least one letter.");
        return false;}
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
    document.getElementById("game_page").style.display="none";
    document.getElementById("theCanvas").style.display="none";
    document.getElementById("login page").style.display="none";
    document.getElementById("welcome_page").style.display="block";
    document.getElementById("sign_up_page").style.display="none";
    return true;
}

//from welcome page to login page 
function login(){
    if(music.currentTime > 0){
        music.pause();
        music.currentTime =0;
    }
    removeEventListener("keydown", key_down, false);
    removeEventListener("keyup", key_up, false);
    clearInterval(intervalTimer)    
    clearInterval(intrval_id)               
    document.getElementById("welcome_page").style.display = "none";
    document.getElementById("sign_up_page").style.display = "none";
    document.getElementById("game_page").style.display = "none";
    document.getElementById("theCanvas").style.display = "none";
    document.getElementById("login page").style.display = "block";
    document.getElementById("about").style.display = "none";
    document.getElementById("configuration").style.display = "none";



}

//from welcome page to sign up page 
function signup(){
    if(music.currentTime > 0){
        music.pause();
        music.currentTime =0;
    }
    clearInterval(intervalTimer)
    clearInterval(intrval_id)   
    removeEventListener("keydown", key_down, false);
    removeEventListener("keyup", key_up, false);
    document.getElementById("welcome_page").style.display = "none";
    document.getElementById("game_page").style.display = "none";
    document.getElementById("theCanvas").style.display = "none";
    document.getElementById("login page").style.display = "none";
    document.getElementById("sign_up_page").style.display = "block";
    document.getElementById("about").style.display = "none";
    document.getElementById("configuration").style.display = "none";
}


//to welcome page 
function welcome(){
    if(music.currentTime > 0){
        music.pause();
        music.currentTime =0;
    }
    clearInterval(intervalTimer)
    clearInterval(intrval_id)   
    removeEventListener("keydown", key_down, false);
    removeEventListener("keyup", key_up, false);
    document.getElementById("welcome_page").style.display = "block";
    document.getElementById("login page").style.display = "none";
    document.getElementById("sign_up_page").style.display = "none";
    document.getElementById("game_page").style.display = "none";
    document.getElementById("theCanvas").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("configuration").style.display = "none";

}
    

//open about dialog 
function about(){
    document.getElementById("about").style.display = "block";
    document.addEventListener("mouseup", function(event) {
        var dialog = document.getElementById("about")
        // Check if the clicked element is outside of the dialog frame
            if (event.target != dialog && event.target.parentNode != dialog &&  event.target !=this.getElementById("aboutText") && event.target !=this.getElementById( "myAbout"))  {
            // Close the dialog if it is open
                closeDialog();
            }   
            });
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeDialog();
        }
        });
}  


//input from configuration page
function config(event)
{
    event.preventDefault();
    shootKey = event.key;

    if (shootKey === " ")
    {
        shootKey = " ";
        document.getElementById("shootKeyInput").value= event.key;
    }
    //check if shootKey is a letter
    else if (shootKey.length === 1 && shootKey.match(/[a-z]/i))
    {
        document.getElementById("shootKeyInput").value= shootKey;
    }
    else
    {
        alert("Please enter a letter or the space-bar");
    }
}


//from configuration page to game page
function game_after_config(event){
    event.preventDefault();
    gameLength=parseInt(document.getElementById("gameLengthInput").value);
    document.getElementById("gameLengthInput").value= gameLength;
    document.removeEventListener("keydown", config);
    document.getElementById("game_page").style.display="block";
    document.getElementById("theCanvas").style.display="block";
    document.getElementById("configuration").style.display="none";
    startgame();
}


//timer for game
function timer(){
    startTime = Date.now(); // get the current time when the game starts
    timerElement = document.getElementById("timer");
    intrval_id = setInterval(updateTimer,1000) 
    updateTimer();
}

//updating timer
function updateTimer(){
    elapsedTime =  (gameLength * 60 * 1000) -(Date.now() - startTime) ; // calculate the elapsed time
    seconds = Math.floor(elapsedTime / 1000) ; // convert to seconds
    minutes = Math.floor(seconds / 60); // calculate minutes
    var remainingSeconds = seconds % 60; // calculate remaining seconds
    timerElement.innerHTML = `Time elapsed:\n${minutes} minutes ${remainingSeconds} seconds`;
    if( seconds === 0){
        best_scores.push(score)
        showScores();
        startgame();}
    }; // update the timer every second


