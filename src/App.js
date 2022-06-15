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



function App() {
  return (
    <ListState >
    <Router>
      <NavBar />
      <Routes>
        <Route exact path = '/' element={<Home/>}/>
        <Route exact path = '/user-profile' element={<UserProfile/>}/>
        <Route exact path = '/create-new-task' element={<AddList/>}/>
      </Routes>
    </Router>
    </ListState>
  );
}

export default App;
