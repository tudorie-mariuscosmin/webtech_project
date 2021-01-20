import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Activity from './pages/Activity'
import Dashboard from './pages/Dashboard'
import axios from 'axios'

class App extends React.Component {
  isLoggedIn() {
    const token = localStorage.getItem('token')
    if (token)
      return true
    else
      return false
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            {
              () => {
                const token = localStorage.getItem('token')
                if (token) {
                  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                  return <Redirect to='/dashboard' />
                } else {
                  return <Login />
                }
              }
            }

          </Route>
          <Route path='/activity/:token' exact>
            <Activity />
          </Route>
          <Route path='/dashboard' exact>
            {
              () => {
                if (this.isLoggedIn) {
                  return <Dashboard />
                } else {
                  return <Redirect to='/' />
                }
              }
            }

          </Route>
        </Switch>
      </Router>

    )
  }
}

export default App;
