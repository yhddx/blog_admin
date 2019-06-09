import React, { Component } from "react";
import { Input, Tooltip, Icon, Button, message } from 'antd';
import './Register.less'
import { number } from "prop-types";
import { connect } from 'react-redux';
import {get_api_host} from './utils';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regData: {
                regUsername: '',
                regPassword: '',
            },
            userInfo: {
                userId: number,
                username: '',
            }
        }
    }
    nameOnChange(e) {
        this.state.regData.regUsername = e.target.value;
        this.setState({
            regData: this.state.regData,
        });
    }
    passOnChange(e) {
        this.state.regData.regPassword = e.target.value;
        this.setState({
            regData: this.state.regData,
        });
    }
    regSubmit() {
        console.log(this.state.regData);
        fetch(`${get_api_host()}/login/`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.regData),

        }).then(function (response) {
            return response.json();
        })
            .then(result => {
                // console.log(result);
                // this.props.getUserInfo(result.regData.id, result.regData.username);
                if (result.status === 0) {
                    this.setState({
                        userInfo: {
                            userId: result.regData.id,
                            username: result.regData.username,
                        }
                    })   
                    message.success("登录成功");
                    this.props.history.push({ pathname: "/list" });
                    let userInfo = {
                        status: 0,
                        message: "登录成功",
                        userData:{
                            userId:result.regData.id,
                            userName:result.regData.username,
                        },
                    }
                    
                    this.props.success(userInfo);

                }
                else {
                    message.error(result.message);
                }
            });
    }



    render() {
        return (
            <div className="register-body">
                <div className="register-wrapper">
                    <a className="register-title">登陆</a>
                    <Input
                        className="username-input"
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={
                            <Tooltip title="Extra information">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                        value={this.state.regData.regUsername}
                        onChange={this.nameOnChange.bind(this)}
                    />

                    <Input.Password
                        className="password-input"
                        placeholder="input password"
                        value={this.state.regData.regPassword}
                        onChange={this.passOnChange.bind(this)}
                    />
                    <Button className="register-submit" type="primary" onClick={this.regSubmit.bind(this)}>提交</Button>
                </div>
            </div>
        )
    }
}

const saveUserData = (payload) => {
    return {
      type: 'login',
      payload,
    }
  }

const mapStateToProps = (state) => {
    return { userData: state.userinfoReducer.userData };
};

const mapDispatchToProps = (dispatch) => {
    return {
        success: (data) => {
            console.log('login success', data);
            dispatch(saveUserData(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;