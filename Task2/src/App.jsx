// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

// function App() {
//   const [count, setCount] = useState(0);

//   return <></>;
// }

// export default App;

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import SignUp from './SignUp';
import Login from './Login';
import ItemsCrud from './ItemsCrud';

function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        {user ? (
          <>
            <Link to="/items">Items</Link>
            {' | '}
            <button onClick={() => signOut(auth)}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            {' | '}
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h2>Welcome {user?.email}</h2>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/items"
          element={
            <PrivateRoute user={user}>
              <ItemsCrud user={user} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
