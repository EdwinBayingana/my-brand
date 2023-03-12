// const usersTable = document.getElementById('.users-table');
const usersTable = document.getElementById('.t-body');

// //? Now we connect and interact with our getUsers endpoint

// // fetch('https://repulsive-frog-jacket.cyclic.app/api/users');
fetch('http://127.0.0.1:7000/api/users')
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    const theTBody = document.querySelector('.t-body');

    res.data.forEach((user, index) => {
      // console.log(user);
      // Render the table
      const row = document.createElement('tr');
      row.innerHTML = `

  <td class="indexCell">
    ${index + 1}
  </td>


<td class="usernameCell">
${user.username}
</td>

<td class="role">
${user.isAdmin}
</td>

<button class="editButton" style= "margin-top:25px"onclick="updateUser('${
        user._id
      }', ${user.isAdmin})">Edit</button>
<button class="deleteButton" onclick="deleteUser('${user._id}')">Delete</button>

`;

      theTBody.appendChild(row);
    });
  })
  .catch((err) => alert(err));

function updateUser(id, isAdmin) {
  const role = isAdmin ? false : true;
  const user = {
    id: id,
    isAdmin: role,
  };
  console.log(user);
  fetch(`http://127.0.0.1:7000/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((err) => {
      alert(err);
    });
}

function deleteUser(id) {
  //*Deleting blogs from the t-body
  var deleteButtons = document.querySelectorAll('.deleteButton');
  console.log(deleteButtons);
  // for (var i = 0; i < deleteButtons.length; i++) {
  //   deleteButtons[i].onclick = function () {
  //     var tr = this.parentElement.parentElement;
  //     var ans = confirm('Are you sure you want to delete this blog?');
  //     if (ans == true) {
  //       tr.remove();
  //     }
  //   };
  // }
  fetch(`http://127.0.0.1:7000/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('authToken')}`,
    },
    // body: JSON.stringify(),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((err) => {
      alert(err);
    });
}
