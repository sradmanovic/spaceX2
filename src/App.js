import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LaunchList from './components/LaunchList'
import LaunchDetails from './components/LaunchDetails'
import Navbar from './components/Navbar'
import ThemeContextProvider from './context/ThemeContext';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'
import ProfilePage from './components/ProfilePage';

function App() {

  return (

    <ThemeContextProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <AuthProvider>
              <Switch>
                <Route exact path="/" component={LaunchList} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute exact path="/:id" component={LaunchDetails} />
              </Switch>
            </AuthProvider>
          </div>
        </div>
      </Router>
    </ThemeContextProvider>

  );
}

export default App;
