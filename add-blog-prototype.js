                                                                        //(8th Feb)
// Global Variables
var row = null;

// Submit function
function Submit() {
  var dataEntered = retrieveData();
  var readData = readingDataFromLocalStorage(dataEntered);

  if (dataEntered == false) {
    
  } else {
    if (row == null) {
        insert(readData);
      } else {
        update();
      }
      document.getElementById('add-blog-form').reset();
  }
}

//...CREATE...
// Retrieve data from the form
function retrieveData() {
    var blogId = document.getElementById('blogId').value;
    var title = document.getElementById('titleInput').value;
    var author = document.getElementById('authorInput').value;
    var body = document.getElementById('bodyTextarea').value;

  var arr = [blogId, title, author, body];
  if (arr.includes("")) {
    return false;
  } else {
    return arr;
  }
}

//...READ...
//Data in the localStorage
function readingDataFromLocalStorage(dataEntered){
    //Storing data in the localstorage
    var theBlogId = localStorage.setItem("Blog's Id", dataEntered[0]);
    var theBlogTitle = localStorage.setItem("Title", dataEntered[1]);
    var theBlogAuthor = localStorage.setItem("Author", dataEntered[2]);
    var theBlogBody = localStorage.setItem("Body", dataEntered[3]);

    //Getting Items from localStorage to the table
    var theBlogId1 = localStorage.getItem("Blog's Id", theBlogId);
    var theBlogTitle1 = localStorage.getItem("Title", theBlogTitle);
    var theBlogAuthor1 = localStorage.getItem("Author", theBlogAuthor);
    var theBlogBody1 = localStorage.getItem("Body", theBlogBody);

    var arr = [theBlogId1, theBlogTitle1, theBlogAuthor1, theBlogBody1];
    return arr;

}

//Insert Data
function insert(readData){
    var row = document.getElementById("blogs-table").insertRow();

    row.insertCell(0).innerHTML = readData[0];
    row.insertCell(1).innerHTML = readData[1];
    row.insertCell(2).innerHTML = readData[2];
    row.insertCell(3).innerHTML = readData[3];   // Fix the bug of previewing all words of the blog in the table
    row.insertCell(4).innerHTML = `<button onclick = edit(this) class="edit-button-blogs">Edit</button> <button onclick = remove(this) class="delete-button-blogs">Delete</button>`;
}

//EDIT Data
function edit(td) {
    row = td.parentElement.parentElement;
    document.getElementById('blogId').value = row.cells[0].innerHTML;
    document.getElementById('titleInput').value = row.cells[1].innerHTML;
    document.getElementById('authorInput').value = row.cells[2].innerHTML;
    document.getElementById('bodyTextarea').value = row.cells[3].innerHTML;
}

//....UPDATE....
function update() {
    row.cells[0].innerHTML = document.getElementById('blogId').value;
    row.cells[1].innerHTML = document.getElementById('titleInput').value;
    row.cells[2].innerHTML = document.getElementById('authorInput').value;
    row.cells[3].innerHTML = document.getElementById('bodyTextarea').value;
    row = null;
}

//....DELETE....
function remove(td) {
    var ans = confirm("Are you sure you want to delete this blog?");
    if (ans == true) {
        row = td.parentElement.parentElement;
        document.getElementById('blogs-table').deleteRow(row.rowIndex);
    }
}

//............................................................Form Validation Add-Blog Form..............................................................
const form = document.getElementById('add-blog-form');
const blogId = document.getElementById('blogId');
const title = document.getElementById('titleInput');
const author = document.getElementById('authorInput');
const body = document.getElementById('bodyTextarea');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateInputs = () => {
    const blogValue = blogId.value.trim();
    const titleValue = title.value.trim();
    const authorValue = author.value.trim();
    const bodyValue = body.value.trim();


    if(blogValue == '') {
        setError(blogId, 'The Blog Id is required');
    } else {
        setSuccess(blogId);
    }

    if(titleValue == '') {
        setError(title, 'Title is required');
    } else {
        setSuccess(title);
    }

    if(authorValue == '') {
        setError(author, 'Author name is required');
    } else {
        setSuccess(author);
    }

    if(bodyValue == '') {
        setError(body, 'The Body is required');
    } else {
        setSuccess(body);
    }

    if(blogValue && titleValue && authorValue && bodyValue){
        return true;
    } else {
        return false;
    }
};