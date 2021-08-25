/*create a record of books*/

// constructor function
function Book(title, authorFirst, authorLast, pubDate=0, genreArr=[], edition=1, pages=1, formatArr=[], progress="no"){
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
      ${this.pubDate}\n
      Edition ${this.edition} | Page count: ${this.pages}\n
      Genre: ${this.genre.join(", ")}\n
      Format: ${this.format.join(", ")}\n
      Reading Completed: ${this.progress}
      `;
    console.log(infoStr);
  };
  this.printAuthor = function () {
  console.log(`${this.authorFirst} ${this.authorLast}`);
};
}

let book1;
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
  let progressRadio = document.getElementsByName("progress");
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
  let progress;
  for (let choice of progressRadio)
    {
      if (choice.checked) {
        formatArr.push(choice.value);
      }
    }
  book1 = new Book(title, authorFirst, authorLast, pubDate, genreArr, edition, pages, formatArr, progress);
});