import React, { Component } from "react";
import { Modal, Input } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';





class RichText extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);

        this.state = {
            visible: false,
            addList: false,
            inputTitle: "",
            editorState: EditorState.createEmpty(),
        }
        // this.catchData = this.catchData.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    catchTitle(e) {
        this.setState({
            inputTitle: e.target.value,
        });
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        let visible = this.props.visible
        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
            >
                <Input placeholder="Basic usage" onChange={this.catchTitle} value={this.state.inputTitle} />
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </Modal>
        )
    }
}

export default RichText;