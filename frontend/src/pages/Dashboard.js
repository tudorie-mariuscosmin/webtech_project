import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import { withRouter } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activities: [],
            expandedRows: null
        }

        this.deleteActivity = (id) => {
            axios.delete(`/api/activity/${id}`)
                .then(res => {
                    this.toast.show({ severity: 'success', summary: `${res.data.message}`, life: 3000 });
                    this.getActivities()
                })
                .catch(err => {
                    console.error(err.response.data)
                    this.toast.show({ severity: 'error', summary: `${err.response.data.message}`, life: 3000 });
                })
        }
        this.getActivities = () => {
            axios.get('/api/activity')
                .then(res => {
                    console.log(res.data)
                    let data = res.data.map(x => {
                        return {
                            ...x,
                            isOpen: (!x.isOpen).toString()
                        }
                    })
                    this.setState({ activities: data })
                })
        }
        this.activityFeedback = (id) => {
            this.props.history.push(`/activityFeedback/${id}`)
        }
        this.editActivity = (id) => {
            this.props.history.push(`/add/${id}`)
        }

    }

    componentDidMount() {
        this.getActivities()
    }

    render() {
        const template = (rowData) => {
            return (
                <div>
                    <span>
                        <Button className="p-button-rounded p-button-outlined p-button-danger p-mx-1" icon="pi pi-trash" onClick={() => this.deleteActivity(rowData.id)} />
                    </span>
                    <span>
                        <Button className="p-button-rounded p-button-outlined p-button-help p-mx-1" icon="pi pi-pencil" onClick={() => { this.editActivity(rowData.id) }} />
                    </span>
                    <span>
                        <Button className="p-button-rounded p-button-outlined p-mx-1" icon="pi pi-search-plus" onClick={() => { this.activityFeedback(rowData.id) }} />
                    </span>
                </div>
            )
        }

        const rowExpansionTemplate = (data) => {
            return (
                <div>
                    <DataTable value={[data]}>
                        <Column field="description" header="Description"></Column>
                        <Column field="token" header="Token"></Column>
                        <Column field="createdAt" header="Created At"></Column>
                        <Column field="endAt" header="Finish At"></Column>
                    </DataTable>
                </div>
            );
        }
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <NavBar />
                <DataTable value={this.state.activities} expandedRows={this.state.expandedRows} onRowToggle={(e) => { this.setState({ expandedRows: e.data }) }}
                    rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
                    <Column expander style={{ width: '3em' }} />
                    <Column field="name" header="Name"></Column>
                    <Column field="subject" header="Subject"></Column>
                    <Column field="isOpen" header="Finished"></Column>
                    <Column body={template}></Column>
                </DataTable>


            </div>
        )
    }
}
export default withRouter(Dashboard)