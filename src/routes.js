import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import Post from './Components/Post/Post'
import Form from './Components/Communication/Form'
import JoinRoom from './Components/Communication/JoinRoom'
import Chatroom from './Components/Communication/Chatroom'
import Payment from './Components/Communication/Payment'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/post/:postid' component={Post}/>
        <Route path='/new' component={Form} />
        <Route path='/chat/:post_id' component={JoinRoom} />
        <Route path='/room/post_id' component={Chatroom} />
        <Route path='/pay' component={Payment} />
    </Switch>
)
