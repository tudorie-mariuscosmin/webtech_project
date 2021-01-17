import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Activity extends React.Component {
    constructor(props){
        super(props)
        this.state={
            token:this.props.match.params.token
        }
        this.getActivity = ()=>{
            axios.get( `/api/activity/${this.props.match.params.token}`)
                .then(res=>{
                    console.log(res.data)
                })
        }
    }

    
    render() {
        this.getActivity()
        return (
            <div>
                `token: {this.props.match.params.token}`
            </div>
        )
    }
}

export default withRouter(Activity)
