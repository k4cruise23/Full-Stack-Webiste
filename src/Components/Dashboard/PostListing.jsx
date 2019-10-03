// import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import axios from 'axios'
// import {selectPost} from '../../ducks/reducer'
// import './Dashboard.css'



// class PostListing extends Component {

//     // findListing = () => {
//     //     axios.get(`/api/post/${this.props.post.post_id}`).then(res => {
//     //         this.props.selectPost(res.data)
//     //     })
//     // }
//     findListing = () => {
//         // console.log(this.props.post.id)
//         axios.get(`/api/post/${this.props.post.id}`).then(res => {
//             // console.log(res.data)
//             this.props.selectPost(res.data)
//         })
//     }

//     render() {
//         // console.log(this.props.post)
//         const post = this.props
//         const path = `/post/${post.post_id}`
//         return (
//             <Link className='post-link' to={path} onClick={this.findListing}>
//                 <div className="article-listing">
//                     <div className="post">
//                     <img className='post-image' src={this.props.post.image_url} alt="" className='post-image' />
//                         <p className='post-item' >{this.props.post.item}</p>
//                         <p className='post-price' >{this.props.post.price}</p>
//                         <p className='post-content' >{this.props.post.content}</p>
//                     </div>
//                 </div>
//             </Link>
//         )
//     }
// }

// function mapStateToProps(state){
//     return state
// }

// export default connect(mapStateToProps, {selectPost})(PostListing)