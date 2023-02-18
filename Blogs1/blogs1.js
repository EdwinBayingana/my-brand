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
        resetForm()
        // Add feedback to list
        addFeedback(newFeedback)
    }

    validateInputs();
    e.preventDefault();
}



function resetForm(){
    commenterUsername.value = ''
    comment.value = ''
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
    // Add html
    div.innerHTML = 
    `
    <div class="pic center__display"> ${letter}
    </div>
    <div class="comment__info">
        <small class="nickname">
        ${item.userName}
        </small>
        <p class="comment">
        ${item.userComment}
        </p>
        <div class="comment__bottom">
    </div>
    `
    // insert feedback into the list
    commentsCount.insertAdjacentElement('beforeend', div);
}

