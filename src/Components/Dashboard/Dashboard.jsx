import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import * as Icon from 'react-feather'
import {searchUsers, addUser} from '../../ducks/reducer'
// import PostListing from './PostListing'
import './Dashboard.css'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
    constructor(){
        super()

        this.state = {
            search: '',
            displayPosts: []
        }
    }

    componentDidMount(){
        axios.get('/api/post/getAll').then(res => {
            
            this.setState({displayPosts: res.data})
        })
    }

    handleInput = (e) => {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
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

    handleSearchInput = (e) => {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
        const filteredPosts = this.state.displayPosts.filter(post => post.content.includes(e.target.value))
        // console.log(filteredPosts)
        this.setState({
            displayPosts: filteredPosts
        })
    }

    render(){
        return(
            <div className="dashboard">
                <div className="top-search-container">
                    <div className="top-nav">
                        <div className="search-feature">
                            <div className="search-container">
                                <input type="text" value={this.state.search} className='searchbar' name='search' onChange={this.handleSearchInput} placeholder='Search...' /><Icon.Search color='gray' className='icon' size='20' />
                            <button className='reset' onClick={this.resetSearch} >X</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='posts-container'>
                    {this.state.displayPosts.length > 0 ? this.state.displayPosts.map(el=> (
                        <div className='article-listing' >
                            <div className="post">
                                <img className='post-image' src={el.image_url} alt=""/>
                                <hr/>
                                <p className="post-item">{el.item}</p>
                                <hr/>
                                <p className="post-price">{el.price}</p>
                                <hr/>
                                <p className="psot-content">{el.content}</p>
                                <hr/>
                            <div className="buttons">
                                <button onClick={() => this.deletePost(el.post_id)} >delete</button>
                        <Link to={`/chat/${el.post_id}`} ><Icon.MessageSquare color='black' size='30' className='icons' /></Link>
                        <Icon.CreditCard color='black' size='30' className='icons' />
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