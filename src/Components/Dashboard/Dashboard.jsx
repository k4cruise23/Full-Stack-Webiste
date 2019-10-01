import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import * as Icon from 'react-feather'
import {searchUsers, addUser} from '../../ducks/reducer'
import PostListing from './PostListing'

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

    handleInput = (e, key) => {
        this.setState({
            [key]: e.target.value
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

    handleSearchInput = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
        const filteredPosts = this.props.allPosts.filter(post => post.content.includes(e.target.value))
        this.setState({displayPosts: filteredPosts})
    }

    render(){

        let posts = []
        const listedPosts = posts.map((post, i) => {
            return <PostListing key={i} post={post} />
        })

        return(
            <div className="dashboard">
                <div className="top-search-container">
                    <div className="top-nav">
                        <div className="search-feature">
                            <div className="search-container">
                                <input type="text" value={this.state.search} className='searchbar' onChange={this.handleSearchInput} placeholder='Search...' /><Icon.Search color='gray' className='icon' size='20' />
                            </div>
                            <button className='reset' onClick={this.resetSearch} >X</button>
                        </div>
                    </div>
                </div>
                <div className="posts-container">
                    {listedPosts}
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
} export default connect(mapStateToProps, {searchUsers, addUser})(Dashboard)