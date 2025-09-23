// Create a React app with Json-server and use Get , Post , Put , Delete & patch method on Json-server API.
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JsonServer = () => {
  // assign var
  const [data, setData] = useState({
    name: '',
    email: '',
  });

  const [alldata, setAlldata] = useState([]);
  const [id, setId] = useState(null);
  // func -handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const disp = () => {
    axios
      .get('http://localhost:3000/users')
      .then((result) => setAlldata(result.data));
  };
  useEffect(() => {
    disp();
  }, []);
  // save
  const saveData = (e) => {
    e.preventDefault();
    if (id != null) {
      axios.put('http://localhost:3000/users/' + id, data).then(() => disp());
    } else {
      axios.post('http://localhost:3000/users', data).then(() => disp());
    }
    setData({ name: '', email: '' });
    setId(null);
  };
  const delData = (id) => {
    axios.delete('http://localhost:3000/users/' + id).then(() => disp());
  };
  const editData = (id) => {
    setId(id);
    axios
      .patch('http://localhost:3000/users/' + id)

      .then((result) => setData(result.data));
    // .then(() => disp());
  };

  return (
    <div>
      <form action="#" method="post" onSubmit={saveData}>
        <label htmlFor="">Name:</label>
        <input
          type="text"
          name="name"
          id=""
          value={data.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="">Email Id:</label>
        <input
          type="email"
          name="email"
          id=""
          value={data.email}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Save Data</button>
      </form>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {alldata.map((i, index) => {
            return (
              <tr key={i.id}>
                <td>{index}</td>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>
                  <button onClick={() => delData(i.id)}>Delete</button>
                  <button onClick={() => editData(i.id)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JsonServer;
