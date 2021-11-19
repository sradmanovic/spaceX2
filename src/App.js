import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LaunchList from './components/LaunchList'
import LaunchDetails from './components/LaunchDetails'
import Navbar from './components/Navbar'
import { useState } from 'react'
import ThemeContext from './context/ThemeContext';

function App() {

  const theme = useState("rgba(10, 10, 10, 0.5)");

  return (
    <ThemeContext.Provider value={theme}>
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
    </ThemeContext.Provider>
  );
}

export default App;
