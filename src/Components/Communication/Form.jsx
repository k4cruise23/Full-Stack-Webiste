import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updatePosts} from '../../ducks/reducer'

class Form extends Component {
    constructor(){
        super()

        this.state = {
            image_url: '',
            item: '',
            price: '',
            content: ''
        }
    }

    handleChange= (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    submitPost = () => {
        const {image_url, item, price, content} = this.state
        const addPost = {...this.props.user, image_url, item, price, content}
        axios.post('/api/post/add', addPost).then( res => {
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
                    <div className="form-input">
                        <label>Image URL</label>
                        <input type="text" onChange={this.handleChange} />
                    </div>
                    <div className="form-input">
                        <label>Item</label>
                        <input type="text" onChange={this.handleChange} />
                    </div>
                    <div className="form-input">
                        <label>Price</label>
                        <input type="text" onChange={this.handleChange} />
                    </div>
                    <div className="form-input">
                        <label>Title</label>
                        <input type="text" onChange={this.handleChange} />
                    </div>
                    <div className="submit-btn">
                        <button onClick={this.submitPost} >Post</button>
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

