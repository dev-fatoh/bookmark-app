// TODO : define a function to select element from html

function selectElement(element) {
  return document.querySelector(element);
}

var bookmarks = [];
// TODO : check if localestorage has a values or not
if (localStorage.getItem("bookmarks")) {
  displayBookMark();
}
//TODO : create a function to add a bookmark in the array and also localeStorage
function addBookMark() {
  var bookmark = {
    name: selectElement(".b-input").value,
    url: selectElement(".u-input").value,
  };
  if (checkUrl() && checkBookMarkName()) {
    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookMark();
    clearInputs();
  }
}
// TODO : function to display bookmarks in UI
function displayBookMark() {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var html = "";
  for (var i = 0; i <= bookmarks.length - 1; i++) {
    html += `
         <div class="bookmark">
            <h4>Name : <span>${bookmarks[i].name}</span></h4>
            <h4>visit : <a href="${bookmarks[i].url}">${bookmarks[i].url}</a></h4>
            <button onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash"></i></button>
          </div>`;
  }
  selectElement(".bookmarks").innerHTML = html;
}
// TODO : url validation
function checkUrl() {
  var urlR =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  if (
    selectElement(".u-input").value &&
    urlR.test(selectElement(".u-input").value)
  ) {
    // NOTE : change the border if the url is valid
    selectElement(".u-input").style.border = "2px solid green";

    selectElement("p.message-url").style.display = "none";
    return true;
  } else {
    // NOTE : change the border if the url is notvalid with red border
    selectElement(".u-input").style.border = "2px solid red";
    selectElement("p.message-url").innerHTML = "please this field is required";
    selectElement("p.message-url").style.display = "block";

    return false;
  }
}
function checkBookMarkName() {
  if (selectElement(".b-input").value) {
    selectElement(".b-input").style.border = "2px solid green";

    selectElement("p.message-name").style.display = "none";
    return true;
  } else {
    selectElement(".b-input").style.border = "2px solid red";
    selectElement("p.message-name").innerHTML = "please this field is required";
    selectElement("p.message-name").style.display = "block";
    return false;
  }
}

// TODO : reset inputs
function clearInputs() {
  selectElement(".b-input").value = "";
  selectElement(".u-input").value = "";
}

// TODO : delete bookmark and update localStorage
function deleteBookMark(id) {
  bookmarks.splice(id, 1);

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookMark();
}

// TODO : events

selectElement(".u-input").addEventListener("change", checkUrl);
selectElement(".b-input").addEventListener("change", checkBookMarkName);

selectElement(".form .btn").addEventListener("click", addBookMark);
