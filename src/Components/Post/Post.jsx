import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {selectPost} from '../../ducks/reducer'

class Post extends Component{

    componentDidMount(){
        axios.get(`/api/post/${this.props.match.params.postid}`).then(res => {
            this.props.selectPost(res.data)
        })
    }

    render(){
        const {currentPost} = this.props
        return (
            <div className="post-container">
                <div className="article">
                    <div className="post">
                        <img src={currentPost.image_url} alt="" className='post-image' />
                        <p className='post-item' >{currentPost.item}</p>
                        <p className='post-price' >{currentPost.price}</p>
                        <p className='post-content' >{currentPost.content}</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {selectPost})(Post)