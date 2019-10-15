import React, {Component} from 'react'
import io from 'socket.io-client'
import './Chat.css'
import {connect} from 'react-redux'
require('dotenv').config()
const {REACT_APP_SOCKET_CONNECT} = process.env


class Chatroom extends Component{
    constructor(props){
        super(props)

        this.state = {
            messages: [],
            message: '',
            username: '',
            userTyping: false
        }
        this.socket = io.connect(REACT_APP_SOCKET_CONNECT)
        this.socket.on('room response',  data => this.updateMessages(data))
        this.socket.on('typing', () => this.setTyping())
        this.socket.on('stopped typing', () => this.stopTyping())
    }

    componentDidMount= () => {
        if (this.props.room !== 'global') {
            this.socket.emit('join room', {room: this.props.room})
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value}, () => {
            if (this.state.message) {
                this.socket.emit('typing', {room: this.props.room})
            } else {
                this.socket.emit('stopped typing', {room: this.props.room})
            }
        })
    }

    setTyping = () => {
        this.setState({userTyping: true})
    }

    stopTyping = () => {
        this.setState({userTyping: false})
    }

    updateMessages= data => {
        this.setState({
            messages: [...this.state.messages, {message: data.message, username: data.username}]
        })
        this.setState({message: '', userTyping: false})
    }

    blast = () => {
        this.socket.emit(
            `blast to room socket`,
            {
                message: this.state.message,
                username: this.props.user.username,
                room: this.props.room
            }
        )
    }

    render(){
    //   console.log(this.props)
        const messages = this.state.messages.map((message, i) => (
            <div key={i} className={message.username === this.props.user.username ? 'my-message' : 'message'} >
                <div className="each-message">
                <h5 className='message-username' >{message.username}</h5>
                <p>{message.message}</p>
                </div>
            </div>
        ))
        return (
            <div className="chatroom-parent">
            <div className="chatroom">
                <div className="messages-container">
                <h2>Start chatting!</h2>
                    {messages}
                    {this.state.userTyping && (
                        <h4 className="typing-messages">Typing...</h4>
                        )}
                </div>
                <div className="send-message">
                <input type="text"  onChange={e => this.handleChange(e) } name={'message'} value={this.state.message} placeholder='Type message here' />
                <button onClick={() => this.blast()} >Send</button>
                </div>
            </div>
            </div>
        )
    }

}

function mapStateToProps(reduxState) {
    return reduxState
}
 export default connect(mapStateToProps, {})(Chatroom)