const addBtn=document.querySelector("#addbtn")
const main=document.querySelector("#main")
const colors = ["#ACEEF1","#FF82BB","#FFF746","#78EE51","#FFAC37"];
addBtn.addEventListener(
    "click",
    function(){
        addNote()
    }
)

function getRandomNumber(){
    return Math.floor(Math.random()*colors.length);
}
const saveNotes=()=>{
    const notes=document.querySelectorAll(".note textarea");
    const data=[];
    console.log(notes)

    notes.forEach(
        (note)=>data.push(note.value)
    )
    if (data.length===0){
        localStorage.removeItem("notes")
    }
    else{
    localStorage.setItem("notes",JSON.stringify(data));}
}

const addNote=(text="")=>{
    const note=document.createElement("div");
    note.classList.add("note");
    note.innerHTML=`
    <div class="tool">
    <i class="save fa-regular fa-floppy-disk"></i>
    <i class="trash fa-solid fa-trash"></i>
  </div>
  <textarea>${text}</textarea>
    `; 
    note.style.cssText = 'background-color: #7EFCFF !important'; 
    note.style.backgroundColor = colors[getRandomNumber()];
    const textArea = note.querySelector("textarea");
    textArea.style.backgroundColor = 'transparent';
    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove()
            saveNotes()
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes()
        }
       
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes();
        }
    )
    main.appendChild(note);
    saveNotes();
}
(
    function(){
        const lsnotes=JSON.parse(localStorage.getItem("notes"))
       if(lsnotes===null){
        addNote()
       }
       else{
        lsnotes.forEach(
            (lsnote)=>{addNote(lsnote)}
        )
        }
    }
)()