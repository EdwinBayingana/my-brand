const blogSection = document.querySelector(".blogs-top-section");
const blogsDetails = JSON.parse(localStorage.getItem("blogsData")) || [];
console.log(blogsDetails);
var i = 0;

blogsDetails.forEach((item, index) => {
    console.log(index);
    blogSection.insertAdjacentHTML('afterbegin',`
    <div class="blogs-1" data-id=${item.id}>
        <img src="${item.blogImage}" class="blogs-pic1"></img>
        <div class="author1-name">
            ${item.author}
            <a href="./Blogs1/blogs1.html" id="${i}" class="read-more-render">
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
    `)
    i++;
});

var readMoreRender = document.querySelectorAll(".read-more-render");
// console.log(readMoreRender.length / 2);
// console.log(blogsDetails);

for(let i=0; i < readMoreRender.length; i++){
    readMoreRender[i].addEventListener('click', ()=>{
        // readMoreRender[i]
        var id = readMoreRender[i].getAttribute("id");
        console.log("The id is: " + id);
        localStorage.setItem("id", id);

        // alert("Yessir!");
        console.log( "The i is: " + i);
    })
}


