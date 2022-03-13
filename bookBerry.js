/*create a record of books*/

class Book {
  constructor(
    title,
    authorFirst,
    authorLast,
    pubDate,
    genres,
    edition,
    pages,
    formatArr,
    progress
  ) {
    this.title = title;
    this.authorFirst = authorFirst;
    this.authorLast = authorLast;
    this.genre = genres;
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
  const bookForm = document.getElementById("bookForm");
  const title = document.getElementById("bookTitle").value;
  const authorFirst = document.getElementById("authorFirst").value;
  const authorLast = document.getElementById("authorLast").value;
  const pubDate = document.getElementById("pubDate").value;
  const edition = parseInt(document.getElementById("edition").value);
  const pages = parseInt(document.getElementById("pages").value);
  const progress = parseInt(document.getElementById("progress").value);
  const genres = Array.from(
    document.querySelectorAll("input[name=genre]:checked")
  ).map((genre) => genre.value);
  const formats = Array.from(
    document.querySelectorAll("input[name=format]:checked")
  ).map((format) => format.value);

  // Reset all form data
  bookForm.reset();

  return new Book(
    title,
    authorFirst,
    authorLast,
    pubDate,
    genres,
    edition,
    pages,
    formats,
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

// target the span element progress_percentage
const progressPercentage = document.getElementById("progress_percentage");

// target the slider
const progress = document.getElementById("progress");

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
    creates JSON of library and begins download
  */
  let json = JSON.stringify(libraryArr);
  let filename = "bookBerry_download";
  download(filename, json);
});

// update progress percentage number whenever slider is moved
progress.oninput = () => {
  progressPercentage.innerText = progress.value;
};
