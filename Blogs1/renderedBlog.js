const blogSection = document.querySelector(".blogs1-left-section");
const blogsDetails = JSON.parse(localStorage.getItem("blogsData")) || [];
// console.log(blogsDetails);

blogsDetails.forEach((item, index) => {
    blogSection.insertAdjacentHTML('afterbegin',`
            <div>
                <p class="blogs1-title">Blogs</p>
            </div>
            <div class="blogs1-image-and-name">
                <img src="${item.blogImage}" class="blogs1-image"></img>
                <div class="blogs1-name">${item.author}</div>
            </div>
            <div class="blogs1-article-title">${item.title}</div>
            <div class="blogs1-article">
                <p>${item.body}</p>
            </div>              
        `)
});
