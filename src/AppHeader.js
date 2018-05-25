import React, { Component } from 'react';
import { Icon, Header, Button } from 'semantic-ui-react';
import cookie from 'react-cookies';
import firebase from 'firebase/app';
import 'firebase/auth';
// import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <div className='header-bar'>
                <Icon inverted link name='bars' className='offset' onClick={this.props.onMenuClick}/>
                <Header inverted as='h3' className='headerText' content='Print3D' />

                <div className='actions'>
                    <a>Contact Us</a>
                    <a>About</a>
                    <Button inverted icon='sign out' as='button' content='Logout' onClick={() => {
                        console.log("Hello")
                        firebase.auth().signOut().then(() => {
                            cookie.remove('__session')
                            window.location = '/'
                        });
                    }} />
                    {/* <Button inverted icon='sign in' labelPosition='right' as='button' content='Login' /> */}
                </div>
            </div>
                
        );
    }
}

export default AppHeader;