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
    // console.log(item.comments.length);
    blogSection.insertAdjacentHTML(
      'afterbegin',
      `
                <div class="blogs-1" data-id=${item.id}>
                    <img src="${item.imageUrl}" class="blogs-pic1"></img>
                    <div class="author1-name">
                        ${item.author}
                        <a href="#" id="${res.data[index]._id}" class="read-more-render">
                            <div class="author1-blog-preview card_preview_text">${item.body}</div>
                            <div id="below-blog-preview-text">
                            <div id="read-more">Read more...</div>
                        </a>
                            <div id="like-emoji">👍</div>
                            <p id="likes-count-blogs-1">${res.data[index].likes.length}</p>
                            <div id="comments-emoji">💬</div>
                            <p id="comments-count-blogs-1">${res.data[index].comments.length}</p>
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

      localStorage.setItem('blogId', id); //!...................... Set the id into the url........................................
      // alert('Blog has been clicked on');
      // location.href =
      //   'https://majestic-melomakarona-d7b4f4.netlify.app/blogs1/blogs1';
      location.href = '../Blogs1/blogs1.html';

      console.log('The i is: ' + i);
    });
  }
});
// !..............................................................................................................................................

var readMoreRender = document.querySelectorAll('.read-more-render');
