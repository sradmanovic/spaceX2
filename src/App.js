import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LaunchList from './components/LaunchList'
import LaunchDetails from './components/LaunchDetails'
import Navbar from './components/Navbar'
import ThemeContextProvider from './context/ThemeContext';

function App() {

  return (
    <ThemeContextProvider>
      <Router>
        <div className="App">

          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <LaunchList />
              </Route>
              <Route exact path="/:id">
                <LaunchDetails />
              </Route>

            </Switch>

          </div>
        </div>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
