import React, { Component } from "react";
import { Input, Tooltip, Icon, Button, message, Upload, Modal } from 'antd';
import './Picture.less'
import { number } from "prop-types";
import { connect } from 'react-redux';
import {get_api_host} from './utils';



class Picture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: 'cc',
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ],
        }
    }
    componentDidMount = () => {
        // let path=parseInt(this.props.match.params.number, 10);

        fetch(`${get_api_host()}/picture/`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            //     // body: JSON.stringify(idx),
        }).then(function (response) {
            return response.json();
        }).then((myJson) => {
            this.setState({
                fileList: myJson,
            });
        });
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.thumbUrl || file.url,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    }
    onRemove = file => {
        return new Promise((resolve, reject) => {
            fetch(`${get_api_host()}/picture/del/`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: file.uid,
                    url: file.url,
                }),
            }).then(function (response) {
                return response.json();
            }).then((myJson) => {
                if (myJson.status == 0) {
                    resolve(true);
                } else {
                    reject();
                }
            })
        })
    }
    uploadAction = (file) => {
        return new Promise(() => {
            let formData = new FormData();
            formData.append('file', file);
            console.log(formData);
            fetch(`${get_api_host()}/picture/upload/`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: formData,
            }).then(function (response) {
                return response.json();
            }).then((myJson) => {
                this.state.fileList.push(myJson);
                this.setState({
                    fileList:this.state.fileList,
                })
            })
        })
    }




    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        console.log('preview',previewImage);
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix" >
                <Upload
                    action={this.uploadAction}//"${get_api_host()}/picture/upload/"//上传的地址
                    withCredentials={true} //上传请求时是否携带cookie
                    listType="picture-card" //上传列表的内建样式，支持三种基本样式 text, picture，picture-card
                    fileList={fileList}  //已经上传的文件列表（受控），使用此参数时，如果遇到 onChange 只调用一次的问题
                    onPreview={this.handlePreview} //点击文件链接或预览图标时的回调
                    onChange={this.handleChange}   //上传文件改变时的状态
                    onRemove={this.onRemove}
                >
                    {fileList.length >= 100 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Picture);

// export default Login;

   // nameOnChange(e) {
    //     this.state.regData.regUsername = e.target.value;
    //     this.setState({
    //         regData: this.state.regData,
    //     });
    // }
    // passOnChange(e) {
    //     this.state.regData.regPassword = e.target.value;
    //     this.setState({
    //         regData: this.state.regData,
    //     });
    // }
    // regSubmit() {
    //     console.log(this.state.regData);
    //     fetch(`${get_api_host()}/login/`, {
    //         method: 'POST',
    //         mode: 'cors',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(this.state.regData),

    //     }).then(function (response) {
    //         return response.json();
    //     })
    //         .then(result => {
    //             // console.log(result);
    //             // this.props.getUserInfo(result.regData.id, result.regData.username);
    //             if (result.status === 0) {
    //                 this.setState({
    //                     userInfo: {
    //                         userId: result.regData.id,
    //                         username: result.regData.username,
    //                     }
    //                 })   
    //                 message.success("登录成功");
    //                 this.props.history.push({ pathname: "/list" });
    //                 let userInfo = {
    //                     status: 0,
    //                     message: "登录成功",
    //                     userData:{
    //                         userId:result.regData.id,
    //                         userName:result.regData.username,
    //                     },
    //                 }

    //                 this.props.success(userInfo);

    //             }
    //             else {
    //                 message.error(result.message);
    //             }
    //         });
    // }