import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidPassword: null,
            isInvalidPassword: null,
            isValidEmail: null,
            isInvalidEmail: null,
            pwdMsg: '',
            user: {},
            logInStatus: {
                logIn: false,
                error: false,
                msg: ''
            }
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);

        console.log(this.props)
    }
    validateEmail(event) {
        let mail = event.target.value;
        let mailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailRegExp.test(mail)) {
            this.setState({ isValidEmail: true, isInvalidEmail: false })
        }
        else
            this.setState({ isValidEmail: false, isInvalidEmail: true })
    }
    validatePassword(event) {
        let pass = event.target.value;
        if (pass.length < 6) {
            this.setState({ isValidPassword: false, isInvalidPassword: true, pwdMsg: 'password should be of 6 or more characters' })
        }
    }
    onSubmit(event) {
        event.preventDefault();

        console.log(event.target.email.value);
        let user = { email: event.target.email.value, password: event.target.password.value }

        fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                console.log(data)
                if(data.logIn){
                    this.props.authenticate(data);
                    this.props.history.push({
                        pathname: '/'
                    })
                }
                else
                    this.setState({ logInStatus: data ,user: user})
            })
            .catch((error) => {
                console.log('error: ' + error);
                // this.setState({ requestFailed: true })
            });
        // .then((res) => {
        //     alert(res);
        //     fetch('http://localhost:5000/protected', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(user)
        //     })
        // })
    }
    render() {
        let { isValidEmail, isInvalidEmail, isValidPassword, isInvalidPassword } = this.state;
        return <div className='container-fluid' style={{ backgroundColor: '#f9f9f9' }}>
            
            <div className='row' style={{ padding: '2%' }}>
                <div style={{ margin: 'auto', fontSize: '30px', fontWeight: '400' }}>log in</div>
            </div>
            <Form noValidate onSubmit={this.onSubmit} className='col-lg-4' style={{ margin: 'auto', padding: '5%', backgroundColor: 'white', borderRadius: '2%', border: '1px solid #e8e5e5' }}>
                {
                    this.state.logInStatus.error && <div className="alert alert-danger" style={{ textAlign: 'center' }} role="alert">
                        {this.state.logInStatus.msg}
                    </div>
                }
                <Form.Group controlId="formBasicEmail" style={{ padding: '1%' }}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required isValid={isValidEmail} isInvalid={isInvalidEmail} onBlur={this.validateEmail} type="email" placeholder="Enter email" name='email' />
                    <Form.Control.Feedback type="invalid">
                        Please provide a email address.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{ padding: '1%' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required isValid={isValidPassword} isInvalid={isInvalidPassword} onBlur={this.validatePassword} type="password" placeholder="Password" name='password' />
                    <Form.Control.Feedback type="invalid">
                        {this.state.pwdMsg}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                <div className='row' style={{ padding: '1%' }}>
                    <Button variant="primary" type="submit" style={{ margin: 'auto' }}>
                        log in
                    </Button>
                </div>
            </Form>
            <div className='col-lg-4' style={{ margin: 'auto', padding: '2%', backgroundColor: 'white', borderRadius: '2%', border: '1px solid #e8e5e5', textAlign: 'center' }}>
                new here ?<Link to='/signup'>create an account</Link>
            </div>
        </div>
    }
}
export default Login;