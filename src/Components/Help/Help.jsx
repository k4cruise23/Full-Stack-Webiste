import React from 'react'
import './Help.css'
import * as Icon from 'react-feather'
import {Link} from 'react-router-dom'

export default function About() {
    return (
        <div className='about'>
                <header className='auth-header'>
                    <div className="header-parent">
                    <h1>FARMER'S MARKIT</h1>
                    <div className="header-icon"><Icon.ArrowDown size='35' color='white' /></div>
                    </div>
                    <div className="help">
                    <Link to='/' ><Icon.ArrowLeftCircle color='white' size='30' /></Link>
                    </div>
                </header>
                <div className="contact-me-parent">
                <Icon.Mail size='40' color='black' />
                <div className="contact-me">
                    <h3>Have questions or need help? Please contact me at katiecruise23@gmail.com</h3>
                </div>
            </div>
                {/* <span className='please' >
                    <h6 className='do-not' >* Please refrain from posting personal items and other products outside of agriculture. Any post that does not meet the proper criteria will be removed by the admin.</h6>                  
                </span> */}
        </div>  
    )
}
