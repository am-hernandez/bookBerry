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
  let bookForm = document.getElementById("bookForm");
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
  bookForm.reset(); // Reset all form data
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

// download function to download the library file created
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/json," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// target the button for downloading the library file
let download_lib = document.getElementById("download_lib");
// create the library array
let libraryArr = [];

// target button for form submission
const form_submit = document.getElementById("form_submit");

// on form button submit create new instance of class Book
form_submit.addEventListener("click", function () {
  libraryArr.push(bookFactory()); //push book obj to libraryArr
  download_lib.classList.remove("hidden");
});

// initiate download of library file when download_lib is clicked
download_lib.addEventListener("click", function () {
  /*
    generate download file and populate the file 
    with string array of book objects. This string (text)
    will follow JSON syntax
  */
  let text =
    `{\n` +
    libraryArr.reduce((collection, book, index) => {
      let bookStr = `\t"book${index}": {\n`;
      let bookArr = Object.entries(book);
      for (let i = 0; i < bookArr.length; i++) {
        let keyName = bookArr[i][0];
        let keyVal = bookArr[i][1];
        if (Array.isArray(keyVal)) {
          let keyArr = keyVal.reduce((a, b, arrIndex) => {
            if (arrIndex === keyVal.length - 1) {
              a += `"${b}"`;
              return a;
            } else {
              a += `"${b}", `;
              return a;
            }
          }, []);
          bookStr += `\t\t"${keyName}": [${keyArr}],\n`;
        } else if (typeof keyVal === "number") {
          bookStr += `\t\t"${keyName}": ${keyVal},\n`;
        } else if (typeof keyVal === "string") {
          bookStr += `\t\t"${keyName}": "${keyVal}",\n`;
        }
        if (i === bookArr.length - 1) {
          let startStr = bookStr.slice(0, -2);
          let endStr = bookStr.slice(-1);
          bookStr = startStr + endStr;
        }
      }
      collection += bookStr + "\t},\n";
      if (index === libraryArr.length - 1) {
        let startStr = collection.slice(0, -2);
        let endStr = collection.slice(-1);
        collection = startStr + endStr;
      }
      return collection;
    }, "") +
    "}\n";
  let filename = "bookBerry_download";
  download(filename, text);
});
