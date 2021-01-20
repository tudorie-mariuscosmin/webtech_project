import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

class AllUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('/api/user')
            .then(res => {
                this.setState({ users: res.data })
            })
    }
    render() {
        return (
            <div>
                <NavBar />
                <DataTable value={this.state.users}>
                    <Column field="firstName" header="First Name"></Column>
                    <Column field="lastName" header="Last Name"></Column>
                    <Column field="email" header="Email"></Column>
                </DataTable>
            </div>
        )
    }
}
export default withRouter(AllUsers)
