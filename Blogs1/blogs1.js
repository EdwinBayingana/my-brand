                                                        // FORM VALIDATION on the Login page
const form = document.querySelector('#form-4');
const comment = document.querySelector('#blog-comment-input')

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
        setError(comment, 'A comment is required');
    } else {
        setSuccess(comment);
    }
    if (commentValue) {
        return true;
        // localStorage.setItem(commentValue);
        // location.reload();
      } else{
        return false;
      }
};
