import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import * as ApiHelper from '../ApiHelper';

import './Login.css';
// import { Link } from 'react-router-dom';
// import { Form } from 'react-bootstrap';

 class Login extends Component {

  state ={
    username:"",
    password:"",
    active:true,

 }

 componentDidMount() {  
 }

 handleAllChange = (value) => {
     this.setState(value);
 }

 handleInitiateLogin = (event) => {
   event.preventDefault();

    ApiHelper.login(this.state.username, this.state.password)
      .then((json) => {
        if(json.code==="success") {
          localStorage.setItem("token", json.data.token);
          localStorage.setItem("username", json.data.username);

          this.props.history.replace("/dashboard");
        } else {
          alert(json.message);
        }
      });
 }


  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light value-left py-5 px-4 px-sm-5" style={{ borderRadius: 6 }}>

                  <form onSubmit={this.handleInitiateLogin}>
                    <div className="brand-logo">
                      {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
                      <img src={require("../../assets/images/logo.png")} alt="logo" />
                    </div>
                      <h4>Hello! let's get started</h4>
                      <h6 className="font-weight-light">Sign in to continue.</h6>
                      <div className="row">
                        <div className="card-body value-field-container">  
                            <TextField
                                id="user-basic"
                                label="Username"
                                variant="outlined"
                                value={this.state.username}
                                onChange={(event) => this.handleAllChange({ username: event.target.value })}                                    
                                className="value-field"
                                size= "small"
                                fullWidth="true"
                            />
                        </div> 
                      </div>
                      <div className="row">
                        <div className="card-body value-field-container">  
                            <TextField
                                id="password-basic"
                                label="Password"
                                variant="outlined"
                                value={this.state.password}
                                onChange={(event) => this.handleAllChange({ password: event.target.value })}                                    
                                className="value-field"
                                size= "small"
                                type="password"
                                fullWidth="true"
                            />
                        </div> 
                      </div>
                      <div className="row">
                        <div className="card-body value-field-container">
                            <Button type="submit" variant="contained" color="primary" onClick={this.handleInitiateLogin}>
                                Login
                            </Button>
                        </div>
                      </div>
                  </form>
                </div>
                </div>
          </div>
        </div>
      </div> 
    )
  }
}

export default withRouter(Login);
