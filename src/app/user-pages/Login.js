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

 componentDidMount() {  
 }

 handleAllChange = (value) => {
     this.setState(value);
    // this.validate(value);
 }

 loginDetails = (event) => {
    //  const requestObject = {
    //      username: this.state.username,
    //      password: this.state.password,
    //  }
    //  if(this.state.active===true){
    //     this.props.history.replace("/dashboard")
    //  }
    fetch("http://192.168.225.219:1337/api/v1/account/login",{
    method: "POST",
    body: JSON.stringify({
      username: this.state.username ,
      password: this.state.password
    })
  }).then((response) => {
    response.json().then((json) => {
      if(json.code==="success")
      {
        localStorage.setItem("token", json.data.token);
        localStorage.setItem("username", json.data.username);

        window.location.href = '/dashboard';
        // this.props.history.replace("/dashboard")
      }
      // console.log(json);
    });
  })

 }


  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light value-left py-5 px-4 px-sm-5">
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
                        <Button variant="contained" color="primary" onClick={this.loginDetails}>
                            Login
                        </Button>
                    </div>   
                  </div>

              </div>
      
              </div>
            </div>
          </div>
        </div> 
    )
  }
}

export default withRouter(Login);
