
import React, { Component } from 'react';
import { createStore } from 'redux'
import { List, Typography, Skeleton, Tag } from 'antd';
import { Modal, Button, Popconfirm, message } from 'antd';
import { Input, Form, Icon, Checkbox, } from 'antd';
import './App.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';

function reducer(state = {
  visible: false,
}, action) {
  if (typeof state === "undefined") {
    return 0;
  }
  switch (action.type) {
    case 'SHOW':
      return {
        ...state,
        visible: true,
      }
    case 'HIDE':
      return {
        ...state,
        visible: false,
      }
    default:
      return console.log("default success");
  }
}

var store = createStore(reducer);

var modalActionCreator = function (isShow) {
  return {
    type: isShow ? 'SHOW' : 'HIDE',
  }
}

class Bloglist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mydata: [
        { title: "列表1标题" ,content: '列表1内容'},
        { title: "列表2标题" ,content: '列表2内容'}
      ],
      inputValue: "",
      inputIndex: undefined,
      visible: false,
      loginVisible: false,
      // modifyList: false,
      // editIdex: 1,
      // deleteIndex:1,
      // addList: false,
      // editorState: EditorState.createEmpty(),
      searchValue: "",
      userName: "",
    };

    // this.showAddModal = this.showAddModal.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
    // this.catchData = this.catchData.bind(this);
    // this.handleOk = this.handleOk.bind(this);
    // this.cancel = this.cancel.bind(this);
    // this.onEditorStateChange = this.onEditorStateChange.bind(this);
    // this.userLogin = this.userLogin.bind(this);
    // this.loginHandleCancel = this.loginHandleCancel.bind(this);
    // this.loginHandleOk = this.loginHandleOk.bind(this);
    // this.hideLogin = this.hideLogin.bind(this);
  };

  



  render() {
    const data = this.state.mydata.map(function (ele, index) {
      return ele.title;
    });
    return (
      <div>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={(item, idx) => {
            return (
              <List.Item actions={[<Edit editIdex={idx}/>,
                <Delete deleteIdex={idx}/>
              ]}>
              <Skeleton title={false} active loading={false}>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>)
          }
          }
        />
        <Add />
      </div>
        

    );
  }
}

export default Bloglist;
