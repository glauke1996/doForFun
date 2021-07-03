const toDoForm=document.querySelector(".js-toDoForm"),
toDoInput=toDoForm.querySelector("input"),
toDoList=document.querySelector(".js-toDoList");


const TODOS_LS='toDos';

let toDos=[];
let Dids=[]; //local

function loadToDos() {
    const loadedToDos=localStorage.getItem(TODOS_LS);
    if(loadedToDos!==null){
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }else{
        
    }
}

function paintToDo(text){
    const li=document.createElement("li");
    const delBtn=document.createElement("button");
    const span=document.createElement("span");
    const newId=toDos.length+1;
    delBtn.innerHTML="<i class='ml-4 fas fa-eraser'></i>delete"
    delBtn.classList.add("text-xs")
    delBtn.addEventListener("click",deleteToDo);
    span.innerText=`${text}`;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    toDoList.classList.add("toDoSize");
    li.id=newId;
    const toDoObj={
        text:text,
        id:newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function deleteToDo(event){
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    //________________________________
    const deleted=toDos.filter(function (Did) {
        console.log(Did.id,li.id);
        return Did.id===parseInt(li.id);
    })
    IO(deleted[0]);
    //________________________________Dids    
    const cleanToDos=toDos.filter(function (toDo) {
        console.log(toDo.id, li.id);
        return toDo.id !==parseInt(li.id);
    })
    console.log(cleanToDos);
    toDos=cleanToDos;
    saveToDos();
}
    function handleSubmit(event){
        event.preventDefault();
        const currentValue=toDoInput.value;
        paintToDo(currentValue);
        toDoInput.value="";
    }
    function IO(potato){
        let potatos=[];
        let newPotatos=[];
        potatos=JSON.parse(localStorage.getItem('history'));
        if(potatos!==null){
            newPotatos=potatos.filter(function (sweet){
                return sweet!==potato;
            })
        }
        newPotatos.push(potato);//non duplicated Dids
        console.log(newPotatos);
        
        localStorage.setItem('history',JSON.stringify(newPotatos));
        console.log(localStorage.getItem('history'));
    }

    function saveToDos(){
        localStorage.setItem('toDos',JSON.stringify(toDos));
    }

    function init(){
        loadToDos();
        toDoForm.addEventListener("submit",handleSubmit);
    }

    init();