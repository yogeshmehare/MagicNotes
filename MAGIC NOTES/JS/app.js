console.log("Welcome to my JS app.")

let addNoteBtn = document.getElementById("addNoteBtn");
let addNoteTitleText = document.getElementById("addNoteTitleText")
let addNoteContent = document.getElementById("addNoteContent")
let savedNotes = document.getElementById("savedNotes")
let searchNoteText = document.getElementById("searchNoteText")
let searchNoteBtn = document.getElementById("searchNoteBtn")


let html = "";
let notes = null;
let tempNote = null;
let notesObj = null;
showNotes();

addNoteBtn.addEventListener("click", function () {
    notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    const uuid = GenerateUuidV4();
    tempNote = new Note(uuid, addNoteTitleText.value, addNoteContent.value, false);
    notesObj.push(tempNote);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    addNoteTitleText.value = "";
    addNoteContent.value = "";

    showNotes(notesObj);
})

searchNoteText.addEventListener("input",function(){searchNote(searchNoteText.value.toLowerCase())});

function showNotes(notesObj){
    html = "";
    let html1 = document.createElement("div");;
    notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function(element, index){
        if(element.Imp){
            html1 = `
            <div id = "Note${element.UUID}" class="card my-2 mx-2 CardWithStarFill" style="width: 18rem;">
                <div class="card-body">
                    <img id="NoteStar${element.UUID}" src="src\\starfill.png" class="starImage" onclick="MakeNoteImp(this.id)" ></img>
                    <h5 class="card-title">${element.Title}</h5>
                    <p class="card-text">${element.Content}</p>
                    <button id="${index}" class="btn btn-danger" onclick="DeleteNote(this.id)">Delete Note</button>
                </div>
            </div>
            `
        }else{
            html1 = `
            <div id = "Note${element.UUID}" class="card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <img id="NoteStar${element.UUID}" src="src\\starnofill.png" class="starImage" onclick="MakeNoteImp(this.id)"></img>
                    <h5 class="card-title">${element.Title}</h5>
                    <p class="card-text">${element.Content}</p>
                    <button id="${index}" class="btn btn-danger" onclick="DeleteNote(this.id)">Delete Note</button>
                </div>
            </div>
            `
        }
        html+=html1;
    });
    if(notesObj.length==0){
        savedNotes.innerHTML = `<p class="NoNotes">No Saved Notes found. Please add note in add note section.</p>`;
    }else{
        savedNotes.innerHTML = html;
    }
}

function DeleteNote(index){
    notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}


function searchNote(textToSearch){
    
    let noteCards = document.getElementsByClassName("card");

    Array.from(noteCards).forEach(function(element,index){
        let cardTitle = element.getElementsByTagName("h5");
        if(cardTitle.length>0){
            cardTitle = cardTitle[0].innerText;
        }
        let cardText = element.getElementsByTagName("p");
        if(cardText.length > 0){
            cardText = cardText[0].innerText;
        }

        if(cardText.length > 0 && cardTitle.length>0){
            if(cardTitle.includes(textToSearch) || cardText.includes(textToSearch)){
                    element.style.display = "block";
                }else{
                    element.style.display = "none";
                }
            }
        }
    )
}

function MakeNoteImp(uuid){
    // let noteCards = document.getElementsByClassName("card");

    // Array.from(noteCards).forEach(function(element,index){
    //     let starImg = element.getElementById(id);

    //     if(starImg.src == "src\\starfill.png")
    //         starImg.src = "src\\starnofill.png" 
    //     else
    //         starImg.src = "src\\starfill.png"
    // })
    notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.forEach(function(element){
        if(element.UUID == uuid.substring(8)){
            element.Imp = !element.Imp;
        }
    });

    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

function GenerateUuidV4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

class Note {
    constructor(uuid, title, content, imp) {
        this.UUID = uuid;
        this.Title = title;
        this.Content = content;
        this.Imp = imp;
    }
}
