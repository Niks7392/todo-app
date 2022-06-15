import './App.css';
import { NavBar } from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { Home } from './components/Home';
import { UserProfile } from './components/UserProfile';
import { ListState } from './context/ListState';
import { AddList } from './components/AddList';
import { Alert } from './components/Alert';



function App() {
  return (
    <ListState >
    <Router>
      <NavBar />
      <Alert/>
      <Routes>
        <Route exact path = '/' element={<Home Title='To-Do App ~Niks7392'/>}/>
        <Route exact path = '/user-profile' element={<UserProfile Title='Account Details'/>}/>
        <Route exact path = '/create-new-task' element={<AddList Title='Create a To-Do List'/>}/>
      </Routes>
    </Router>
    </ListState>
  );
}

export default App;
