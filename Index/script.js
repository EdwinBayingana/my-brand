                                                        // FORM VALIDATION on the Contact Me page
const form = document.querySelector('#form-3');
const username = document.querySelector('#form-name');
const email = document.querySelector('#form-email');
const subject = document.querySelector('#form-subject');
const formMessage = document.querySelector('#message-1');

const userFeedback = JSON.parse(localStorage.getItem("userFeedback")) ?? []

let isGenuine = localStorage.getItem("genuineUser", "true");



function addFeedback(e) {
  currentData = {
    username: username.value,
    email: email.value,
    subject: subject.value,
    theFeedback: formMessage.value,
  }
  userFeedback.push(currentData);
  localStorage.setItem('userFeedback', JSON.stringify('userFeedback'));
}

//Form Validation function below

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

    errorDisplay.innerText = '';                                               //..................👈🏽 Seek Inquiry on this line...............
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());                             //..................👈🏽 Seek more Inquiry on this line...............
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = formMessage.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(subjectValue === '') {
        setError(subject, 'Subject is required');
    } else {
        setSuccess(subject);
    }

    if(messageValue === '') {
        setError(formMessage, 'Message is required');
    } else {
        setSuccess(formMessage);
    }

    if (usernameValue && emailValue && subjectValue && messageValue) {
        return true;
        // localStorage.setItem(usernameValue, emailValue, subjectValue, messageValue);
        // location.reload();
      } else{
        return false;
      }
};

