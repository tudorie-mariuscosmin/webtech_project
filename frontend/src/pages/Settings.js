import { Button } from 'primereact/button'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import axios from 'axios';

class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }
        this.save = () => {
            if (this.state.email.match(/\S+@\S+\.\S+/)) {
                axios.put('api/user/email', { email: this.state.email })
                    .then(res => {
                        this.toast.show({ severity: 'success', summary: 'Email changed', life: 3000 });
                    }).catch(err => {
                        console.error(err.response.data)
                        this.toast.show({ severity: 'error', summary: 'An error occured', life: 3000 });
                    })
            } else {
                this.toast.show({ severity: 'warn', summary: 'Email unchanged', detail: "Please add an valid email", life: 3000 });
            }

            if (this.state.password.length > 6) {
                axios.put('api/user/password', { password: this.state.password })
                    .then(res => {
                        this.toast.show({ severity: 'success', summary: 'Password changed', life: 3000 });
                    }).catch(err => {
                        console.error(err.response.data)
                        this.toast.show({ severity: 'error', summary: 'An error occured', life: 3000 });
                    })
            } else {
                this.toast.show({ severity: 'warn', summary: 'Password unchanged', detail: "Please add an password larger than 6", life: 3000 });
            }
        }
    }
    render() {
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <NavBar />
                <div>
                    <div className="title">Change Credentials</div>
                    <div className="p-d-flex p-flex-column form p-fluid p-mt-5">
                        <div className="p-float-label p-my-2">
                            <InputText id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                            <label htmlhtmlFor="email">Email</label>
                        </div>

                        <div className="p-float-label  p-my-2">
                            <InputText id="in" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                            <label htmlhtmlFor="in">Password</label>
                        </div>
                        <Button label="Save" onClick={this.save} />


                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Settings)
