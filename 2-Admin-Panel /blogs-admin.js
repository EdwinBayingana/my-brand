//....................................................CRUD operations................................................................................

//............Global Variation.............
var form = document.querySelector('#add-blog-form');
var allInput = document.querySelectorAll('input');
var allTextarea = document.querySelectorAll('textarea');
var blogsData = [];
var blogImage = document.querySelector('#blog-image');
var uploadImage = document.querySelector('#upload-field');
var saveBlogBtn = document.querySelector('#add-blog-form-save-button');
var updateBtn = document.querySelector('#update-btn');
var title = document.getElementById('titleInput');
var author = document.getElementById('authorInput');
var body = document.getElementById('bodyTextarea');
var imgUrl;
var imageUrl;

var addBlogBtn = document.querySelector('#the-add-blog-button');
var modal = document.querySelector('.modal');

//Close Modal functionality
var closeModalBtn = document.querySelector('.close-icon');
addBlogBtn.onclick = function () {
  modal.classList.add('active');
};
closeModalBtn.onclick = function () {
  modal.classList.remove('active');
  for (var i = 0; i < allInput.length; i++) {
    //To clear everytime
    allInput[i].value = '';
  }
  for (var i = 0; i < allTextarea.length; i++) {
    allTextarea[i].value = '';
  }
};

// Save Blog Button Functionality
saveBlogBtn.onclick = function (e) {
  e.preventDefault();
  //   registrationData();
  form.reset('');
  closeModalBtn.click();
};

// ?...................................................................ViewBlogs........................................................................
const blogsTable = document.querySelector('#table-data');
// const articles = document.querySelector("#t-body");

const fetchBlogs = async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:7000/api/blogs/getAllBlogs',
      // 'https://repulsive-frog-jacket.cyclic.app/api/blogs/getAllBlogs',
      {
        method: 'GET',
      },
    );
    const blogs = response.json();
    return blogs;
  } catch (error) {
    console.log('Error fetching blogs: ', error.message);
  }
};

fetchBlogs()
  .then((res) => {
    console.log(res);
    res.data.forEach((item, index) => {
      blogsTable.insertAdjacentHTML(
        'afterbegin',
        `
      <tr>
      <td>${index + 1}</td>
      <td>
      <img src="${item.imageUrl}" alt="" srcset="" width=75 height=75/>
      </td>
      <td>${item.author}</td>
      <td>${item.title}</td>
      <td>${item.body}</td>
      <td>
            <button class="edit-button-blogs edit-btn" onclick="updateUser('${
              item._id
            }')">Edit</button>
            <button class="delete-button-blogs del-btn" onclick="deleteBlog('${
              item._id
            }')">Delete</button>
        </td>

      </tr>

      `,
      );
    });
  })
  .catch((err) => {
    alert(err);
  });

//?...............................................................Delete Blogs...................................................start.............
function deleteBlog(id) {
  var ans = confirm('Are you sure you want to delete this blog?');
  if (ans == true) {
    //*Deleting blogs from the t-body
    fetch(`http://127.0.0.1:7000/api/blogs/deleteBlog/${id}`, {
      //!..........................To create backend functionality for this
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
      // body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }
}

// ?...................................................................Edit Blogs.....................................................start.......
function updateUser(id) {
  var title = document.getElementById('titleInput').value;
  var author = document.getElementById('authorInput').value;
  var body = document.getElementById('bodyTextarea').value;
  var imageUrl = imgUrl;

  fetch(`http://127.0.0.1:7000/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('authToken')}`,
    },
    // body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((err) => {
      alert(err);
    });
}
//!.................................................................................................................................................
var allEditButtons = document.querySelectorAll('.edit-btn');
for (var i = 0; i < allEditButtons.length; i++) {
  allEditButtons[i].onclick = function () {
    // var tr = this.parentElement.parentElement;
    // var td = tr.getElementsByTagName('TD');
    // var index = tr.getAttribute('index');

    // var imgTag1 = td[1].getElementsByTagName('IMG');
    // var imageUrl1 = imgTag1[0].src;
    // var author1 = td[2].innerHTML;
    // var title1 = td[3].innerHTML;
    // var body1 = td[4].innerHTML;
    addBlogBtn.click();

    saveBlogBtn.disabled = true;
    updateBtn.disabled = false;

    // author.value = author1;
    // title.value = title1;
    // body.value = body1;
    // imageUrl.src = imageUrl1;

    // updateBtn.onclick = function () {
    //   blogsData[index] = {
    //     imageUrl: uploadImage.value == '' ? blogImage.src : imgUrl,
    //     title: title.value,
    //     author: author.value,
    //     body: body.value,
    //   };
    // form.reset('');
    // validateInputs();
    // closeModalBtn.click();
    // location.reload();
  };
}

// ?...................................................................Create Blogs...................................................start.......
// Save Blog Button Functionality
saveBlogBtn.onclick = function (e) {
  e.preventDefault();
  registrationData(title, author, body);
  //   getDataFromLocal();
  form.reset('');
  //   closeModalBtn.click();
};

const registrationData = async (title, author, body, imageUrl) => {
  var title = document.getElementById('titleInput').value;
  var author = document.getElementById('authorInput').value;
  var body = document.getElementById('bodyTextarea').value;
  var imageUrl = imgUrl;
  try {
    // const response = await fetch(
    //   'https://repulsive-frog-jacket.cyclic.app/api/blogs/newBlog',
    //   {
    const response = await fetch('http://127.0.0.1:7000/api/blogs/newBlog', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Authorization: `JWT ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ title, author, body, imageUrl }),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      location.reload();
    } else {
      alert('Error creating blog');
    }
  } catch (error) {
    console.log('Error creating blog:', error.message);
  }
};

uploadImage.onchange = function () {
  if (uploadImage.files[0].size < 5000000) {
    //5000000 ~ 5mb (or 5000000bytes)
    var fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      blogImage.src = imgUrl;
      // console.log(imgUrl);
    };
    fReader.readAsDataURL(uploadImage.files[0]);
  } else {
    alert('The File size is too big');
  }
};

//     //Edit || Update your standby blog

//     var allEdit = document.querySelectorAll('.edit-btn');
//     for(var i = 0; i < allEdit.length; i++){
//         allEdit[i].onclick = function(){
//             var tr = this.parentElement.parentElement;
//             var td = tr.getElementsByTagName("TD");
//             var index = tr.getAttribute("index");

//             var imgTag1 = td[1].getElementsByTagName("IMG");
//             var blogImage1 = imgTag1[0].src;
//             var author1 = td[2].innerHTML;
//             var title1 = td[3].innerHTML;
//             var body1 = td[4].innerHTML;
//             addBlogBtn.click();

//             saveBlogBtn.disabled = true;
//             updateBtn.disabled = false;

//             author.value = author1;
//             title.value = title1;
//             body.value = body1;
//             blogImage.src = blogImage1;

//             updateBtn.onclick = function(){
//                 blogsData[index] = {
//                     blogImage: uploadImage.value == "" ? blogImage.src : imgUrl,
//                     title: title.value,
//                     author: author.value,
//                     body: body.value
//                 }
//                 localStorage.setItem("blogsData", JSON.stringify(blogsData));
//                 // form.reset('');
//                 // validateInputs();
//                 closeModalBtn.click();
//                 location.reload();
//             }
//         }
//     }

// }
// getDataFromLocal();

// //Image Accessing and Processing

//............................................................Form Validation Add-Blog Form..............................................................
var blogsData = [];
var saveBlogBtn = document.querySelector('#add-blog-form-save-button');
var form = document.getElementById('add-blog-form');
var blogId = document.getElementById('blogId');
var title = document.getElementById('titleInput');
var author = document.getElementById('authorInput');
var body = document.getElementById('bodyTextarea');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateInputs() == true) {
    // const imageUrl = blogImage.src;
    const author = form.author.value;
    const title = form.title.value;
    const body = form.body.value;
    const imageUrl = imgUrl;
    console.log(imageUrl, author, title, body);
    // createArticle(cover, title, content);
    // clearForm();
    // window.location.href = 'index.html';
  }

  //   validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const validateInputs = () => {
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const bodyValue = body.value.trim();

  if (authorValue == '') {
    setError(author, 'Author name is required');
  } else {
    setSuccess(author);
  }

  if (titleValue == '') {
    setError(title, 'Title is required');
  } else {
    setSuccess(title);
  }

  if (bodyValue == '') {
    setError(body, 'The Body is required');
  } else {
    setSuccess(body);
  }

  if (authorValue && titleValue && bodyValue) {
    return true;
  } else {
    return false;
  }
};
