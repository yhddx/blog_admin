import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Detail.less';
import { element } from 'prop-types';
import {get_api_host} from './utils';



class Detail extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:{
                status:1,
                message:'',
                article:{},
            }
        }
    }
    componentDidMount() {
        let path=parseInt(this.props.match.params.number, 10);

        fetch(`${get_api_host()}/detail/${path}`,{
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            // body: JSON.stringify(idx),
          }).then(function (response) {
                return response.json();
            })
            .then( (myJson) => {
                console.log(myJson)               
                this.setState({
                    data:myJson,
                });
            });
    }

    render() {
        let list = [
            {title: "abc"},
            {title: "def"},
        ]
        return (
            <div className="articlDetail">
                <h1 className="articleTitle">{this.state.data.article.title}</h1>
                <div className="articlecontent" dangerouslySetInnerHTML={{__html: this.state.data.article.content}}></div>
                <Link to='/list'>Back</Link>
                {list.map((element,index)=>{return <p key={index}>{element.title}</p>})}
            </div>
        )
    }
}

const saveListData = (payload) => {
    return {
        type: 'DETAIL',
        payload,
    }
}

const mapStateToProps = (state) => {
    return {
        article: state.detailReducer.article,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        success: (data) => {
            dispatch(saveListData(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
// export default Detail;