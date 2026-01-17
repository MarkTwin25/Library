const addBookButton = document.getElementById("add");
const screenAdd = document.getElementById("screen-add");

// Modal buttons
const addButton = document.getElementById("add-book");
const cancel = document.getElementById("cancel");

// form
const form = document.getElementById("form");

//inputs
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("readInput");

// cards
const cards = document.getElementById("cards").querySelector(".container");

let library = JSON.parse(localStorage.getItem("lib"))||[];

// Contructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// clear modal
function clearAndHideModal(){
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;

    // hide modal
    screenAdd.style.display = "none";
}

// Create a book card
function createCard(book){
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    newCard.innerHTML =  `
    <div class="info">
        <p class="title">${book.title}</p>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages} pages</p>
        <div class="buttons">
            ${book.read ? "<button class='read yes'>Read</button>": '<button class="read">Not Read</button>'}
            <button class="delete">Delete</button>
        </div>
    </div>`

    newCard.id = book.id;
    cards.appendChild(newCard);

}

// Listeners
addBookButton.addEventListener("click", ()=> {
    screenAdd.style.display = "flex";
});


screenAdd.addEventListener("click", (e) => {
    if(e.target.id === "screen-add"){
        clearAndHideModal();
    };
});

cancel.addEventListener("click", () => {
    clearAndHideModal();
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.checked ? true:false
    );
    //Create card
    createCard(newBook);

    // library.push(newBook);
    clearAndHideModal();

    //ad book to library
    library.push(newBook);
    localStorage.setItem("lib", JSON.stringify(library));

});


cards.addEventListener("click", (e) => {
    const parent = e.target.parentNode.parentNode.parentNode;
    if(e.target.classList.contains("delete")){
        e.target.parentNode.parentNode.parentNode.remove();

        library = library.filter(book => book.id !== parent.id);
        localStorage.setItem("lib", JSON.stringify(library));
    }else if(e.target.classList.contains("read")){


        if(e.target.classList.contains("yes")){
            e.target.classList.remove("yes");
            e.target.innerText = "Not Read";

            library = library.map(book => {
            if(book.id === parent.id){
                book.read = false;
            }
            return book;
        });
        }else{
            e.target.classList.add("yes");
            e.target.innerText = "Read";
            
            library = library.map(book => {
                if(book.id === parent.id){
                    book.read = true;
                }
                return book;
            });
        }

        localStorage.setItem("lib", JSON.stringify(library));
        console.log(e.target.parentNode.parentNode.parentNode);
    }
})

// Load cards in local storage
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("lib") == null){
        localStorage.setItem("lib",JSON.stringify(library));
    }else{
        JSON.parse(localStorage.getItem("lib")).forEach(e => {
            createCard(e);
        })
    }
})
