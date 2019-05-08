import React, { Component } from "react";
import htmlToDraft from 'html-to-draftjs';
import RichText from './RichText'
import { EditorState } from 'draft-js';




class Edit extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            visible: false,
            // modifyList: false,
            // inputValue: this.state.mydata[idx].title,
            editorState: EditorState.createEmpty(),
            // inputIndex: idx,
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        // this.editList = this.editList.bind(this);
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    handleOk() {
        // console.log(this.state.addList, this.state.modifyList);
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
            // addList: false,
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

    editList(idx, e) {
        // console.log(htmlToDraft(this.state.mydata[idx].content));
        // const contentBlock = htmlToDraft(this.state.mydata[idx].content);
        // if (contentBlock) {
        //   const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        //   const editorState = EditorState.createWithContent(contentState);
        this.setState({
            visible: true,
            // modifyList: true,
            // inputValue: this.state.mydata[idx].title,
            // editorState: editorState,
            inputIndex: idx
        });
        console.log(this.state.inputIndex);
        // }

    }

    render() {
        console.log(this.props);
        let idex = this.props.editIdex
        return (
            <div>
                <a onClick={this.editList.bind(this,idex)}>edit</a>
                <RichText title="editTitle" visible={this.state.visible} handleCancel={this.handleCancel} handleOk={this.handleOk} />
            </div>
        )
    }
}

export default Edit;