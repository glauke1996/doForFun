const didList=document.querySelector(".js-didList");
const title=document.querySelector(".title");
const SHOWING="showing";
const loadedDids=localStorage.getItem('Dids');

console.log(loadedDids);


function loadDids(){
    if(loadedDids!=="[]"){
        title.classList.add(SHOWING);
        title.innerText=`DidList`;
        title.addEventListener("click", handleClick);
    }
}

function handleClick(event){
    event.target.classList.remove(SHOWING);
    didList.classList.add(SHOWING);
    const parsedDids=JSON.parse(loadedDids);
    parsedDids.forEach(function (Did){
        paintDidList(Did[0].text);
    })
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText=`✔`
    didList.appendChild(deleteBtn);
    deleteBtn.addEventListener("click",handleDelete)
}
function paintDidList(text){
    const li=document.createElement("li");
    const span=document.createElement("span");
    span.innerText=`${text}`;
    li.appendChild(span);
    didList.appendChild(li);
}
function handleDelete(){
    didList.textContent='';
    const save=[];
    localStorage.setItem('Dids',JSON.stringify(save));
    localStorage.setItem('history',null);
}

function init(){
    loadDids();
}

init();