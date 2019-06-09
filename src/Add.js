import React, { Component } from "react";
import RichText from './RichText';

class Add extends Component {
    render() {
        return (
            <div>             
                <RichText title="addtitle" inputTitle="" content="" editorState={this.props.editorState} visible={this.props.visible} handleCancel={this.props.handleCancel} handleOk={this.props.handleOk} titleOnChange={this.props.titleOnChange} contentOnChange={this.props.contentOnChange} />
            </div >
        )
    }
}

export default Add;
