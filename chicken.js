var validCredentials = [
    {username: "user1", password: "password1"},
    {username: "user2", password: "password2"},
    {username: "user3", password: "password3"}
  ];

function valid()
{
    var username = document.getElementById("in_username").value;
    var password = document.getElementById("in_password").value;
    for (var i = 0; i < validCredentials.length; i++) {
    if (username === validCredentials[i].username && password === validCredentials[i].password) {
        alert("found something")
        return true;
    }
    }
    return false;
}

function addUser()
{
    var username1 = document.getElementById("username").value;
    var password1 = document.getElementById("password").value;
    validCredentials.push({username: username1, password: password1});
  
}



function check(){
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
    addUser();
    console.log(validCredentials);
    return true;

}
  