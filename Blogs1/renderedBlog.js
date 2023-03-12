const blogSection = document.querySelector('.blogs1-left-section');

var id = localStorage.getItem('id');

// let paramsId = new URLSearchParams(window.location.search);
// let _id = paramsId.get('id');
let _id = localStorage.getItem('blogId');

const fetchBlog = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:7000/api/blogs/${_id}`);
    const blog = response.json();
    return blog;
  } catch (error) {
    console.log('Error fetching blog: ', error.message);
  }
};

fetchBlog().then((res) => {
  // console.log(res.data);
  // res.forEach((item, index) => {
  blogSection.insertAdjacentHTML(
    'afterbegin',
    `
      <div>
        <p class="blogs1-title">Blogs</p>
      </div>
         <div class="blogs1-image-and-name">
          <img src="${res.data.imageUrl}" class="blogs1-image"></img>
            <div class="blogs1-name">${res.data.author}</div>
         </div>
          <div class="blogs1-article-title">${res.data.title}</div>
          <div class="blogs1-article">
                      <p>${res.data.body}</p>
      </div>
                  `,
  );
});
