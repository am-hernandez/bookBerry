/*create a record of books*/

class Book {
  constructor(
    title,
    authorFirst,
    authorLast,
    pubDate,
    genreArr,
    edition,
    pages,
    formatArr,
    progress
  ) {
    this.title = title;
    this.authorFirst = authorFirst;
    this.authorLast = authorLast;
    this.genre = genreArr;
    this.pubDate = pubDate;
    this.edition = edition;
    this.pages = pages;
    this.format = formatArr;
    this.progress = progress;
  }
  printBookInfo = function () {
    let infoStr = `
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
  printAuthor = function () {
    console.log(`${this.authorFirst} ${this.authorLast}`);
  };
}

// factory function to make Book instances
function bookFactory() {
  // set variables to target elements in DOM after they have been filled
  let title = document.getElementById("bookTitle").value;
  let authorFirst = document.getElementById("authorFirst").value;
  let authorLast = document.getElementById("authorLast").value;
  let genre = document.getElementsByName("genre");
  let pubDate = document.getElementById("pubDate").value;
  let edition = parseInt(document.getElementById("edition").value);
  let pages = parseInt(document.getElementById("pages").value);
  let format = document.getElementsByName("format");
  let progress = document.forms.bookForm.elements.progress.value;
  // get checked checkboxes into an array
  let genreArr = [];
  genre.forEach((checkbox) => {
    if (checkbox.checked) {
      genreArr.push(checkbox.value);
    }
  });
  let formatArr = [];
  format.forEach((checkbox) => {
    if (checkbox.checked) {
      formatArr.push(checkbox.value);
    }
  });

  return new Book(
    title,
    authorFirst,
    authorLast,
    pubDate,
    genreArr,
    edition,
    pages,
    formatArr,
    progress
  );
}

// download list of book objects created
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/json," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.setAttribute("target", "_blank");

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// create bookshelf
let bookshelf = document.getElementById("bookshelf");
let shelfArr = [];

// target button for form submission
const form_submit = document.getElementById("form_submit");

// on button submit create new instance of class Book
form_submit.addEventListener("click", function () {
  shelfArr.push(bookFactory()); //push book obj to shelf arr
  bookshelf.classList.remove("hidden");
});

bookshelf.addEventListener("click", function () {
  /*
    generate download file and populate the file 
    with string array of book objects
  */
  let text =
    `"library": {\n` +
    shelfArr.reduce((collection, book, index) => {
      let bookStr = `\t"book${index}": {\n`;
      for (const key in book) {
        if (Array.isArray(book[key])) {
          let keyArr = book[key].reduce((a, b, index) => {
            if (index === book[key].length - 1) {
              a += `"${b}"`;
              return a;
            } else {
              a += `"${b}", `;
              return a;
            }
          }, []);
          bookStr += `\t\t"${key}": [${keyArr}],\n`;
        } else if (typeof book[key] === "number") {
          bookStr += `\t\t"${key}": ${book[key]},\n`;
        } else if (typeof book[key] === "string") {
          bookStr += `\t\t"${key}": "${book[key]}",\n`;
        }
      }
      collection += bookStr + "\t},\n";
      return collection;
    }, "") +
    "};\n";
  let filename = "bookBerry_download";
  download(filename, text);
});
