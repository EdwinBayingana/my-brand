// import { api } from '../api.js';
// console.log(api);
//.................................................................FORM VALIDATION on the SignUp page....................................
const form = document.querySelector('#form-2');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// OtherR-way
form.addEventListener('submit', async (event) => {
  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const password2 = document.querySelector('#password2').value;
  event.preventDefault();

  // fetch(`${api}/api/register`, {
  // fetch('https://repulsive-frog-jacket.cyclic.app/api/register', {
  fetch('http://127.0.0.1:7000/api/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password,
      confirmPassword: password2,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((resp) => {
      console.log(resp);
      // console.log("Signup complete");
      if (resp.data) {
        // console.log('Signup complete');
        // location.href = '../Login/login.html';
        // location.href =
        //   'https://majestic-melomakarona-d7b4f4.netlify.app/api/register';
      } else {
        alert(resp.message);
      }
      return resp;
    });
});

//Show Password Function
function showPassword() {
  var show = document.getElementById('password');
  var show2 = document.getElementById('password2');

  if (show.type == 'password') {
    show.type = 'text';
  } else {
    show.type = 'password';
  }

  if (show2.type == 'password') {
    show2.type = 'text';
  } else {
    show2.type = 'password';
  }
}
//Form Validation

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;
  // console.log(username, email, password);
  // validateInputs() && addOfData(username, email, password);
  validateInputs();
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

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === '') {
    setError(username, 'Username is required');
  } else {
    setSuccess(username);
  }

  if (emailValue === '') {
    setError(email, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address');
  } else {
    setSuccess(email);
  }

  if (passwordValue === '') {
    setError(password, 'Password is required');
  } else if (passwordValue.length < 8) {
    setError(password, 'Password must be at least 8 character.');
  } else {
    setSuccess(password);
  }

  if (password2Value === '') {
    setError(password2, 'Please confirm your password');
  } else if (password2Value != passwordValue) {
    setError(password2, "Passwords don't match");
  } else {
    setSuccess(password2);
    // alert('User registered successfully!');
    location.href =
      'file:///Users/zeds/Documents/Coding/ANDELA/Core%20Concepts/my-brand-integrated/my-brand/Login/login.html';
    //location.href = '../Login/login.html'; //!Worked at 8:20pm
    // location.href =
    //   'https://majestic-melomakarona-d7b4f4.netlify.app/login/login';
  }

  if (usernameValue && emailValue && passwordValue && password2Value) {
    return true;
    // location.href =
    //   'file:///Users/zeds/Documents/Coding/ANDELA/Core%20Concepts/my-brand-integrated/my-brand/Login/login.html';
  } else {
    return false;
  }
};
