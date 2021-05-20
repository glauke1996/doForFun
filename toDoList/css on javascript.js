const title=document.querySelector('h1');

const BASE_COLOR="rgb(255, 255, 255)";
const OTHER_COLOR="#2ecc71";
// console.dir(title);
title.innerHTML="Hi,Js";

// document.title="This is my first webSite!"
function handleResize(){
    console.log("I've been sized");
}
function handleClick(){
    const currentColor=title.style.color;
    if(currentColor===BASE_COLOR){
        title.style.color=OTHER_COLOR;
    }
    else
        title.style.color=BASE_COLOR;
}
function init(){
    title.style.color=BASE_COLOR;
}
init();
window.addEventListener('resize',handleResize);
title.addEventListener("mouseenter",handleClick);