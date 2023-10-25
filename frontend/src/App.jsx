import './App.css';
import {useEffect, useState} from "react";


function App() {

  const [message, setMessage] = useState('');

  useEffect( () => {
    fetch("http://localhost:3123")
    .then(res => res.json())
    .then(data => setMessage(data))
    .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <p>Hello from frontend</p>
      <p>{message.message}</p>
    </div>
  );
}

export default App;
