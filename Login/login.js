// const form = document.getElementById('form');
// const email = document.getElementById('email');
// const password = document.getElementById('password');

//!INTEGRATED Login function
const form = document.getElementById('form');

// Add an event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailValue = document.getElementById('email').value;
  const passwordValue = document.getElementById('password').value;
  const data = { email: emailValue, password: passwordValue };

  // use fetch method to interact with your login api endpoint
  //   fetch('http://localhost:7000/api/login', {
  fetch('https://majestic-melomakarona-d7b4f4.netlify.app//api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
      location.href = '../index.html';
      //   if (data.ok) {
      //     // set our token in LS
      //     // localStorage.setItem('authToken', data.token);
      //     location.href = '../2-Admin-Panel/admin.html';
      //   } else {
      //     alert(data.message);
      //   }
    })
    .catch((err) => alert(err));
});

// const form = document.getElementById('form');
// const email = document.getElementById('email');
// const password = document.getElementById('password');

// //Getting existing users from localStorage, otherwise set admin as the default user with id = 0.
// const users = JSON.parse(localStorage.getItem("users")) ?? [{
//     id: 0,
//     username: "BayinganaEdwin",
//     email: "bayinganaedwin@gmail.com",
//     password: "foryoureyes"
// }];

// let isGenuine = localStorage.getItem("isGenuine", "true");

// //Login function
// function login(e){

//     e.preventDefault();
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;

//     const user = users.find(user => user.email === email && user.password === password);
//     localStorage.setItem("genuineUser", JSON.stringify(user));

//     // if (user.id !== 0 && user.email !== "bayinganaedwin@gmail.com" && user.password !== "foryoureyes") {
//     //     location.href = "../index.html";
//     //     localStorage.setItem("signedin", user.email);
//     // } else {
//     //     location.href = "../Admin-Panel/admin.html";
//     // }
// }

//Show Password Function
function showPassword() {
  var show = document.getElementById('password');
  if (show.type == 'password') {
    show.type = 'text';
  } else {
    show.type = 'password';
  }
}

// FORM VALIDATION on the Login page
form.addEventListener('submit', (e) => {
  e.preventDefault();

  //   validateInputs() && login(e);  //!remember to call login(e)
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
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

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
    setError(password, 'Password must be at least 8 characters.');
  } else {
    setSuccess(password);
    // console.log(location.href = "../Admin-Panel/admin.html");
  }

  //   if (
  //     emailValue == 'bayinganaedwin@gmail.com' &&
  //     passwordValue == 'foryoureyes'
  //   ) {
  //     location.href = '../2-Admin-Panel%20/admin.html';
  //   } else {
  //     alert('Sorry, user not found!');
  //   }

  if (emailValue && passwordValue) {
    return true;
    // console.log(location.href = "../Admin-Panel/admin.html");
  } else {
    return false;
  }
};
