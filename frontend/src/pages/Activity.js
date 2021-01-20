import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import io from "socket.io-client";
import 'primeflex/primeflex.css';
import '../css/activity.css'

import notFundPhoto from '../assets/img/not-found.png'

class Activity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.match.params.token,
            activity: null,
            message: ''
        }
        this.socket = io()
        this.getActivity = () => {
            axios.get(`/api/activity/${this.props.match.params.token}`)
                .then(res => {
                    this.setState({ activity: res.data })
                })
                .catch(err => {
                    this.setState({ message: err.response.data.message })
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
            const header = (
                <img alt="Card" src={notFundPhoto} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
            );
            const footer = (
                <span className="p-d-flex p-jc-center">
                    <Button label="Back" icon="pi pi-arrow-left" onClick={() => this.props.history.push(`/`)} />
                </span>
            );
            return (
                <div className='p-d-flex  p-jc-center '>
                    <Card title={this.state.message} style={{ width: '50%' }} className="ui-card-shadow " footer={footer} header={header}>
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}></p>
                    </Card>

                </div>
            )
        }

    }
}

export default withRouter(Activity)
