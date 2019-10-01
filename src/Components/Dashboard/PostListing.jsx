import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {selectPost} from '../../ducks/reducer'



class PostListing extends Component {

    findListing = () => {
        axios.get(`/api/post/${this.props.post.post_id}`).then(res => {
            this.props.selectPost(res.data)
        })
    }

    render() {
        const post = this.props
        const path = `/post/${post.id}`
        return (
            <Link className='post-link' to={path} onClick={this.findListing}>
                <div className="article-listing">
                    <div className="post">
                    <img src={post.image_url} alt="" className='post-image' />
                        <p className='post-item' >{post.item}</p>
                        <p className='post-price' >{post.price}</p>
                        <p className='post-content' >{post.content}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {selectPost})(PostListing)