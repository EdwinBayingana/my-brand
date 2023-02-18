const blogSection = document.querySelector(".blogs-top-section");
const blogsDetails = JSON.parse(localStorage.getItem("blogsData")) || [];
console.log(blogsDetails);

blogsDetails.forEach((item, index) => {
    blogSection.insertAdjacentHTML('afterbegin',`
    <div class="blogs-1" data-id=${item.id}>
        <img src="${item.blogImage}" class="blogs-pic1"></img>
        <div class="author1-name">
            ${item.author}
            <a href="./Blogs1/blogs1.html">
                <div class="author1-blog-preview">${item.body}</div>
            </a>
            <div id="below-blog-preview-text">
                <div id="read-more">Read more...</div>
                <div id="like-emoji">👍</div>
                <p id="likes-count-blogs-1">0</p>
                <div id="comments-emoji">💬</div>
                <p id="comments-count-blogs-1">0</p>
            </div>
        </div>
    </div>
    `)
});
