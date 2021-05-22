const body=document.querySelector("body");
  
const IMG_NUMBER=3;

function paintImage(imgNumber){
    const image=new Image();
    image.src=`images/${imgNumber+1}.jpg`;
    body.appendChild(image);
    image.classList.add("bgImage");
}

function getRandom(){
    const number=Math.floor(Math.random()*4);
    return number;
}

function init(){
    const randomNumber=getRandom();
    paintImage(randomNumber);
}

init();
