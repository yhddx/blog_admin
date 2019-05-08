import React, { Component } from "react";
import { Modal, Button, Input } from 'antd';
import { EditorState } from 'draft-js';
import RichText from './RichText';



class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            addList: false,
            inputValue: "",
            editorState: EditorState.createEmpty(),
        }

        this.showAddModal = this.showAddModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleCancel() {
        this.setState({ 
            visible: false 
        });
    }

    handleOk() {
        console.log(this.state.addList, this.state.modifyList);
        // if (this.state.addList) {
        //   let formData = new FormData();
        //   formData.append('title', this.state.inputValue);
        //   formData.append('content', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));

        //   fetch(`https://www.yhddx.cn/fe_demo/add/`, {
        //     method: 'POST',
        //     mode: 'cors',
        //     credentials: 'include',
        //     body: formData,
        //   }).then(function (response) {
        //     return response.json();
        //   })
        //     .then(result => {
        //       if (result.status === 0) {
        //         message.success("提交成功");
        //         this.state.mydata.push({ id: result.id, title: this.state.inputValue, content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) });

        this.setState({
            //   mydata: this.state.mydata,   
            visible: false,
            addList: false,
        });
        //         // store.dispatch(modalActionCreator(false));
        //       }
        //     });
    }
    // if (this.state.modifyList) {
    //   let formData = new FormData();
    //   formData.append('title', this.state.inputValue);
    //   formData.append('content', draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
    //   formData.append('id', this.state.mydata[this.state.inputIndex].id);

    //   fetch(`https://www.yhddx.cn/fe_demo/edit/`, {
    //     method: 'POST',
    //     mode: 'cors',
    //     credentials: 'include',
    //     body: formData,
    //   }).then(function (response) {
    //     return response.json();
    //   })
    //     .then(result => {
    //       if (result.status === 0) {
    //         message.success("修改成功");
    //         this.state.mydata[this.state.inputIndex].title = this.state.inputValue;
    //         this.state.mydata[this.state.inputIndex].content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

    //         this.setState({
    //           visible: false,
    //           modifyList: false,
    //           mydata: this.state.mydata,
    //         });
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });

    // }
    //   }

    showAddModal() {

        this.setState({
            visible: true,
            addList: true,
            inputValue: "",
            editorState: EditorState.createEmpty(),
        })
        // store.dispatch(modalActionCreator(true))
    }


    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showAddModal}>Add</Button>
                <RichText title="addtitle" visible={this.state.visible} handleCancel={this.handleCancel} handleOk={this.handleOk}/>
            </div>
        )
    }
}

export default Add;
