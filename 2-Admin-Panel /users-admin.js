// const users = document.querySelector('#t-body');

// const fetchUsers = async () => {
//   try {
//     const response = await fetch('http://127.0.0.1:7000/api/users', {
//       method: 'GET',
//     });
//     const users = response.json();
//     console.log(users);
//   } catch (error) {
//     console.log('Error fetching Users: ', error.message);
//   }
// };

// fetchUsers().then((res) => {
//   console.log(res);
//   res.data.forEach((user, index) => {
//     users.insertAdjacentHTML(
//       `afterbegin`,
//       `
//             <tr>
//             <td>${index}</td>
//             <td>${user.username}</td>
//             <td>${user.email}</td>
//             <td>Delete</td>
//             </tr>
//             `,
//     );
//   });
// });

const usersTable = document.getElementById('.users-table');
// console.log(usersTable);
//? Now we connect and interact with our getUsers endpoint

// fetch('https://repulsive-frog-jacket.cyclic.app/api/users');
fetch('http://127.0.0.1:7000/api/users')
  .then((response) => response.json())
  .then((users) => {
    //! console.log(users);
    // users.data.forEach((user) => {
    //   console.log(user._id);
    // });
    users.data.forEach((user) => {
      //   const theTBody = document.querySelector('t-body');
      console.log(user);
      const row = document.createElement('tr');
      const indexCell = document.createElement('td');
      const usernameCell = document.createElement('td');
      const isAdminCell = document.createElement('td');
      const actionsCell = document.createElement('td');

      const deleteButton = document.createElement('button');

      //   //* Now we assign values to the created cells
      indexCell.textContent = 'Num1';
      usernameCell.textContent = user.username;
      isAdminCell.textContent = user.isAdmin;
      deleteButton.textContent = 'delete';

      row.appendChild(indexCell);
      row.appendChild(usernameCell);
      row.appendChild(isAdminCell);
      row.appendChild(actionsCell);

      //   usersTable.getElementById('.t-body').appendChild(row);
      //   theTBody.appendChild(row);
    });
  })
  .catch((err) => alert(err));
