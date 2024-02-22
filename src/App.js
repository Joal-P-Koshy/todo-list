import { useState } from 'react';
import './App.css';
import Addtodo from './components/Addtodo';
import Listtodo from './components/Listtodo';

function App() {
  const [uploadTodoStatus, setUploadTodoStatus] = useState({})
  return (
    <div className='d-grid justify-content-center align-items-center'>
      <Addtodo setUploadTodoStatus={setUploadTodoStatus}/>
      <Listtodo uploadTodoStatus={uploadTodoStatus}/>
    </div>
  );
}

export default App;
