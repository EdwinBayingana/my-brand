// const totalLikesDisplay = document.querySelector('#analytics-container');
// const totalCommentsDisplay = document.querySelector('#analytics-container');
// const totalBlogsDisplay = document.querySelector('#analytics-container');

// ? ............................................................Blogs Count............................................................

const analyticsSection = document.querySelector('.analytics-section');
// const articles = document.querySelector("#t-body");

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

fetchBlogs()
  .then((res) => {
    //   console.log(res.data.length);
    //   res.data.forEach((item, index) => {
    analyticsSection.insertAdjacentHTML(
      'afterbegin',
      `
    <div id="analytics-container">
          <div class="analytics-icons"><p>📝</p></div>
          <div id="analytics-container-text">Blogs</div>
          <div id="analytics-container-numbers" class="analytics-container-commentsNumber">${res.data.length}</div>
        </div>`,
    );
    //   });
  })
  .catch((err) => {
    alert(err);
  });

// ? ............................................................Comments Count............................................................

const fetchComments = async () => {
  try {
    const response = await fetch(
      //   'https://repulsive-frog-jacket.cyclic.app/api/comment/getAllComments',
      'http://127.0.0.1:7000/api/blogs/getAllBlogs',
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        var number = 0;
        res.data.forEach((blog) => {
          console.log(blog);
          number = number + blog.comments.length;
        });
        // alert(number);
        var commentsCount = document.getElementById('commentsCount');
        commentsCount.innerHTML = number;
      });
  } catch (error) {
    console.log('Error fetching blogs: ', error.message);
  }
};
fetchComments();

// ? ............................................................Likes Count............................................................

const fetchLikes = async () => {
  try {
    const response = await fetch(
      //   'https://repulsive-frog-jacket.cyclic.app/api/comment/getAllComments',
      'http://127.0.0.1:7000/api/blogs/getAllBlogs',
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        var nombre = 0;
        res.data.forEach((blog) => {
          console.log(blog);
          nombre = nombre + blog.likes.length;
        });
        // alert(number);
        var likesCount = document.getElementById('likesCount');
        likesCount.innerHTML = nombre;
      });
  } catch (error) {
    console.log('Error fetching blogs: ', error.message);
  }
};
fetchLikes();
