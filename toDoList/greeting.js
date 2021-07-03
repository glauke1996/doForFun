const form=document.querySelector(".js-form"),
input=form.querySelector("input"),
greeting=document.querySelector(".js-greetings"),
USER_LS="currentUser",
SHOWING_CN="showing";

const userName=[];

function init(){
    loadName();
    
}

function paintgreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    const date = new Date();
    const hours=date.getHours(); //non-static function
    if (hours>=6 && hours<=11){
        greeting.innerText=`Good Morning ${text} !`;
    }
    else if (hours >=12 && hours <=16){
        greeting.innerText=`Good Afternoon ${text} !`;
    }
    else if (hours >= 17 && hours<=21){
        greeting.innerText=`Good Evening ${text} !`;
    }
    else {
        greeting.innerText=` Hello ${text}! What will you do?`
    }
}
function saveUserName(){
    localStorage.setItem(USER_LS,userName);
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue=input.value;
    userName.push(currentValue);
    saveUserName();
    paintgreeting(currentValue);
}
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}
function loadName(){
    const currentUser=localStorage.getItem(USER_LS);
    if(currentUser===null){
        askForName();
    }
    else{
        paintgreeting(currentUser);
    }
}
init();