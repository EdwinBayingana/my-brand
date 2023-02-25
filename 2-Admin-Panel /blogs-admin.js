//....................................................CRUD operations................................................................................

//............Global Variation.............
var form = document.querySelector('#add-blog-form');
var allInput = document.querySelectorAll("input");
var allTextarea = document.querySelectorAll("textarea");
var blogsData = [];
var blogImage = document.querySelector("#blog-image");
var uploadImage = document.querySelector("#upload-field");
var saveBlogBtn = document.querySelector('#add-blog-form-save-button');
var updateBtn = document.querySelector('#update-btn');
var title = document.getElementById('titleInput');
var author = document.getElementById('authorInput');
var body = document.getElementById('bodyTextarea');
var imgUrl;

var addBlogBtn = document.querySelector('#the-add-blog-button');
var modal = document.querySelector('.modal');

//Close Modal functionality 
var closeModalBtn = document.querySelector('.close-icon');
addBlogBtn.onclick = function(){
    modal.classList.add('active');
}
closeModalBtn.onclick = function(){
    modal.classList.remove('active');
    for(var i=0; i<allInput.length;i++){ //To clear everytime 
        allInput[i].value = "";
    }
    for(var i=0; i<allTextarea.length;i++){
        allTextarea[i].value = "";
    }
}

// Save Blog Button Functionality
saveBlogBtn.onclick = function(e){
    e.preventDefault();
    registrationData();
    getDataFromLocal();
    form.reset('');
    closeModalBtn.click();
}


// Storing Blogs in the localStorage
if (localStorage.getItem("blogsData") != null) {
    blogsData = JSON.parse(localStorage.getItem("blogsData"));
}

function registrationData(){
    blogsData.push({
        id: Math.random(),                                                         //Latest update
        blogImage: imgUrl == undefined ? "images/logo for add-blog-image.jpeg" : imgUrl,
        title: title.value,
        author: author.value,
        body: body.value,
        comment: []
    });
    console.log(blogsData);
    var blogsString = JSON.stringify(blogsData);
    localStorage.setItem("blogsData", blogsString);
}



// Pushing data from the localStorage to the t-body
var tableData = document.querySelector('#table-data')
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    blogsData.forEach((data,index)=>{
        // console.log(index)
        tableData.innerHTML += `
            <tr index='${index}'>    
                <td>${index+1}</td>
                <td><img src="${data.blogImage}" width="50" height="50"></td>
                <td>${data.author}</td>
                <td>${data.title}</td>
                <td>${data.body}</td>
                <td>
                    <button class="edit-button-blogs edit-btn">Edit</button>
                    <button class="delete-button-blogs del-btn">Delete</button> 
                </td>
            </tr>
        `;
    })


    //Deleting blogs from the t-body
    var deleteButtons = document.querySelectorAll(".del-btn");
        for(var i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].onclick = function(){
                var tr = this.parentElement.parentElement;
                var id = tr.getAttribute("index");
                blogsData.splice(id,1);
                localStorage.setItem("blogsData", JSON.stringify(blogsData));
                var ans = confirm("Are you sure you want to delete this blog?");
                if (ans == true) {
                    tr.remove();  
                }
            }
        }

    
    //Edit || Update your standby blog

    var allEdit = document.querySelectorAll('.edit-btn');
    for(var i = 0; i < allEdit.length; i++){
        allEdit[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD");
            var index = tr.getAttribute("index");

            var imgTag1 = td[1].getElementsByTagName("IMG");
            var blogImage1 = imgTag1[0].src;
            var author1 = td[2].innerHTML;
            var title1 = td[3].innerHTML;
            var body1 = td[4].innerHTML;
            addBlogBtn.click();
            
            saveBlogBtn.disabled = true;
            updateBtn.disabled = false;

            author.value = author1;
            title.value = title1;
            body.value = body1;
            blogImage.src = blogImage1;

            updateBtn.onclick = function(){
                blogsData[index] = {
                    blogImage: uploadImage.value == "" ? blogImage.src : imgUrl,
                    title: title.value,
                    author: author.value,
                    body: body.value
                }
                localStorage.setItem("blogsData", JSON.stringify(blogsData));
                // form.reset('');
                // validateInputs();
                closeModalBtn.click();
                location.reload();      
            }
        }
    }
        
}
getDataFromLocal();


//Image Accessing and Processing

uploadImage.onchange = function(){
    if (uploadImage.files[0].size < 5000000) { //5000000 ~ 5mb (or 5000000bytes)
        var fReader = new FileReader();
        fReader.onload = function(e){
            imgUrl = e.target.result;
            blogImage.src = imgUrl;
            // console.log(imgUrl);
        }
        fReader.readAsDataURL(uploadImage.files[0]);
    } else {
        alert("The File size is too big");
    }
}


//............................................................Form Validation Add-Blog Form..............................................................
// var blogsData = [];
// var saveBlogBtn = document.querySelector('#add-blog-form-save-button');
// var form = document.getElementById('add-blog-form');
// var blogId = document.getElementById('blogId');
// var title = document.getElementById('titleInput');
// var author = document.getElementById('authorInput');
// var body = document.getElementById('bodyTextarea');

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
    const titleValue = title.value.trim();
    const authorValue = author.value.trim();
    const bodyValue = body.value.trim();


    if(authorValue == '') {
        setError(author, 'Author name is required');
    } else {
        setSuccess(author);
    }

    if(titleValue == '') {
        setError(title, 'Title is required');
    } else {
        setSuccess(title);
    }

    if(bodyValue == '') {
        setError(body, 'The Body is required');
    } else {
        setSuccess(body);
    }

    if(authorValue && titleValue && bodyValue){
        return true;
    } else {
        return false;
    }
};
