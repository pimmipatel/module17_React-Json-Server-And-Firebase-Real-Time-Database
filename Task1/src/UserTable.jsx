// • Create a React component that fetches data from a public API (e.g., a list of users)and displays it in a table format.

import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((rs) => setData(rs));
  }, []);

  return (
    <div>
      <h1>User List in Table format</h1>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
