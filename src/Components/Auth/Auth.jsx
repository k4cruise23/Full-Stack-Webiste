import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {addUser} from '../../ducks/reducer'
import './Auth.css'
import * as Icon from 'react-feather'

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
                <div className="about-auth-container">
                <header className='header'>
                    <h1>FARMER'S MARKIT <Icon.ArrowDown size='40' color='white' /></h1>
                </header>
                <div className="landing-parent">
                <div className="about-container">
                    <div className="about">
                        <h2>About</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolore autem impedit sunt voluptatibus, molestiae ea quidem nostrum quas esse ipsa asperiores corrupti eos provident quos perspiciatis, hic tempora? Officiis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolore autem impedit sunt voluptatibus, molestiae ea quidem nostrum quas esse ipsa asperiores corrupti.</p>
                    </div>
                </div>
                <div className="sign-up-container">
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
                        <input value={username} name="username" onChange={this.handleInput} placeholder="Username" type="text" className="login-input"></input>
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
                </div>
                <div className="functions-container">
                    <div className="info">
                        <Icon.MessageSquare color='purple' size='60' />
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure iusto praesentium vero pariatur inventore molestiae facilis mollitia esse eius accusantium! Cum, corrupti amet impedit iure unde ipsam nulla. Quia, harum.</h4>
                    </div>
                    <div className="info">
                        <Icon.CreditCard color='purple' size='60' />
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam labore fugit molestiae! In veniam nesciunt corporis voluptatum tenetur reprehenderit quam eligendi, sit vero enim, blanditiis tempore molestias natus neque dolor!</h4>
                    </div>
                    <div className="info">
                        <Icon.Upload color='purple' size='60' />
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum doloribus exercitationem, voluptates officia et tempore rem nostrum quidem, obcaecati praesentium vitae quod esse animi enim libero, fuga aliquid odio?</h4>
                    </div>
                </div>
            </div>
        )
    }


}

export default connect(null, {addUser})(Auth)