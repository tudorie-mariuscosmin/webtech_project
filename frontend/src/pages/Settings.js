import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'

class Settings extends Component {
    render() {
        return (
            <div>
                <NavBar />
                settings
            </div>
        )
    }
}
export default withRouter(Settings)
