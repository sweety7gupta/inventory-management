import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";

import './Login.css';
// import { Link } from 'react-router-dom';
// import { Form } from 'react-bootstrap';

 class Login extends Component {

  state ={
    username:"",
    password:"",
    active:true,

 }


 handleAllChange = (value) => {
     this.setState(value);
    // this.validate(value);
 }

 loginDetails = (event) => {
     const requestObject = {
         username: this.state.username,
         password: this.state.password,
     }
     if(this.state.active===true){
        this.props.history.replace("/dashboard")
     }

 }


  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
                  <img src={require("../../assets/images/logo.png")} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <div className="row">
                <div className="card-body text-field-container">  
                    <TextField
                        id="user-basic"
                        label="Username"
                        variant="outlined"
                        value={this.state.Username}
                        onChange={(event) => this.handleAllChange({ Username: event.target.value })}                                    
                        className="text-field"
                        size= "small"
                        fullWidth="true"
                    />
                </div> 
                <div className="card-body text-field-container">  
                    <TextField
                        id="password-basic"
                        label="Password"
                        variant="outlined"
                        value={this.state.password}
                        onChange={(event) => this.handleAllChange({ password: event.target.value })}                                    
                        className="text-field"
                        size= "small"
                        type="password"
                        fullWidth="true"
                    />
                </div> 
                <div className="card-body text-field-container">
                    <Button variant="contained" color="primary" onClick={this.loginDetails}>
                        Login
                    </Button>
                </div>   
                

            </div>
      

                {/* <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" placeholder="Username" size="lg" className="h-auto" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Password" size="lg" className="h-auto" />
                  </Form.Group>
                  <div className="mt-3">
                    <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">SIGN IN</Link>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-black">Forgot password?</a>
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div>
                </Form>
               */}
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default withRouter(Login);
