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
const comment = document.querySelector('#blog-comment-input')
const likeIcon = document.querySelector('.heart__icon')
const count = document.querySelector('.count')
const commentsCont = document.querySelector('.comments__container')

likeIcon.addEventListener('click', likeAComment)


function likeAComment(){
    likeIcon.classList.toggle('liked')

    if(likeIcon.classList.contains('liked')){
        likeIcon.innerHTML = `<i class="fas fa-heart"></i>`
        // set feedback to liked
        positiveFeedback = true
    } else {
        likeIcon.innerHTML = `<i class="far fa-heart"></i>`
        // set feedback to not liked
        positiveFeedback = false
    }
}