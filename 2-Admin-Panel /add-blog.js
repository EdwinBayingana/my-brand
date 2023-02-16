var selectedRow = null;

function onFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow == null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    resetForm();
}

// Retrieve the Data
function readFormData(){
    var formData = {};
    formData["bodyId"] = document.getElementById("blogId").value;
    formData["titleInput"] = document.getElementById("titleInput").value;
    formData["authorInput"] = document.getElementById("authorInput").value;
    formData["bodyTextarea"] = document.getElementById("bodyTextarea").value;
    return formData;
}

//Insert the Data
function insertNewRecord(data){
    var table = document.getElementById("blogs-table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.bodyId;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.titleInput;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.authorInput;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;        
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("bodyId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("titleInput").value = selectedRow.cells[1].innerHTML;
    document.getElementById("authorInput").value = selectedRow.cells[2].innerHTML;
    document.getElementById("bodyTextarea").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.bodyId;
    selectedRow.cells[1].innerHTML = formData.titleInput;
    selectedRow.cells[2].innerHTML = formData.authorInput;
    selectedRow.cells[3].innerHTML = formData.bodyTextarea;
}

//Delete the data
function onDelete(td) {
    if (confirm('Are you sure you want to delete this Blog?')) {
        row = td.parentElement.parentElement;
        document.getElementById('blogs-table').deleteRow(row.rowIndex);
        resetForm();
    }
}


//............................................................Form Validation Add-Blog Form..............................................................
const form = document.getElementById('add-blog-form');
const blogId = document.getElementById('blogId');
const title = document.getElementById('titleInput');
const author = document.getElementById('authorInput');
const body = document.getElementById('bodyTextarea');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateInputs = () => {
    const blogValue = blogId.value.trim();
    const titleValue = title.value.trim();
    const authorValue = author.value.trim();
    const bodyValue = body.value.trim();


    if(blogValue == '') {
        setError(blogId, 'The Blog Id is required');
    } else {
        setSuccess(blogId);
    }
    if(authorValue == '') {
        setError(author, 'Author name is required');
    } else {
        setSuccess(author);
    }

    if(titleValue == '') {
        setError(title, 'Title is required');
    } else {
        setSuccess(title);
    }

    if(bodyValue == '') {
        setError(body, 'The Body is required');
    } else {
        setSuccess(body);
    }

    if(blogValue && authorValue && titleValue && bodyValue){
        return true;
    } else {
        return false;
    }
};