import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { withRouter } from 'react-router-dom'
import axios from 'axios'





class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            email: '',
            password: ''
        }

        this.changeHandler = (evt) => {
            this.setState({ [evt.target.name]: evt.target.value })
        }
        this.loginStudent = () => {
            if (!this.state.token) {
                this.toast.show({ severity: 'warn', summary: 'Please enter a token', life: 3000 });
            } else if (!this.state.token.match(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/)) {
                this.toast.show({ severity: 'error', summary: 'Invalid Token', life: 3000 });
            } else {
                this.props.history.push(`/activity/${this.state.token}`)
            }
        }

        this.loginTeacher = () => {
            if (!this.state.email || !this.state.password) {
                this.toast.show({ severity: 'warn', summary: 'Please complete all fields', life: 3000 });
            } else if (!this.state.email.match(/\S+@\S+\.\S+/)) {
                this.toast.show({ severity: 'error', summary: 'Please enter a valid email', life: 3000 })
            } else {
                axios.post('/api/auth/login', { email: this.state.email, password: this.state.password })
                    .then(res => {
                        console.log(res.data)
                        const token = res.data.token
                        axios.defaults.headers.common['authorization'] = `Bearer ${token}`
                        localStorage.setItem('token', token)
                        this.props.history.push('/dashboard')
                    })
                    .catch(err => {
                        console.log(err)
                        this.toast.show({ severity: 'error', summary: `${err.response.data.message}`, life: 3000 })
                    })
            }
        }
    }


    render() {
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <div>
                    <TabView>
                        <TabPanel header="Student">
                            <div>
                                <div>
                                    <span className="p-float-label">
                                        <InputText id="token" name="token" value={this.state.token} onChange={this.changeHandler} />

                                        <label htmlFor="token">Activity token</label>
                                    </span>
                                </div>
                                <div>
                                    <Button label="Login" onClick={this.loginStudent} />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header="Teacher">
                            <div>
                                <div>
                                    <span className="p-float-label p-input-icon-left">
                                        <InputText id="email" name="email" value={this.state.email} onChange={this.changeHandler} />
                                        <i className="pi pi-envelope" />
                                        <label htmlFor="email">Email</label>
                                    </span>
                                </div>
                                <div>
                                    <span className="p-float-label p-input-icon-left">
                                        <InputText id="password" name="password" value={this.state.password} onChange={this.changeHandler} />
                                        <i className="pi pi-lock" />
                                        <label htmlFor="password">Password</label>
                                    </span>
                                </div>

                                <div>
                                    <Button label="Login" onClick={() => { this.loginTeacher() }} />
                                </div>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)
