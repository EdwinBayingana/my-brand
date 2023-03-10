const blogSection = document.querySelector('.blogs1-left-section');

var id = localStorage.getItem('id');

// let paramsId = new URLSearchParams(window.location.search);
// let _id = paramsId.get('id');

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
  console.log(res);
  res.data.forEach((item, index) => {
    blogSection.insertAdjacentHTML(
      'afterbegin',
      `
                  <div class="blogs-1" data-id=${item.id}>
                      <img src="${item.imageUrl}" class="blogs-pic1"></img>
                      <div class="author1-name">
                          ${item.author}
                          <a href="./Blogs1/blogs1.html" id="${item._id}" class="read-more-render">
                              <div class="author1-blog-preview">${item.body}</div>
                              <div id="below-blog-preview-text">
                              <div id="read-more">Read more...</div>
                          </a>
                              <div id="like-emoji">👍</div>
                              <p id="likes-count-blogs-1">0</p>
                              <div id="comments-emoji">💬</div>
                              <p id="comments-count-blogs-1">0</p>
                          </div>
                      </div>
                  </div>
                  `,
    );
  });
});

// const blogSection = document.querySelector(".blogs1-left-section");
// const blogsDetails = JSON.parse(localStorage.getItem("blogsData")) || [];
// // console.log(blogsDetails);
// var id = localStorage.getItem('id');

//     blogSection.insertAdjacentHTML('afterbegin',`
//             <div>
//                 <p class="blogs1-title">Blogs</p>
//             </div>
//             <div class="blogs1-image-and-name">
//                 <img src="${blogsDetails[id].blogImage}" class="blogs1-image"></img>
//                 <div class="blogs1-name">${blogsDetails[id].author}</div>
//             </div>
//             <div class="blogs1-article-title">${blogsDetails[id].title}</div>
//             <div class="blogs1-article">
//                 <p>${blogsDetails[id].body}</p>
//             </div>
//         `);
