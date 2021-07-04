const didList=document.querySelector(".js-didList");
const title=document.querySelector(".title");
const SHOWING="showing";
const loadedDids=localStorage.getItem('history');

console.log(loadedDids);


function loadDids(){
    if(loadedDids!=="[]" && loadedDids!==null){
        title.classList.add(SHOWING);
        title.innerText=`DidList`;
        title.addEventListener("click", handleClick);
        const parsedDids=JSON.parse(loadedDids);
        parsedDids.forEach(function (Did){
            paintDidList(Did.text);
        })
        paintBtn();
    }
}

function handleClick(event){
    event.target.classList.remove(SHOWING);
    didList.classList.add(SHOWING);
}
function paintDidList(text){
    const li=document.createElement("li");
    const span=document.createElement("span");
    span.innerText=`${text}`;
    li.appendChild(span);
    didList.appendChild(li);
}
function paintBtn(){
    const backBtn=document.createElement("button");
    backBtn.innerText=`✔`
    didList.appendChild(backBtn);
    backBtn.addEventListener("click",handleBack)
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText=`✖`
    didList.appendChild(deleteBtn);
    deleteBtn.addEventListener("click",handleDelete)

}
function handleDelete(){
    didList.textContent='';
    const save=[];
    localStorage.setItem('Dids',JSON.stringify(save));
    localStorage.setItem('history',JSON.stringify(save));
}
function handleBack(){
    didList.classList.remove(SHOWING);
    title.classList.add(SHOWING);
}

function init(){
    loadDids();
}

init();