import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { withRouter } from 'react-router-dom'





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
            this.props.history.push(`/activity/${this.state.token}`)
        }
    }


    render() {
        return (
            <div>
                <div>
                    <TabView>
                        <TabPanel header="Student">
                            <div>
                                <div>
                                    <span className="p-float-label">
                                        <InputText id="token" name="token" value={this.state.token} onChange={this.changeHandler} />

                                        <label htmlhtmlFor="token">Activity token</label>
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
                                        <label htmlhtmlFor="email">Email</label>
                                    </span>
                                </div>
                                <div>
                                    <span className="p-float-label p-input-icon-left">
                                        <InputText id="password" name="password" value={this.state.password} onChange={this.changeHandler} />
                                        <i className="pi pi-lock" />
                                        <label htmlhtmlFor="password">Password</label>
                                    </span>
                                </div>

                                <div>
                                    <Button label="Login" />
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
