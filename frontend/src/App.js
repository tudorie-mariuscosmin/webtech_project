import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Activity from './pages/Activity'
import Dashboard from './pages/Dashboard'
import axios from 'axios'
import Settings from './pages/Settings'
import AllUsers from './pages/AllUsers'
import ActivityForm from './pages/ActivityForm'
import TeacherActivity from './pages/TeacherActivity'

class App extends React.Component {
  isLoggedIn() {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return true
    }
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

                if (this.isLoggedIn()) {
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
                if (this.isLoggedIn()) {
                  return <Dashboard />
                } else {
                  return <Redirect to='/' />
                }
              }
            }
          </Route>
          <Route path='/settings' exact>
            {
              () => {
                if (this.isLoggedIn()) {
                  return <Settings />
                } else {
                  return <Redirect to='/' />
                }
              }
            }
          </Route>
          <Route path='/allUsers' exact>
            {
              () => {
                if (this.isLoggedIn()) {
                  return <AllUsers />
                } else {
                  return <Redirect to='/' />
                }
              }
            }
          </Route>
          <Route path='/add' exact>
            {
              () => {
                if (this.isLoggedIn()) {
                  return <ActivityForm />
                } else {
                  return <Redirect to='/' />
                }
              }
            }
          </Route>
          <Route path='/add/:id' exact>
            {
              () => {
                if (this.isLoggedIn()) {
                  return <ActivityForm />
                } else {
                  return <Redirect to='/' />
                }
              }
            }
          </Route>
          <Route path='/activityFeedback/:id' exact>
            {
              () => {
                if (this.isLoggedIn()) {
                  return <TeacherActivity />
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
