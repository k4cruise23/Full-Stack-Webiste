import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {addUser} from '../../ducks/reducer'
import './Auth.css'
import * as Icon from 'react-feather'
import Swal from 'sweetalert2'

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            display: true,
            username: '',
            password: '',
            error: false,
            errorMessage: ''
        }
    }

    changeDisplay = () => {
        this.setState({
            display: !this.state.display,
            username: '',
            password: '',
            error: false,
            errorMessage: ''
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        const {username, password} = this.state
        axios.post('/auth/login', {username, password})
        .then(res => {
            this.props.addUser(res.data)
            this.props.history.push('/dashboard')
            Swal.fire(
                'Good job!',
                'You logged in!',
                'success'
              )
        })
    }

    register = () => {
        const {username, password} = this.state
        axios.post('/auth/register', {username, password})
        .then(res => {
            this.props.addUser(res.data[0])
            this.props.history.push('/dashboard')
            Swal.fire(
                'Good job!',
                'You have registered!',
                'success'
              )
        })
    }

    render(){
        const {username, password} = this.state
        return(
            <div className='auth-container'>
                <div className="about-auth-container">
                <header className='auth-header'>
                    <h1>FARMER'S MARKIT </h1>
                    <div className="header-icon"><Icon.ArrowDown size='35' color='white' /></div>
                </header>
                <div className="landing-parent">
                <div className="about-container">
                    <div className="about">
                        <h2>Why a virtual farmer's market?</h2>
                        <p>Farmer's markets normally cater to farmers who grow produce specifically for others. This is a place where you can buy, sell, or give away any left over produce from a season's harvest.</p>
                        <p>Less waste, money made, happy people.</p>
                    </div>
                </div>
                <div className="sign-up-container">
                    <h2 className="title">Log in or Register</h2>
                    <div className='sign-up-form'>
                    {this.state.error ?
                        <div className="error">
                            {this.state.errorMessage}
                        </div> :
                        null
                    }
                {
                    this.state.display ? 
                    <div className={this.state.error ?
                        "login-register-container shake"
                        :
                        "login-register-container"
                    }>
                        <input autoComplete="off" value={username} name="username" onChange={this.handleInput} placeholder="Username" type="text" className="login-input"></input>
                        <input autoComplete="off" value={password} name="password" onChange={this.handleInput} placeholder="Password" type="password" className="login-input"></input>
                        <div className='btn-box'>
                            <button className="btn login" onClick={this.login}>Login</button>
                            <button className="btn register" onClick={this.changeDisplay}>Register</button>
                        </div>
                    </div>
                    :
                    <div className="login-register-container">
                        <input autoComplete="off" value={username} name="username" onChange={this.handleInput} placeholder="Username" type="text" className="login-input"></input>
                        <input autoComplete="off" value={password} name="password" onChange={this.handleInput} placeholder="Password" type="password" className="login-input"></input>
                        <div className='btn-box'>
                            <button className="btn login" onClick={this.register}>Sign Up</button>
                            <button className="btn register" onClick={this.changeDisplay}>Cancel</button>
                        </div>
                    </div>
                }
                    </div>
                </div>
                </div>
                </div>
                <div className="functions-container">
                    <div className="info">
                        <Icon.MessageSquare color='black' size='40' />
                        <h5 className="info-title">Online chat</h5>
                        <h5>Contact users directly when interested in a post. Discuss the product, negotiate prices, set a meeting, etc.</h5>
                    </div>
                    <div className="info">
                        <Icon.CreditCard color='black' size='40' />
                        <h5 className="info-title">Pay with card</h5>
                        <h5>Make an online payment without the stress of gathering your change.</h5>
                    </div>
                    <div className="info">
                        <Icon.DollarSign color='black' size='40' />
                        <h5 className="info-title">Everyone saves</h5>
                        <h5>Don't worry about having to throw away left over produce, and vice versa, don't over-pay for fresh produce at a grocery store.</h5>
                    </div>
                </div>
            </div>
        )
    }


}

export default connect(null, {addUser})(Auth)