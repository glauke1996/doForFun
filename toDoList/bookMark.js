const container=document.querySelector(".js-bookMark")
const innerDiv=container.querySelector(".js-innerContainer")
const addBtn=document.querySelector(".js-addBtn")

let=bookMarks=[];

function init() {
    load()
    addBtn.addEventListener("click",handleAdd)
}
function load(){
    const loaded=localStorage.getItem("BookMarks")
    if(loaded != null){
        const parsed=JSON.parse(loaded)
        parsed.forEach(function(bookmark_obj){
            paintBookMark(bookmark_obj.name,bookmark_obj.address)
        })
    }
    else{
        addBtn.addEventListener("click",handleAdd)
    }
}

function paintBookMark(name, address){
    const anchor=document.createElement("a")
    const div=document.createElement("div")
    const str=document.createElement("span")
    const title=document.createElement("span")
    div.appendChild(str)
    anchor.appendChild(div)
    anchor.appendChild(title)
    str.innerText=name[0];
    title.innerText=name
    div.className="h-7 w-7 rounded-full bg-white text-gray-400 justify-center flex";
    str.className="py-0.5 font-bold";
    title.className="text-xs -ml-2";
    anchor.className="hover:opacity-80 h-9 w-9 m-5";
    anchor.href=`${address}`
    innerDiv.insertBefore(anchor,addBtn)
    bookMark_obj={
        name:name,
        address:address
    }
    bookMarks.push(bookMark_obj)
    save(bookMarks)
}
function save(bookMarks){
    localStorage.setItem('BookMarks',JSON.stringify(bookMarks));
}

function handleAdd(event){
    const info=prompt("Input the name and address of it","name, address").split(",")
    console.log(info[0])
    const name=info[0];
    const address=info[1];
    paintBookMark(name, address)
}

init()