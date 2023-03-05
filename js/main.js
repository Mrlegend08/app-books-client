let elForm = document.querySelector(".form");
let elInput = document.querySelector(".main-input");
let elBtn = document.querySelector(".button");
let elSelectAuthor = document.querySelector(".selectAuthor");
let elYear = document.querySelector(".year");

//! GET TEMPLATE TEMPLATE
let elTemplate = document.querySelector(".template").content;
let elList = document.querySelector(".temp-list");
elFragment = new DocumentFragment();
let authorList = [];

//! LOCAL STORAGE GET ELEMENT
let setArr = null;
if (localStorage.getItem("nimadir") == null) {
    setArr = []; 
} else {
    setArr = JSON.parse(localStorage.getItem("nimadir"));
}

//! MAIN RENDER FUNCTION
function render(params) {
    elList.innerHTML = "";
    params.forEach((book, index) => {
        let cloneTemp = elTemplate.cloneNode(true);
        // cloneTemp.querySelector(".image").src = book.imageLink;
        cloneTemp.querySelector(".js-items").addEventListener("click", (evt) => {
            if(!evt.target.matches(".btn")){
                localStorage.setItem("index", `${index}`);
                window.location.href = `./view.html`;
            }
        })
        cloneTemp.querySelector(".author").textContent = book.author;
        authorList.push(book.author)
        cloneTemp.querySelector(".title").textContent = book.title;
        cloneTemp.querySelector(".js-year").textContent = book.year;
        cloneTemp.querySelector(".js-read").textContent = book.pages;
        cloneTemp.querySelector(".js-language").textContent = book.language;
        cloneTemp.querySelector(".wikipedia").href = book.link;
        //! LOCAL STORAGE GET UNIQUE ELEMENT 
        cloneTemp.querySelector(".btn").addEventListener("click", () => {
            let count = 0;
            setArr.forEach((value) => {
                if (value.title === book.title) {
                    count++;
                }
            })
            if (count === 0) {
                count = 0;
                setArr.push(book);
            }
            localStorage.setItem("nimadir", JSON.stringify(setArr));
        })
        elFragment.appendChild(cloneTemp);
    })
    elList.appendChild(elFragment);
}
render(books)


//! LOCAL STORAGE RENDER FUNCRION
document.querySelector(".btn-saves").addEventListener("click", () => {
    let arr = localStorage.getItem("nimadir")
    arr = JSON.parse(arr);
    function Getrender() {
        elList.innerHTML = null;
        arr.forEach(book => {
            let cloneTemp = elTemplate.cloneNode(true);
            // cloneTemp.querySelector(".image").src = book.imageLink;
            cloneTemp.querySelector(".author").textContent = book.author;
            cloneTemp.querySelector(".title").textContent = book.title;
            cloneTemp.querySelector(".js-year").textContent = book.year;
            cloneTemp.querySelector(".js-read").textContent = book.pages;
            cloneTemp.querySelector(".js-language").textContent = book.language;
            cloneTemp.querySelector(".wikipedia").href = book.link;
            elFragment.appendChild(cloneTemp);
        })
        elList.appendChild(elFragment);
    }
    Getrender()
})

//! SEARCH BY INPUT FUNCTIONS
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let searchQuery = new RegExp(elInput.value, "gi")
    let searchQueryText = books.filter(book => String(book.title).match(searchQuery))
    render(searchQueryText)
})

//! FROM SELECT UNIQE GET FUNCTION 
function selectGenerator() {
    let arr = [];
    books.forEach((v) => {
        arr.push(v.author);
    });
    let flattedArr = arr.flat(Infinity);
    let unique = new Set([...flattedArr]);
    let arruniqe = [];
    unique.forEach((janr) => {
        arruniqe.push(janr);
    });
    arruniqe.sort();
    arruniqe.forEach((janr  ) => {
        const option = document.createElement("option");
        option.value = janr;
        option.textContent = janr;
        elSelectAuthor.append(option);
    })
}
selectGenerator()

// ! THIS FUNCTION FILTER BY AUTHOR
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (elSelectAuthor.value == "author") {
        render(books)
    } else {
        let searchQuery = new RegExp(elSelectAuthor.value, "gi")
        let search = books.filter(book => book.author.match(searchQuery))
        render(search)
    }
})

//! THIS FUNCTION FILTER BY YEAR
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (elYear.value == "old") {
        books.sort((a, b) => a.year - b.year)
        console.log("ishladi")
        render(books)
    } else {
        books.sort((a, b) => b.year - a.year)
        render(books)
    }
})

