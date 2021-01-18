import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import io from "socket.io-client";
import 'primeflex/primeflex.css';
import '../css/activity.css'

class Activity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.match.params.token,
            activity: null
        }
        this.socket = io()
        this.getActivity = () => {
            axios.get(`/api/activity/${this.props.match.params.token}`)
                .then(res => {
                    this.setState({ activity: res.data })
                })
        }

        this.sendFeedback = (feedbacksent) => {
            this.socket.emit('feedback', { token: this.state.token, feedbacksent, time: new Date().toString() })
        }
    }
    componentDidMount() {
        this.getActivity();
        this.socket.emit('joinActivity', { token: this.state.token })

    }


    render() {
        if (this.state.activity) {
            return (
                <div>
                    <Panel className="info" header={this.state.activity.name} toggleable collapsed>
                        <div>Subject: {this.state.activity.subject}</div>
                        <div>Token: {this.state.activity.token}</div>

                        <Divider align="left">
                            <span className="p-tag">Description</span>
                        </Divider>
                        <div>{this.state.activity.description}</div>

                    </Panel>
                    <div className=" p-grid">
                        <div className="p-col">
                            <div className="feedback p-ripple" onClick={() => { this.sendFeedback("happy") }}>😄<Ripple /></div>
                            <div className="feedback p-ripple" onClick={() => { this.sendFeedback("surprised") }}>😮<Ripple /></div>
                        </div>
                        <div className="p-col">
                            <div className="feedback p-ripple" onClick={() => { this.sendFeedback("confused") }}>😕 <Ripple /></div>
                            <div className="feedback p-ripple" onClick={() => { this.sendFeedback("sad") }}>☹️<Ripple /></div>
                        </div>

                    </div>

                </div >
            )

        } else {
            return (
                <div>Activity not found</div>
            )
        }

    }
}

export default withRouter(Activity)
