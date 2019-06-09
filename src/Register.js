import React, { Component } from "react";
import { Input, Tooltip, Icon, Button ,message} from 'antd';
import './Register.less'
import {get_api_host} from './utils';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regData: {
                regUsername: '',
                regPassword: '',
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
        fetch(`${get_api_host()}/register/`, {
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
                if (result.status === 0) {
                    message.success("注册成功");
                    this.props.history.push({ pathname: "/login/" });
                }
            });
    }



render() {
    return (
        <div className="register-body">
            <div className="register-wrapper">
                <a className="register-title">注册</a>
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

export default Register;