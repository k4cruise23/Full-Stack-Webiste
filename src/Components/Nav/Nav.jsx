import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {reloadUser} from '../../ducks/reducer'
import * as Icon from 'react-feather'
import './nav.css'

class Nav extends Component{
    
    logout = () => {
        axios.delete('/auth/logout')
    }

    componentDidMount(){
        axios.get('/auth/user').then(res => {
            this.props.reloadUser(res.data)
        })
    }

    render(){
        return(
            <div className="nav-container">
                <div className="nav-bar-container">
                    <div className="nav-items">
                        <div className="header">
                        <h1>Website Name</h1>
                        <div className="links">
                        <Link to='/dashboard' ><Icon.Home color='white' className='icon' size='30' /></Link>
                        <Link to='/new' ><Icon.Plus color='white' className='icon' size='30' /></Link>
                        <Link to='/' ><Icon.Power color='white' className='icon' size='30' /></Link>
                        </div>
                        </div>
                        <div className="profile-name">
                            <p>{this.props.user.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {reloadUser})(Nav)