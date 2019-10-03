import React, {Component} from 'react'
import Chatroom from './Chatroom'

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            roomName: ''
        }
    }

    joinRoom = () => {
        const roomsArr = this.state.rooms.slice()
        roomsArr.push(this.state.roomName)
        this.setState({
            rooms: roomsArr,
            roomName: ''
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const rooms = this.state.rooms.map(room => <Chatroom room={room}/>)
        return(
            <div className="joinroom">
                <h2>Join Room</h2>
                <div className="room-joiner">
                    <input type="text" name='roomName' onChange={this.handleChange} />
                    <button onClick={this.joinRoom} >Start Chatting</button>
                </div>
                <div className="room-list">
                    <Chatroom room='global' />
                    {rooms}
                </div>
            </div>
        )
    }
}