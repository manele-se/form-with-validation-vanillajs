//identify DOM elements
//and grab it. you can use queryseclector too

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

/*
*
* functions
*/
function showError(input, message) {
  //get the parent. We want to add an error class to form-control
  //Think about what you want to grab!!
  const formControl = input.parentElement;
  //grab the class and add a new one
  formControl.className = 'form-control error';
  //create your own message. First grab the element you want to change.
  const small = formControl.querySelector('small');
  //set the message to the html element
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  //grab the form control and add a success class that we have styled in css
  formControl.className = 'form-control success';
}

//check required field.
function checkRequired(inputArr) {
  //high order array method
  inputArr.forEach(function(input) {
    //remove white spaces
    if (input.value.trim() === '') {
      //grab the input id
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be maximum ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function getFieldName(input) {
  //capitalize the firt letter and concatenate the rest without the first letter.
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check the email
function checkEmail(input) {
  //regex
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkPassowrdMatch(p1, p2) {
  if (p1.value !== p2.value) {
    showError(p2, 'Password do not match');
  }
}

//listen for submit and run a function
form.addEventListener('submit', e => {
  e.preventDefault();
  //check input requirement
  checkRequired([ username, email, password, password2 ]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPassowrdMatch(password, password2);
});
