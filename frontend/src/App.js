import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Activity from './pages/Activity'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            <Login />
          </Route>
          <Route path='/activity/:token' exact>
            <Activity />
          </Route>
        </Switch>
      </Router>

    )
  }
}

export default App;
