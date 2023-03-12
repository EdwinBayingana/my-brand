// FORM VALIDATION on the Comments
const form = document.querySelector('#form-4');
const commentInput = document.querySelector('#blog-comment-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

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

const validateInputs = () => {
  const commentValue = comment.value.trim();
  const commenterNameValue = commenterUsername.value.trim();

  if (commentValue === '') {
    setError(commentInput, 'A comment is required');
  } else if (commenterNameValue === '') {
    setError(commentInput, 'A name is required');
  } else {
    setSuccess(commentInput);
  }
  if (commentValue) {
    return true;
    // localStorage.setItem(commentValue);
    // location.reload();
  } else {
    return false;
  }
};

// ?.........................................................................REACTIONS...................................................start......
// const reactionCountTable = document.querySelector('.blogs1-comment-icons');
const reactionCountTable = document.querySelector(
  '.blogs1-emoji-count-section',
);
const fetchBlogs = async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:7000/api/blogs/getAllBlogs',
      // 'https://repulsive-frog-jacket.cyclic.app/api/blogs/getAllBlogs',
      {
        method: 'GET',
      },
    );
    const blogs = response.json();
    return blogs;
  } catch (error) {
    console.log('Error fetching blogs: ', error.message);
  }
};

fetchBlogs().then((res) => {
  // console.log(res.data);
  // res.data.forEach((item, index) => {
  //   console.log(item.likes);
  //   reactionCountTable.insertAdjacentHTML(
  //     'afterbegin',
  //     `
  //             <div id="likes-count">30</div>
  //             <div id="fire-count">14</div>
  //             <div id="heart-count">18</div>
  //             <div id="dislike-count">4</div>
  //             <div id="laugh-count">7</div>
  //   `,
  //   );
  // });
});
// ?.............................................REACTIONS..................................................................................end......

//..................................................................Comment Functionality..................................................................

// const userName = document.querySelector('#user')
const submitBtn = document.querySelector('.submit-btn');
const commenterUsername = document.querySelector('#blog-username-input');
const comment = document.querySelector('#blog-comment-input');
const count = document.querySelector('.count');
const commentsCount = document.querySelector('.comments__container');

// submitBtn.addEventListener('click', submitFeedback);

let __id = localStorage.getItem('blogId');

function renderComments(arr) {
  arr.forEach((comment, index) => {});
}
function submitFeedback(e) {
  // validateInputs();
  // e.preventDefault();
  form.addEventListener('submit', async (event) => {
    fetch(`http://127.0.0.1:7000/api/comment/${__id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userName: commenterUsername.value,
        comment: comment.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        console.log('Comment added successfully');
        // console.log(resp.data.comments);
        let comments = resp.data.comments;
        console.log(comments);
        for (let i = 0; i < comments.length; i++) {
          // comment card CSS
          let div = document.createElement('div');
          div.classList = 'comment__card';

          // console.log(comments[i]);
          // console.log(comments[i].name);
          // console.log(comments[i].comment);
          // let div = document.createElement('div')
          // let theCommenterName = comments[i].userName;
          // let firstLetter = theCommenterName.split('', 1); //!......................................................................
          // let firstLetter = theCommenterName.charAt(0);
          // console.log(firstLetter);
          div.innerHTML = `
                  <div class="pic center__display">${i + 1}</div>
                  <div class="comment__info">
                      <small class="nickname">
                      ${comments[i].name}
                      </small>
                      <p class="comment">
                      ${comments[i].comment}
                      </p>
                      <div class="comment__bottom">
                  </div>
              `;
          commentsCount.insertAdjacentElement('beforeend', div);
        }
      });
  });
}

submitBtn.addEventListener('click', submitFeedback);
// submitBtn.addEventListener('onload', submitFeedback);
