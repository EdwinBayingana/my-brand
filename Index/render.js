const blogSection = document.querySelector('.blogs-top-section');
var i = 0;

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
  console.log(res.data);
  res.data.forEach((item, index) => {
    blogSection.insertAdjacentHTML(
      'afterbegin',
      `
                <div class="blogs-1" data-id=${item.id}>
                    <img src="${item.imageUrl}" class="blogs-pic1"></img>
                    <div class="author1-name">
                        ${item.author}
                        <a href="" id="${res.data[index]._id}" class="read-more-render">
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
  //./Blogs1/blogs1.html
  let readMoreRender = document.querySelectorAll('.read-more-render');
  for (let i = 0; i < readMoreRender.length; i++) {
    readMoreRender[i].addEventListener('click', () => {
      // readMoreRender[i]
      var id = readMoreRender[i].getAttribute('id');
      // console.log('The id is: ' + id);
      localStorage.setItem('blogId', res.data[i]._id);
      // location.href =
      //   'https://majestic-melomakarona-d7b4f4.netlify.app/blogs1/blogs1';
      // location.href =
      //   'file:///Users/zeds/Documents/Coding/ANDELA/Core%20Concepts/my-brand-integrated/my-brand/Blogs1/blogs1.html';
      // console.log(id);

      // alert("Yessir!");
      console.log('The i is: ' + i);
    });
  }
});
// !..............................................................................................................................................

var readMoreRender = document.querySelectorAll('.read-more-render');
// console.log(readMoreRender.length / 2);
// console.log(blogsDetails);

// for (let i = 0; i < readMoreRender.length; i++) {
//   readMoreRender[i].addEventListener('click', () => {
//     // readMoreRender[i]
//     var id = readMoreRender[i].getAttribute('id');
//     // console.log('The id is: ' + id);
//     localStorage.setItem('blogId', id);

//     // alert("Yessir!");
//     console.log('The i is: ' + i);
//   });
// }
