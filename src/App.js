import React, {useState} from 'react';

//css
import './App.css';

//components
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';

function App() {
  const [ textValidate, setTextValidate ] = useState('');

  return (
    <div className="App">
      <TaskForm textValidate={textValidate} setTextValidate={setTextValidate}/>
      <TaskList textValidate={textValidate}/>
    </div>
  );
}

export default App;
