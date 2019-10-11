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
                        <div className="header-parent">
                        <h1 className='farmers-markit' >Farmer's Markit 
                        </h1>
                        <div className="down-arrow"><Icon.ArrowDown size='31' color='white' /></div>
                        </div>
                        <div className="links">
                            <div className="link">
                                <Link to='/dashboard' ><Icon.Home color='white' className='icon' size='30' /></Link>
                            </div>
                            <div className="link">
                                <Link to='/new' ><Icon.Plus color='white' className='icon' size='30' /></Link>
                            </div>
                            <div className="link">
                                <Link to='/' ><Icon.Power color='white' className='icon' size='30' /></Link>
                            </div>
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