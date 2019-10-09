import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import * as Icon from 'react-feather'
import {searchUsers, addUser} from '../../ducks/reducer'
import './Dashboard.css'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
    constructor(){
        super()

        this.state = {
            search: '',
            displayPosts: [],
            edit: false
        }
    }

    componentDidMount(){
        axios.get('/api/post/getAll').then(res => {
            
            this.setState({displayPosts: res.data})

        })
    }

    handleInput = (e, key) => {
        console.log('showing katie cool things', e.target.value, key)
        this.setState({
            [key]: e.target.value
        })
    }

    clickedSubmit = () => {
        this.props.searchUsers(this.state.search)
    }

    resetSearch = () => {
        this.setState({
            displayPosts: this.state.displayPosts,
            search: ''
        })
    }

    deletePost = id => {
        // console.log(id)
        axios.delete(`/api/post/${id}`).then(res => {
            this.setState({displayPosts: res.data})
        })
    }

    editPost = (el, cancel) => {
        // console.log(this.state)
        const {item, price, content, image_url} = this.state
        if(this.state.edit === false) return this.setState({edit: true, image_url: el.image_url, item: el.item, price: el.price, content: el.content})
        else if (cancel === true) return this.setState({edit: false})
        else { axios.put(`/api/post/${el.post_id}`, {item, price, content, image_url}).then(res => {
            // console.log(item, price, content, image_url, el.post_id)
                this.setState({displayPosts: res.data, edit: false})})
        }
    }

    handleSearchInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        const filteredPosts = this.state.displayPosts.filter(post => post.content.includes(e.target.value))
        this.setState({
            displayPosts: filteredPosts
        })
    }

    toggle = () => {
        this.setState(prevState => ({toggleEdit: !prevState.toggleEdit}))
        this.editPost()
    }

    render(){
        // console.log(this.props)
        return(
            <div className="dashboard">
                <div className="top-search-container">
                    <div className="top-nav">
                        <div className="search-feature">
                            <div className="search-container">
                            <input type="text" value={this.state.search} className='searchbar' name='search' onChange={this.handleSearchInput} placeholder='Search...' />
                            <button className='reset' onClick={this.resetSearch} >X</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='posts-container'>
                    {this.state.displayPosts.length > 0 ? this.state.displayPosts.map(el=> (
                        
                        <div key={el.post_id} className='article-listing' >
                            <div className="post">
                                <div className="item">
                                {this.state.edit ? <input className='post-item' type='text' value={this.state.item} onChange={(e) => this.handleInput(e, "item")} /> :
                                <p className="post-item">{el.item}</p>
                            }
                                </div>
                                <div className="image">
                                {this.state.edit ? <input className="post-image" type="text" value={this.state.image_url} onChange={(e) => this.handleInput(e, "image_url")} /> :
                                <img className='post-image' src={el.image_url} alt=""/>
                            }
                                </div>
                                <div className="price">
                                {this.state.edit ? <input className='post-price' type='text' value={this.state.price} onChange={(e) => this.handleInput(e, "price")} /> :
                                <p className="post-price">{el.price}</p>
                            }
                                </div>
                                <div className="content">
                                {this.state.edit ? <input className='post-content' type='text' value={this.state.content} onChange={(e) => this.handleInput(e, "content")} /> : 
                                <p className="post-content">{el.content}</p>
                            }
                                </div>
                            <div className="buttons">
                                {this.props.user.isadmin ? 
                                <div className="adminButtons">
                                <Icon.XSquare onClick={() => this.deletePost(el.post_id)} color='black' size='40' className='icons' />
                                <Icon.Edit onClick={() => this.editPost( el, false)} color='black' size='40' className='icons' />
                                {this.state.edit ? 
                                <button onClick={() => this.editPost( el, true)} >Cancel</button> :
                                null}
                                </div>
                                : null}
                        <Link to={`/chat/${el.post_id}`} ><Icon.MessageSquare color='black' size='40' className='icons' /></Link>
                        <Link to={'/pay'}><Icon.CreditCard color='black' size='40' className='icons' /></Link>
                            </div>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
} export default connect(mapStateToProps, {searchUsers, addUser})(Dashboard)