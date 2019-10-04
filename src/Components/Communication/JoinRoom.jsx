import React, {Component} from 'react'
import Chatroom from './Chatroom'
import {Link} from 'react-router-dom'

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            // room: null,
            roomName: '',
            // joined: false
        }
    }

    // componentDidMount(){
    //     console.log(this.props)
    // }

    joinRoom = () => {
        const roomsArr = this.state.rooms.slice()
        roomsArr.push(this.state.roomName)
        this.setState({
            rooms: roomsArr,
            roomName: ''
        })
        // if(this.state.room) {
        //     this.socket.emit('join room', {
        //         room: this.state.room
        //     })
        //     this.setState({joined: true})
        // }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        // const rooms = this.state.rooms.map(room => <Chatroom room={room}/>)
        return(
            <div className="joinroom">
                <h2>Join Room</h2>
                <div className="room-joiner">
                    <input type="text" name='roomName' onChange={this.handleChange} />
                    <Link to={`/room/${this.props.match.params.post_id}`} ><button className='button' onClick={this.joinRoom} >Start Chatting</button></Link>
                </div>
                <div className="room-list">
                    <Chatroom room={this.props.match.params.post_id} />
                
                </div>
            </div>
        )
    }
}