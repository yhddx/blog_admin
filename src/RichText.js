import React, { Component } from "react";
import { Modal, Input } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState,convertToRaw, ContentState } from 'draft-js';


class RichText extends Component {
    render() {
        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
            >
                <Input placeholder="Basic usage" onChange={this.props.titleOnChange} value={this.props.inputTitle} />
                <Editor
                    editorState={this.props.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.props.contentOnChange}
                />
            </Modal>
        )
    }
}

export default RichText;