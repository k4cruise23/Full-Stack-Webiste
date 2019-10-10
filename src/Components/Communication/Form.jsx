import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updatePosts} from '../../ducks/reducer'
import './Form.css'


class Form extends Component {
    constructor(){
        super()

        this.state = {
            item: '',
            price: '',
            content: '',
            image_url: ''
        }
    }

    handleChange= (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    submitPost = () => {
        const {item, price, content, image_url} = this.state
        const addPost = {...this.props.user, item, price, content, image_url}
        // console.log(addPost)
        axios.post('/api/posts', addPost).then( res => {
            this.props.updatePosts(res.data)
            this.props.history.push('/dashboard')
        })
    }

    render(){
        return (
            <div className="form-background">
                <div className="form-container">
                    <h3 className='new-post'>NEW POST</h3>
                </div>
                <div className="form">
                    <img className='form-img' src={this.state.image_url} alt=""/>
                    <div className="form-input">
                        <label>Item</label>
                        <input type="text" onChange={e => this.handleChange(e, 'item')} value={this.state.item} />
                    </div>
                    <div className="form-input">
                        <label>Price</label>
                        <input type="text" onChange={e => this.handleChange(e, 'price')} value={this.state.price} />
                    </div>
                    <div className="form-input">
                        <label>Description</label>
                        <input type="text" onChange={e => this.handleChange(e, 'content')} value={this.state.content} />
                    </div>
                    <div className="form-input">
                        <label>Image URL</label>
                        <input type="text" onChange={e => this.handleChange(e, 'image_url')} value={this.state.image_url} />
                    </div>
                        <p className='instruction'>* Copy and paste your image's URL</p>
                    <div className="submit-btn">
                        <button className='addpost' onClick={this.submitPost} >Add Post</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {updatePosts})(Form)

