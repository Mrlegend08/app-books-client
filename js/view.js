let elTemplate = document.querySelector(".template").content;
let elList = document.querySelector(".temp-list");
function iwla() {
    if (localStorage.getItem("index")) {
        let book = books[Number(localStorage.getItem("index"))];
        elList.innerHTML = "";
        let cloneTemp = elTemplate.cloneNode(true);
        cloneTemp.querySelector(".author").textContent = book.author;
        cloneTemp.querySelector(".title").textContent = book.title;
        cloneTemp.querySelector(".js-year").textContent = book.year;
        cloneTemp.querySelector(".js-read").textContent = book.pages;
        cloneTemp.querySelector(".js-language").textContent = book.language;
        cloneTemp.querySelector(".wikipedia").href = book.link;
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
        elList.appendChild(cloneTemp);
    }
}

iwla();