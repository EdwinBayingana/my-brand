                                                                        //(9th Feb) with Object storing method
// Global Variables
var row = null;

// Submit function
function Submit() {
  var dataEntered = retrieveData();
  var readData = readingDataFromLocalStorage(dataEntered);

  if (dataEntered == false) {               //extra Validation condition
    
  } else {
    if (row == null) {
        insert(readData);
      } else {
        update();
      }
      // document.getElementById('add-blog-form').reset();
  }
}

//...CREATE...
// Retrieve data from the form
function retrieveData() {
    var blogImage = document.getElementById('blogImageInput');
    var blogId = document.getElementById('blogId').value;
    var title = document.getElementById('titleInput').value;
    var author = document.getElementById('authorInput').value;
    var body = document.getElementById('bodyTextarea').value;

  var arr = [blogImage, blogId, title, author, body];
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
    var theBlogImage = localStorage.setItem("BLog's Image", dataEntered[0]);
    var theBlogId = localStorage.setItem("Blog's Id", dataEntered[1]);
    var theBlogTitle = localStorage.setItem("Title", dataEntered[2]);
    var theBlogAuthor = localStorage.setItem("Author", dataEntered[3]);
    var theBlogBody = localStorage.setItem("Body", dataEntered[4]);

    //Getting Items from localStorage to the table
    var theBlogImage1 = localStorage.getItem("Blog's Image", theBlogImage);
    var theBlogId1 = localStorage.getItem("Blog's Id", theBlogId);
    var theBlogTitle1 = localStorage.getItem("Title", theBlogTitle);
    var theBlogAuthor1 = localStorage.getItem("Author", theBlogAuthor);
    var theBlogBody1 = localStorage.getItem("Body", theBlogBody);

    var arr = [theBlogImage1, theBlogId1, theBlogTitle1, theBlogAuthor1, theBlogBody1];
    return arr;

}

//Insert Data
function insert(readData){
    var row = document.getElementById("blogs-table").insertRow();

    row.insertCell(0).innerHTML = readData[0];
    row.insertCell(1).innerHTML = readData[1];
    row.insertCell(2).innerHTML = readData[2];
    row.insertCell(3).innerHTML = readData[3];
    row.insertCell(4).innerHTML = readData[4];   // Fix the bug of previewing all words of the blog in the table
    row.insertCell(5).innerHTML = `<button onclick = edit(this) class="edit-button-blogs">Edit</button> <button onclick = remove(this) class="delete-button-blogs">Delete</button>`; //add this: <button class="publish-button-blogs">Publish</button>
}

//EDIT Data
function edit(td) {
    row = td.parentElement.parentElement;
    document.getElementById('blogImageInput') = row.cells[0].item;
    document.getElementById('blogId').value = row.cells[1].innerHTML;
    document.getElementById('titleInput').value = row.cells[2].innerHTML;
    document.getElementById('authorInput').value = row.cells[3].innerHTML;
    document.getElementById('bodyTextarea').value = row.cells[4].innerHTML;
}

//....UPDATE....
function update() {
    row.cells[0].item = document.getElementById('blogImageInput');
    row.cells[1].innerHTML = document.getElementById('blogId').value;
    row.cells[2].innerHTML = document.getElementById('titleInput').value;
    row.cells[3].innerHTML = document.getElementById('authorInput').value;
    row.cells[4].innerHTML = document.getElementById('bodyTextarea').value;
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

//Blogs
const blogs= [];
let oldBlogs = localStorage.getItem('blogs') ?? [];
if(oldBlogs.length > 0 ){
  oldBlogs = JSON.parse(oldBlogs);
  oldBlogs.forEach(item => {
    blogs.push(item);
  })

}


                                              //Image Code
  async function uploadImage(e) {
    if(e.target.files.length > 0){
      blogImage = await readImage(e.target.files[0]);
    }
  
  }
  function readImage (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", (e) => {
        resolve(fileReader.result);
      });
    });
  }


//............................................................Form Validation Add-Blog Form..............................................................
const form = document.getElementById('add-blog-form');
const blogImage = document.getElementById('blogImageInput');
const blogId = document.getElementById('blogId');
const title = document.getElementById('titleInput');
const author = document.getElementById('authorInput');
const body = document.getElementById('bodyTextarea');

form.addEventListener('submit', e => {
    e.preventDefault();
  
  
    if(validateInputs() == true) {
      const article = {
        blogImage: null,
        blogId: null,
        title: null,
        author: null,
        body: null,
  
      }
  
  
      // Creating a blog
      const createArticle  = () => {
        article.blogImage = blogImage;
        article.blogId = blogId.value;
        article.title = title.value;
        article.author = author.value;
        article.body = body.value;
      };
      createArticle(article);
      blogs.push(article);
  
      // Storing the Article into the  local storage
      localStorage.setItem('blogs', JSON.stringify(blogs));
    }
  
  })

                                        //Previewing the Image
  previewImage.src = blogImage;

async function showPreview(event) {
  if (event.target.files.length > 0) {
    previewImage.src = await readImage(event.target.files[0]);
    previewImage.style.display = "block";
  }
}

blogImage.addEventListener('change', e=> {
  showPreview(e);

})

// Continued Validation

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
    // const blogImage = blogImage.trim();
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

blogImage.addEventListener('change', e=> {
    uploadImage(e);
  
  })