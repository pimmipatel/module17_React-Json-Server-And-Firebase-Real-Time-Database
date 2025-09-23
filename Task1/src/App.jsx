import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import UserTable from './UserTable';
import JsonServer from './JsonServer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <UserTable /> */}
      <JsonServer />
    </>
  );
}

export default App;
