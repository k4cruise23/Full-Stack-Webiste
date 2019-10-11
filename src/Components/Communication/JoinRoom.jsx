import React, {Component} from 'react'
import Chatroom from './Chatroom'

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            roomName: '',
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
        return(
            <div className="joinroom">
                <div className="room-list">
                    <Chatroom room={this.props.match.params.post_id} />
                </div>
            </div>
        )
    }
}