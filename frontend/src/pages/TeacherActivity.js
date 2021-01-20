import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import io from "socket.io-client";

import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import NavBar from '../components/NavBar';


class TeacherActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            activity: null,
            feedbacks: []
        }
        this.socket = io()

        this.getActivity = () => {
            axios.get(`/api/activity/id/${this.state.id}`)
                .then(res => {
                    this.setState({ activity: res.data })
                    this.socket.emit('joinActivity', { token: this.state.activity.token })
                })
                .catch(err => {
                    console.error(err.response.data)
                })
        }
        this.getFeedbacks = () => {
            axios.get(`api/activity/feedback/${this.state.id}`)
                .then(res => {
                    this.setState({ feedbacks: res.data })
                }).catch(err => {
                    console.error(err.response.data)
                })
        }
    }
    componentDidMount() {
        this.getActivity()
        this.getFeedbacks()

        this.socket.on('feedback', ({ feedbacksent, time }) => {
            let feedbacks = this.state.feedbacks
            feedbacks.push({ data: feedbacksent, createdAt: time })
            this.setState({ feedbacks })
        })
    }
    render() {
        if (this.state.activity) {
            return (
                <div>
                    <NavBar />
                    <Panel className="info" header={this.state.activity.name} toggleable collapsed>
                        <div>Subject: {this.state.activity.subject}</div>
                        <div>Token: {this.state.activity.token}</div>

                        <Divider align="left">
                            <span className="p-tag">Description</span>
                        </Divider>
                        <div>{this.state.activity.description}</div>
                    </Panel>

                    <DataTable value={this.state.feedbacks.reverse()} scrollable scrollHeight="80vh" className="p-my-4 form">
                        <Column field="data" header="Feedback"></Column>
                        <Column field="createdAt" header="Time"></Column>
                    </DataTable>
                </div>
            )

        } else {
            return (
                <ProgressSpinner />
            )
        }
    }
}

export default withRouter(TeacherActivity)
