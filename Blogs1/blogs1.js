                                                        // FORM VALIDATION on the Comments
const form = document.querySelector('#form-4');
const commentInput = document.querySelector('#blog-comment-input')

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
    const commentValue = comment.value.trim();

    if(commentValue === '') {
        setError(commentInput, 'A comment is required');
    } else {
        setSuccess(commentInput);
    }
    if (commentValue) {
        return true;
        // localStorage.setItem(commentValue);
        // location.reload();
      } else{
        return false;
      }
};


//..................................................................Comment Functionality..................................................................

// const userName = document.querySelector('#user')
const submitBtn = document.querySelector('.submit-btn')
const commenterUsername = document.querySelector('#blog-username-input')
const comment = document.querySelector('#blog-comment-input')
const count = document.querySelector('.count')
const commentsCount = document.querySelector('.comments__container')
let blogsData = JSON.parse(localStorage.getItem("blogsData"));
let index = JSON.parse(localStorage.getItem("id"));
 
submitBtn.addEventListener('click', submitFeedback)

feedbackArr = []
let likesCount = 0

// Storing comments in the localStorage
if (localStorage.getItem("newFeedback") != null) {
    newFeedback = JSON.parse(localStorage.getItem("newFeedback"));
}

function submitFeedback(e){
    // Get the Username
    const userForm = commenterUsername.value
    // Get user comment or feedback
    const commentForm = comment.value
    // if Inputs are not empty
    if(userForm && commentForm !== ''){
        newFeedback = {
            "id": Math.floor((Math.random() * 1000)+ 1),
            "userName": userForm,
            "userComment": commentForm
        }

        // Add new Feedback to our empty array
        feedbackArr.push(newFeedback)
        // console.log(feedbackArr);

        var commentsString = JSON.stringify(feedbackArr);
        localStorage.setItem("Comment-Data", commentsString);

        // Clear inputs on submit
        // resetForm()
        // Add feedback to list
        addFeedback(newFeedback)
    }

    validateInputs();
    e.preventDefault();
}


function addFeedback(item){
    // Select First letter of the username
    const letter = (item.userName).charAt(0)
    // Create a new div
    const div = document.createElement('div')
    // Add a class
    div.classList = 'comment__card'
    // Add id
    div.id = item.id

    const commentData = {
        username: commenterUsername.value,
        comment: comment.value
    }
    
    blogsData[index].comment.push(commentData);
    localStorage.setItem("blogsData", JSON.stringify(blogsData));

    // insert feedback into the list
    commentsCount.insertAdjacentElement('beforeend', div);

    location.reload();
    // Reset the input fields after submiting
    commenterUsername.value = ''
    comment.value = ''
    
}
 
    let comments = blogsData[index].comment;
    

    for(let i = 0; i < comments.length; i++){

        // comment card CSS
        let div = document.createElement('div')
        div.classList = 'comment__card'

        console.log(comments[i])
        console.log(comments[i].username)
        console.log(comments[i].comment)
        // let div = document.createElement('div')
        // let letter = comments[i].userName.charAt(0)
        div.innerHTML = 
        `
            <div class="pic center__display"></div>
            <div class="comment__info">
                <small class="nickname">
                ${comments[i].username}
                </small>
                <p class="comment">
                ${comments[i].comment}
                </p>
                <div class="comment__bottom">
            </div>
        `
        commentsCount.insertAdjacentElement('beforeend', div);
    }
   



                                                                       // !To get the letter later

//     `
//     <div class="pic center__display"> ${letter}</div>
//     <div class="comment__info">
//         <small class="nickname">
//         ${comments[i].userName}
//         </small>
//         <p class="comment">
//         ${comments[i].userComment}
//         </p>
//         <div class="comment__bottom">
//     </div>
// `





