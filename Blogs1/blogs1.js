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

// ! LIKES

// const reactionCountTable = document.querySelector('.blogs1-comment-icons');
const reactionCountTable = document.querySelector(
  '.blogs1-emoji-count-section',
);
const getABlog = async () => {
  let ___id = localStorage.getItem('blogId');
  try {
    const response = await fetch(
      `http://127.0.0.1:7000/api/blogs/${___id}`,
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

getABlog().then((res) => {
  // console.log(res.data.likes.length);
  var number = res.data.likes.length;
  var likesCount = document.getElementById('likesCount');
  likesCount.innerHTML = number;

  likeIncrement = () => {
    let ___id = localStorage.getItem('blogId');
    fetch(`http://127.0.0.1:7000/api/like/${___id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('authToken')}`,
      },
    })
      .then((response) => {
        response.json();
      })
      .then((res) => {
        theNewNumber = number + 1;
        likesCount.innerHTML = theNewNumber;
        location.reload();
      });
  };
});

// ! FIRE

// const reactionCountTable = document.querySelector('.blogs1-comment-icons');
const getABlogToFire = async () => {
  let ___id = localStorage.getItem('blogId');
  try {
    const response = await fetch(
      `http://127.0.0.1:7000/api/blogs/${___id}`,
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

getABlogToFire().then((res) => {
  // console.log(res.data.fireReaction.length);
  var number1 = res.data.fireReaction.length;
  var fireCount = document.getElementById('fireCount');
  fireCount.innerHTML = number1;

  fireIncrement = () => {
    let ___id = localStorage.getItem('blogId');
    fetch(`http://127.0.0.1:7000/api/fire-reaction/${___id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Authorization: `JWT ${localStorage.getItem('authToken')}`,
      },
    })
      .then((response) => {
        response.json();
      })
      .then((res) => {
        theNewNumber1 = number1 + 1;
        fireCount.innerHTML = theNewNumber1;
        // location.reload();
      });
  };
});

// ! LOVE

const getABlogToLove = async () => {
  let ___id = localStorage.getItem('blogId');
  try {
    const response = await fetch(
      `http://127.0.0.1:7000/api/blogs/${___id}`,
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

getABlogToLove().then((res) => {
  // console.log(res.data.loveReaction.length);
  var number2 = res.data.loveReaction.length;
  var loveCount = document.getElementById('loveCount');
  loveCount.innerHTML = number2;

  loveIncrement = () => {
    let ___id = localStorage.getItem('blogId');
    fetch(`http://127.0.0.1:7000/api/love-reaction/${___id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Authorization: `JWT ${localStorage.getItem('authToken')}`,
      },
    })
      .then((response) => {
        response.json();
      })
      .then((res) => {
        theNewNumber2 = number2 + 1;
        loveCount.innerHTML = theNewNumber2;
        // location.reload();
      });
  };
});

// ! DISLIKE

const getABlogToDislike = async () => {
  let ___id = localStorage.getItem('blogId');
  try {
    const response = await fetch(
      `http://127.0.0.1:7000/api/blogs/${___id}`,
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

getABlogToDislike().then((res) => {
  // console.log(res.data.loveReaction.length);
  var number3 = res.data.dislikeReaction.length;
  var dislikeCount = document.getElementById('dislikeCount');
  dislikeCount.innerHTML = number3;

  dislikeIncrement = () => {
    let ___id = localStorage.getItem('blogId');
    fetch(`http://127.0.0.1:7000/api/dislike-reaction/${___id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then((response) => {
        response.json();
      })
      .then((res) => {
        theNewNumber3 = number3 + 1;
        dislikeCount.innerHTML = theNewNumber3;
        location.reload();
      });
  };
});

// ! LOL

const getABlogToLOL = async () => {
  let ___id = localStorage.getItem('blogId');
  try {
    const response = await fetch(
      `http://127.0.0.1:7000/api/blogs/${___id}`,
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

getABlogToLOL().then((res) => {
  // console.log(res.data.loveReaction.length);
  var number4 = res.data.thinkingReaction.length;
  var dislikeCount = document.getElementById('LOLCount');
  dislikeCount.innerHTML = number4;

  LOLIncrement = () => {
    let ___id = localStorage.getItem('blogId');
    fetch(`http://127.0.0.1:7000/api/thinking-reaction/${___id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then((response) => {
        response.json();
      })
      .then((res) => {
        theNewNumber4 = number4 + 1;
        dislikeCount.innerHTML = theNewNumber4;
        location.reload();
      });
  };
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
