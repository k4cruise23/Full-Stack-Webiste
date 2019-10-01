import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {addUser} from '../../ducks/reducer'

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
            password: ''
        })
    }

    handleChange(e, key) {
        this.setState({
            [key]: e.target.value
        })
    }

    login = () => {
        const {username, password} = this.state
        axios.post('/auth/login', {username, password})
        .then(res => {
            this.props.addUser(res.data)
            this.props.history.push('/dashboard')
        })
    }

    register = () => {
        const {username, password} = this.state
        axios.post('/auth/register', {username, password})
        .then(res => {
            this.props.addUser(res.data[0])
            this.props.history.push('/dashboard')
        })
    }

    render(){
        const {username, password} = this.state
        return(
            <div className='auth-container'>
                <div className="sign-up-container">
                    <div className="logo">
                        <img src="future logo" alt=""/>
                    </div>
                    <h1 className="title">Website title</h1>
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
                        <input value={username} name="username" onChange={this.handleInput} placeholder="Username" type="text" className="login-input"></input>
                        <input value={password} name="password" onChange={this.handleInput} placeholder="Password" type="password" className="login-input"></input>
                        <div className='btn-box'>
                            <button className="btn login" onClick={this.login}>Login</button>
                            <button className="btn register" onClick={this.changeDisplay}>Register</button>
                        </div>
                    </div>
                    :
                    <div className="login-register-container">
                        <input value={username} name="username" onChange={this.handleInput} placeholder="username" type="text" className="login-input"></input>
                        <input value={password} name="password" onChange={this.handleInput} placeholder="Password" type="password" className="login-input"></input>
                        <div className='btn-box'>
                            <button className="btn login" onClick={this.register}>Sign Up</button>
                            <button className="btn register" onClick={this.changeDisplay}>Cancel</button>
                        </div>
                    </div>
                }
                    </div>
                </div>

            </div>
        )
    }


}
