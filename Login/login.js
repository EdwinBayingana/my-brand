const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

//Getting existing users from localStorage
const users = JSON.parse(localStorage.getItem("users")) ?? [{
    id: 0,
    username: "BayinganaEdwin",
    email: "bayinganaedwin@gmail.com",
    password: "foryoureyes"
}];

let isGenuine = localStorage.getItem("isGenuine", "true");


//Login function
function login(e){

    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);
    localStorage.setItem("genuineUser", JSON.stringify(user));

    if (user.id != 0 && user.email != "bayinganaedwin@gmail.com" && user.password != "foryoureyes") {
        location.href = "../index.html"
        localStorage.setItem("signedin", user.email);
    } else {
        location.href = "../Admin-Panel/admin.html"   
        // alert("Hello Admin");
    }
}

                                                    // FORM VALIDATION on the Login page
form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs() && login(e);
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

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();


    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 characters.')
    } else {
        setSuccess(password);
        // console.log(location.href = "../Admin-Panel/admin.html");
    }

    if(emailValue && passwordValue){
        return true;
        // console.log(location.href = "../Admin-Panel/admin.html");
    } else{
        return false;
    }
};
