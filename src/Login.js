import React, { Component } from 'react';
import { Label, Transition, Segment, Form, Card, Icon, Divider, Header, Button } from 'semantic-ui-react';
import cookie from 'react-cookies';
import firebase from 'firebase/app';
import 'firebase/auth';
import AppHeader from './AppHeader';
// import './App.css';

var config = {
  apiKey: "AIzaSyAu7OJskU1ma8Wt0tDHQfi5C9lAXiEVtA8",
  authDomain: "threed-printing-dashboard.firebaseapp.com",
  databaseURL: "https://threed-printing-dashboard.firebaseio.com",
  projectId: "threed-printing-dashboard",
  storageBucket: "threed-printing-dashboard.appspot.com",
  messagingSenderId: "959893611225"
};

firebase.initializeApp(config);

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;


class Login extends Component {

    onLogin = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
            alert(error.message);
        }).then(user => {
            firebase.auth().currentUser.getIdToken().then(token => {
                cookie.save('__session', token, { path: '/' });
                window.location = 'dashboard';
            })
        });
    }

    onSignup = () => {
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let password = this.state.password;

        firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            firebase.auth().currentUser.getIdToken().then(token => {
                cookie.save('__session', token, { path: '/' });
                fetch('/user', {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                        firstName,
                        lastName
                    })
                }).then(res => res.json())
                    .catch(e => console.error(e))
                    .then(data => {
                        console.log(data)
                        window.location = 'dashboard';
                    })
            })
        })
    }

  validateEmail = (email) => {return !emailPattern.test(email)};
  validatePassword = (password) => {return password.length < 6};
  validateConfirmPassword = (confirmPassword, password) => {return (confirmPassword !== password)};

  handleVisibility = () => {
    this.setState({
      createAccount: !this.state.createAccount
    });
  }

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
      emailError: this.validateEmail(event.target.value)
    }
  )};

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
      passwordError: this.validatePassword(event.target.value)
    });
  }

  handleConfirmPassword = (event) => this.setState({ confirmPasswordError: this.validateConfirmPassword(event.target.value, this.state.password)});

  state = {
    email: "",
    password: "",
    emailError: false,
    createAccount: false
  }

  render() {
    const { createAccount, emailError, passwordError, confirmPasswordError, firstName, lastName } = this.state
    
    return (
        <div className='app'>
            <AppHeader />

            <div className='contentContainer center'>
                <div id="login">
                    <Segment.Group horizontal id='segment'>

                        <Segment id='form'>
                            
                            <Form id='loginForm'>
                                <Transition.Group animation='slide up' duration='500'>
                                    {createAccount && (
                                    <div className="extra-inputs">
                                        <Form.Group>
                                            <Form.Input value={firstName} onChange={e => this.setState({ firstName: e.target.value })} fluid autoComplete='given-name' label='First name' placeholder='First Name'></Form.Input>
                                            <Form.Input value={lastName} onChange={e => this.setState({ lastName: e.target.value })} fluid autoComplete='family-name' label='Last name' placeholder='Last name'></Form.Input>
                                        </Form.Group>

                                    </div>
                                    )}
                                </Transition.Group>


                                <Form.Input fluid icon='mail' autoComplete='email' label='Email' placeholder='Email' error={createAccount && emailError} onChange={this.handleEmail}></Form.Input>
                                <Form.Input fluid icon='lock' label='Password' placeholder='Password' type='password' error={createAccount && passwordError} onChange={this.handlePassword}></Form.Input>

                                <Transition.Group animation='slide up' duration='500'>
                                    {createAccount && (
                                    <div className="extra-inputs">
                                        <Form.Input fluid autoComplete="new-password" label='Confirm Password' type='password' placeholder='Confirm Password' error={createAccount && confirmPasswordError} onChange={this.handleConfirmPassword}></Form.Input>
                                    </div>
                                    )}
                                </Transition.Group>

                                <Form.Input fluid label='' control={Button} primary type='submit' onClick={createAccount ? this.onSignup.bind(this, firstName, lastName) : this.onLogin.bind(this, this.state.email, this.state.password)} content={createAccount ? "Create your account" : "Login"} />
                                <Divider />
                                <Form.Input fluid label='' control={Button} onClick={this.handleVisibility} content={createAccount ? "Login" : "Create your account"} />
                            </Form>
                        </Segment>
                    </Segment.Group>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;
