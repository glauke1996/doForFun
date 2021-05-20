const form=document.querySelector(".js-form"),
input=form.querySelector("input"),
greeting=document.querySelector(".js-greetings"),
USER_LS="currentUser",
SHOWING_CN="showing";

function init(){
    loadName();

}


function paintgreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText=`Hello ${text}`;
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue=input.value;
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