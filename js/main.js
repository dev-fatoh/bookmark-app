// TODO : define a function to select element from html

function selectElement(element) {
  return document.querySelector(element);
}
var bookmarks = [];

if (localStorage.getItem("bookmarks")) {
  displayBookMark();
}

function addBookMark() {
  var bookmark = {
    name: selectElement(".b-input").value,
    url: selectElement(".u-input").value,
  };

  bookmarks.push(bookmark);

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookMark();
  clearInputs();
}

function displayBookMark() {
  var marks = JSON.parse(localStorage.getItem("bookmarks"));
  var html = "";
  for (var i = 0; i <= marks.length - 1; i++) {
    html += `
         <tr>
            <td>${i}</td>
            <td>${marks[i].name}</td>
            <td><a href="${marks[i].url}">Visit</a></td>
            <td><button onclick="deleteBookMark(${i})">delete</button></td>
          </tr>`;
  }
  selectElement(".book-list").innerHTML = html;
}

function clearInputs() {
  selectElement(".b-input").value = "";
  selectElement(".u-input").value = "";
}
selectElement(".form .btn").addEventListener("click", addBookMark);

function deleteBookMark(id) {
  bookmarks.splice(id, 1);
  displayBookMark();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
