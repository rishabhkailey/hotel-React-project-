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
            isValidUname: null,
            isInvalidUname: null,
            pwdMsg: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateUname = this.validateUname.bind(this);
    }
    validateUname(event){
        if(event.target.value.length === 0)
        {
            this.setState({isValidUname: false,isInvalidUname: true})
        }
        else
        {
            this.setState({isValidUname: true,isInvalidEmail: false})
        }
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
        if (pass.length <= 6) {
            this.setState({ isValidPassword: false, isInvalidPassword: true, pwdMsg: 'password should be of 6 or more characters' })
        }
        else if (!/.*[A-Z]/.test(pass)) {
            this.setState({ isValidPassword: false, isInvalidPassword: true, pwdMsg: 'password should contain atleast 1 uppercase character' })
        }
        else
            if (!/.*[a-z]/.test(pass)) {
                this.setState({ isValidPassword: false, isInvalidPassword: true, pwdMsg: 'password should contain atleast 1 lowercase character' })
            }
            else if (!/.*[0-9]/.test(pass)) {
                this.setState({ isValidPassword: false, isInvalidPassword: true, pwdMsg: 'password should containt atleast 1 number' })
            }
            else if (!/.*[!@#\$%\^&]/.test(pass)) {
                this.setState({ isValidPassword: false, isInvalidPassword: true, pwdMsg: 'password should containt atleast 1 special character' })
            }
            else
                this.setState({ isValidPassword: true, isInvalidPassword: false })

    }
    onSubmit(event) {
        event.preventDefault();
        console.log(event.target.email.value);
    }
    render() {
        let { isValidEmail, isInvalidEmail, isValidPassword, isInvalidPassword ,isValidUname,isInvalidUname } = this.state;
        return <div className='container-fluid' style={{ backgroundColor: '#f9f9f9' }}>
            <div className='row' style={{ padding: '2%' }}>
                <div style={{ margin: 'auto', fontSize: '30px', fontWeight: '400' }}>Create new account</div>
            </div>
            <Form noValidate onSubmit={this.onSubmit} className='col-lg-4' style={{ margin: 'auto', padding: '5%', backgroundColor: 'white', borderRadius: '2%', border: '1px solid #e8e5e5' }}>
                <Form.Group controlId="username"  style={{ padding: '1%' }}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control required isValid={isValidUname} isInvalid={isInvalidUname} onBlur={this.validateUname} type="text" placeholder="Username" name='uname' />
                    <Form.Control.Feedback type="invalid">
                        Please enter Username.
                    </Form.Control.Feedback>
                </Form.Group>

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
                        Sign up
                    </Button>
                </div>
            </Form>
        </div>
    }
}
export default Login;