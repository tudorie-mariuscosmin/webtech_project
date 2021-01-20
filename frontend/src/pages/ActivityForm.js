import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../css/activityform.css'
import NavBar from '../components/NavBar';
import axios from 'axios';

class ActivityForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            subject: '',
            description: '',
            endAt: ''

        }
        this.handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value })
        }

        this.addActivity = () => {
            let isValid = true
            if (!this.state.name || this.state.name.length < 3) {
                this.toast.show({ severity: 'warn', summary: 'Please enter a name larger than 3', life: 3000 });
                isValid = false
            }
            if (!this.state.subject) {
                this.toast.show({ severity: 'warn', summary: 'Please select an subject', life: 3000 });
                isValid = false
            }
            if (!this.state.description || this.state.description.length < 10) {
                this.toast.show({ severity: 'warn', summary: 'Please enter a description larger than 10', life: 3000 });
                isValid = false
            }
            if (!this.state.endAt) {
                this.toast.show({ severity: 'warn', summary: 'Please enter an finish date', life: 3000 });
                isValid = false
            }
            if (isValid) {
                const body = {
                    name: this.state.name,
                    subject: this.state.subject,
                    description: this.state.description,
                    endAt: this.state.endAt.toISOString()
                }
                axios.post('/api/activity/create', body)
                    .then(res => {
                        if (res.status === 201) {
                            this.toast.show({ severity: 'success', summary: "Activity Created", life: 3000 });
                            this.props.history.push('/dashboard')
                        }

                    })
                    .catch(err => {
                        console.error(err.response.data)
                        this.toast.show({ severity: 'error', summary: `${err.response.data.err}`, life: 3000 });
                    })
            }



        }
    }

    render() {
        const citySelectItems = [
            { label: 'Math', value: 'MATH' },
            { label: 'Object Oriented Programming', value: 'POO' },
            { label: 'Databases', value: 'DATABASES' },
            { label: 'Hystory', value: 'HYSTORY' },
            { label: 'Physics', value: 'PHYSICS' },
            { label: 'Geography', value: 'GEOGRAPHY' },
            { label: 'Economy', value: 'ECONOMY' },
            { label: 'Management', value: 'MANAGEMENT' },
            { label: 'English', value: 'ENGLISH' }
        ];
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <NavBar />
                <div className="p-fluid form">
                    <div className="title">Add a new Activity</div>
                    <div className="p-float-label p-my-2">
                        <InputText type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
                        <label htmlFor="namee">Name</label>
                    </div>
                    <div className="p-my-2">
                        <Dropdown value={this.state.subject} id="subject" name="subject" options={citySelectItems} onChange={this.handleChange} placeholder="Select a Subject" />
                    </div>

                    <div className="p-my-2">
                        <label htmlFor="description">Description</label>
                        <InputTextarea value={this.setState.description} id="description" name="description" onChange={this.handleChange} rows={5} cols={30} autoResize />
                    </div>

                    <div className="p-my-2">
                        <label htmlFor="time24">Finish At</label>
                        <Calendar id="time24" value={this.state.endAt} name="endAt" onChange={this.handleChange} showTime showSeconds />
                    </div>

                </div>
                <div className="activity-form-btn p-mt-3" >
                    <Button label="Submit" icon="pi pi-check" onClick={this.addActivity} />

                </div>

            </div >
        )
    }
}
export default withRouter(ActivityForm)