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
            displayPosts: this.props.allPosts,
            search: ''
        })
    }

    handleSearchInput = (e) => {
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
        const filteredPosts = this.props.allPosts.filter(post => post.item.includes(e.target.value))
        // console.log(filteredPosts)
        this.setState({
            displayPosts: filteredPosts
        })
    }

    render(){
        // console.log(this.state)
        // let posts = []
        // const listedPosts = this.state.displayPosts.map((post, i) => {
        //     return <PostListing key={i} post={post} />
        // })

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
                                <p className="post-item">{el.item}</p>
                                <p className="post-price">{el.price}</p>
                                <p className="psot-content">{el.content}</p>
                            <div className="buttons">
                        <Link to='/chat' ><Icon.MessageSquare color='black' size='30' className='icons' /></Link>
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