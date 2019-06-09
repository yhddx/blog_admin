import React, { Component } from "react";
import { Popconfirm, message} from 'antd';




class Delete extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    cancel(e) {
      message.error('Click on No');
    }

    confirm(idx, e) {
        let formData = new FormData();
        formData.append('id', this.state.mydata[idx].id);
    
        fetch(`https://www.yhddx.cn/fe_demo/delete/`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: formData,
        }).then(function (response) {
          return response.json();
        })
          .then(result => {
            if (result.status === 0) {
              message.success("删除成功");
              this.state.mydata.splice(idx, 1);
              this.setState({
                mydata: this.state.mydata
              })
            }
          });
      }


    render() {
        let idx = this.props.deleteIndex;
        return (
            <Popconfirm title="Are you sure delete this task?" onConfirm={this.props.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                <a href="#">Delete</a>
            </Popconfirm>
        )
    }
}

export default Delete;

