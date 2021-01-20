import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast';
import logo from '../assets/img/logo.png';
import axios from 'axios';

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                {
                    label: 'Activities',
                    icon: 'pi pi-fw pi-book',
                    items: [
                        {
                            label: 'See All',
                            icon: 'pi pi-fw pi-search-plus',
                            command: () => {
                                this.props.history.push('/dashboard')
                            }
                        },
                        {
                            label: 'New Activity',
                            icon: 'pi pi-fw pi-plus',

                        }
                    ]
                }, {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog',
                    command: () => {
                        this.props.history.push('/settings')
                    }
                }
            ],
            isAddUserDialogShown: false,
            newUser: {
                firstName: '',
                lastName: '',
                email: ''
            }
        }

        this.logout = () => {
            localStorage.clear();
            delete axios.defaults.headers.common["Authorization"];
            this.props.history.push('/')
        }

        this.hideDialog = () => {
            this.setState({
                isAddUserDialogShown: false
            })
        }
        this.handleChange = (e) => {
            let newUser = this.state.newUser
            newUser[e.target.name] = e.target.value
            this.setState({ newUser })
        }

        this.addUser = () => {
            const newUser = this.state.newUser
            if (!newUser.firstName || !newUser.lastName || !newUser.email)
                this.toast.show({ severity: 'warn', summary: 'Please complete all fields', life: 3000 });
            else if (!newUser.email.match(/\S+@\S+\.\S+/))
                this.toast.show({ severity: 'error', summary: 'Please enter a valid email', life: 3000 })
            else {
                axios.post('/api/user/register', newUser)
                    .then(res => {
                        if (res.status === 201)
                            this.toast.show({ severity: 'success', summary: ` User Created`, life: 3000 })

                        this.setState({ isAddUserDialogShown: false })
                    })
                    .catch(err => {
                        console.error(err.response.data)
                        this.toast.show({ severity: 'error', summary: `${err.response.data.message}`, life: 3000 })
                    })
            }


        }


    }
    getUserType() {
        axios.get('/api/auth/userType')
            .then(res => {
                if (res.data.admin) {
                    let adminItems = this.state.items
                    adminItems.push({
                        label: "Users",
                        icon: "pi pi-fw pi-user",
                        items: [{
                            label: 'Add User',
                            icon: 'pi pi-fw pi-user-plus',
                            command: () => {
                                this.setState({ isAddUserDialogShown: true })
                            }
                        },
                        {
                            label: "All Users",
                            icon: "pi pi-fw pi-users",
                            command: () => {
                                this.props.history.push('/allUsers')
                            }
                        }]
                    })
                    this.setState({ items: adminItems })
                }
            })
            .catch(err => {
                console.error(err.response.data)
            })
    }
    componentDidMount() {
        this.getUserType()
    }
    render() {
        const start = <img alt="logo" src={logo} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;
        const end = <Button label="Log Out" icon='pi pi-sign-in' className="p-button-raised " onClick={() => { this.logout() }} />
        this.addDialogFooter = (
            <div className="p-d-flex p-jc-center">
                <Button label='Add' icon="pi pi-plus-circle" onClick={this.addUser} />
            </div>
        )
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <Menubar
                    model={this.state.items}
                    start={start}
                    end={end}
                />

                <Dialog visible={this.state.isAddUserDialogShown}
                    onHide={this.hideDialog}
                    header='Add a New User'
                    footer={this.addDialogFooter}
                    className='p-fluid'>
                    <span className="p-float-label p-input-icon-left p-m-2">
                        <InputText type="text" id="firstName" name="firstName" value={this.state.newUser.firstName} onChange={this.handleChange} />
                        <i className="pi pi-user" />
                        <label htmlFor="firstName">First Name</label>
                    </span>
                    <span className="p-float-label p-input-icon-left p-m-2">
                        <InputText type="text" id="lastName" name="lastName" value={this.state.newUser.lastName} onChange={this.handleChange} />
                        <i className="pi pi-user" />
                        <label htmlFor="lastName">Last Name</label>
                    </span>
                    <span className="p-float-label p-input-icon-left p-m-2">
                        <InputText type="email" id="email" name="email" value={this.state.newUser.email} onChange={this.handleChange} />
                        <i className="pi pi-envelope" />
                        <label htmlFor="email">Email</label>
                    </span>
                </Dialog>
            </div>
        )
    }
}
export default withRouter(NavBar)