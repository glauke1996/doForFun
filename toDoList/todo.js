const toDoForm=document.querySelector(".js-toDoForm"),
    toDoInput=toDoForm.querySelector("input"),
    toDoList=document.querySelector(".js-toDoList");

    const TODOS_LS='toDos';

    function loadToDos() {
        const toDos=localStorage.getItem(TODOS_LS);
        if(toDos!==null){

        }else{

        }
    }
    function handleSubmit(event){
        event.preventDefault();
        const currentValue=toDoInput.value;
        paintToDo(currentValue);
        toDoInput.value="";
    }
    function paintToDo(text){
        const li=document.createElement("ul");
        const delBtn=document.createElement("button");
        delBtn.innerText="❤";
        const span=document.createElement("span");
        span.innerText=text;
        li.appendChild(span);
        li.appendChild(delBtn);
        toDoList.appendChild(li);
    }

    function init(){
        loadToDos();
        toDoForm.addEventListener("submit",handleSubmit);
    }

    init();