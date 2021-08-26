/*create a record of books*/

// constructor function
function Book(title, authorFirst, authorLast, pubDate, genreArr, edition, pages, formatArr, progress){
    this.title = title;
    this.authorFirst = authorFirst;
    this.authorLast = authorLast;
    this.genre = genreArr;
    this.pubDate = pubDate;
    this.edition = edition;
    this.pages = pages;
    this.format = formatArr;
    this.progress = progress;
    this.printBookInfo = function () {
        let infoStr =`
            ${this.title}\n
            ${this.authorLast}, ${this.authorFirst}\n
            \u00A9 ${this.pubDate} | Edition ${this.edition}\n
            ${this.pages} pages\n
            ${this.genre.join(", ")}\n
            ${this.format.join(", ")}\n
            Reading Completed: ${this.progress}
        `;
        console.log(infoStr);
    };
    this.printAuthor = function () {
        console.log(`${this.authorFirst} ${this.authorLast}`);
    };
}

// on button submit create new object using constructor function
form_submit.addEventListener("click", function(){
    // set variables to target elements in DOM
    let title = document.getElementById("bookTitle").value;
    let authorFirst = document.getElementById("authorFirst").value;
    let authorLast = document.getElementById("authorLast").value;
    let genre = document.getElementsByName("genre");
    let pubDate = document.getElementById("pubDate").value;
    let edition = document.getElementById("edition").value;
    let pages = document.getElementById("pages").value;
    let format = document.getElementsByName("format");
    let progress = document.forms.bookForm.elements.progress.value;
    const form_submit = document.getElementById("form_submit");
    let genreArr = [];
    for (let checkbox of genre)
        {
          if (checkbox.checked) {
            genreArr.push(checkbox.value);
          }
        }
    let formatArr = [];
    for (let checkbox of format)
        {
          if (checkbox.checked) {
            formatArr.push(checkbox.value);
          }
        }
    return new Book(title, authorFirst, authorLast, pubDate, genreArr, edition, pages, formatArr, progress);
});
