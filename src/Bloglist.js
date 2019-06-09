
import React, { Component } from 'react';
import { List, Button, Skeleton, message } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import Detail from './Detail';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Bloglist.css';
import {get_api_host} from './utils';

var classNames = require('classnames');


const numPerPage = 4;


class Articlelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      richTextTag: false,//false表示edit，true表示add
      visible: false,
      loginVisible: false,
      searchValue: "",
      userName: "",
      editorState: EditorState.createEmpty(),
      editArticle: {
        number: 0,
        title: "",
        content: '',
      },
      count: 0,
      pages: 1,
      pageIndex: 0,
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.titleOnChange = this.titleOnChange.bind(this);
    this.contentOnChange = this.contentOnChange.bind(this);
    this.showAddModal = this.showAddModal.bind(this);

  }


  componentDidMount() {
    this.pageOnClick(0);
  }

  handleCancel() {
    this.setState({
      visible: false
    });
  }

  handleOk() {
    if (this.state.richTextTag) {//add
      let articlesArray = this.props.articles;
      articlesArray.push(this.state.editArticle);
      let handleOkAction = {
        status: 0,
        message: "",
        articles: articlesArray,
      }
      fetch(`${get_api_host()}/add/${this.state.editArticle.number}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.editArticle),

      }).then(function (response) {
        return response.json();
      })
        .then(myJson => {
          if(myJson.status === 9){
            this.props.history.push({pathname:"/login/"});
            return;
          }
          if (myJson.status === 0) {
            this.state.editArticle.number = myJson.article.number;
            message.success("增加成功");
            this.setState({
              visible: false,
              editArticle: this.state.editArticle,
            });
            this.props.savelist(handleOkAction);

          }
        });
    }
    else {

      let articlesArray = this.props.articles;
      let editArticlesIndex;
      articlesArray.forEach(article => {
        if (article.number == this.state.editArticle.number) {
          article.title = this.state.editArticle.title;
          article.content = this.state.editArticle.content;
        }
      });
      // articlesArray.splice(editArticlesId, 1, this.state.editArticle);
      let handleOkAction = {
        status: 0,
        message: "",
        articles: articlesArray,
      }
      fetch(`${get_api_host()}/edit/${this.state.editArticle.number}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.editArticle),

      }).then(function (response) {
        return response.json();
      })
        .then(myJson => {
          if(myJson.status === 9){
            this.props.history.push({pathname:"/login/"});
            return;
          }
          if (myJson.status === 0) {
            message.success("修改成功");
            this.setState({
              visible: false,
              editArticle: this.state.editArticle,
            });
             this.props.savelist(handleOkAction);
          }
        });
    }
  }


  editList(idx, e) {
    fetch(`${get_api_host()}/detail/${idx}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:idx,
      }),

    }).then(function (response) {
      return response.json();
    })
      .then((myJson) => {
        if(myJson.status === 9){
          this.props.history.push({pathname:"/login/"});
          return;
        }
        this.state.editArticle = myJson.article;
        const contentBlock = htmlToDraft(this.state.editArticle.content);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.setState({
            visible: true,
            editorState: editorState,
            richTextTag: false,//false表示edit，true表示add
          });
        }
      });
  }


  titleOnChange(e) {
    let value = e.target.value;
    let newArticle = Object.assign({}, this.state.editArticle, { title: value });
    this.setState({
      editArticle: newArticle,
    });
  }

  contentOnChange(editorState) {
    let newContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    let newArticle = Object.assign({}, this.state.editArticle, { content: newContent });
    this.setState({
      editorState: editorState,
      editArticle: newArticle,
    });
  };

  showAddModal() {
    this.setState({
      visible: true,
      addList: true,
      richTextTag: true,//false表示edit，true表示add
      editorState: EditorState.createEmpty(),
      editArticle: {
        number: 0,
        title: "",
        content: '',
      },
    })
  }



  deleteConfirm(idx, e) {
    let articlesArray = this.props.articles;
    const number = this.props.articles[idx].number;
    articlesArray.splice(idx, 1);
    let deleteConfirmAction = {
      status: 0,
      message: "",
      articles: articlesArray,
    }
    fetch(`${get_api_host()}/delete/`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number:number,
      }),
    }).then(function (response) {
      return response.json();
    })
      .then(myJson => {
        if(myJson.status === 9){
          this.props.history.push({pathname:"/login/"});
          return;
        }
        if (myJson.status === 0) {
          message.success("删除成功");
          this.setState({
          });
         this.props.savelist(deleteConfirmAction);
        }
      });

  }

  pageOnClick(page) {
    fetch(`${get_api_host()}/list/?page=${page}`,{
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
      .then((myJson) => {
        if(myJson.status === 9){
          this.props.history.push({pathname:"/login/"});
          return;
        }
        if (myJson.status === 0) {
          // console.log("list props", this.props);
          this.props.savelist(myJson);
          this.setState({
            count: myJson.count,
            pages: Math.ceil(myJson.count / numPerPage),
            pageIndex: page,
          })
        }
      });
  }

  render() {
    let pageArray = [];
    pageArray.push(<a className="page-link" key='first' onClick={this.pageOnClick.bind(this, 0)}>首页</a>);

    for (let i = 0; i < this.state.pages; i++) {
      if (this.state.pageIndex - i > -3 && this.state.pageIndex - i < 3 || i == 0 || i == this.state.pages - 1) {
        let className = classNames({ 'page-link': true }, { 'page-link-active': i == this.state.pageIndex });

        // let className = i == this.state.pageIndex? "page-link page-link-active":"page-link";
        pageArray.push(<a className={className} key={i} onClick={this.pageOnClick.bind(this, i)}>{i + 1}</a>);
      } else {
        if (this.state.pageIndex - i == -3 || this.state.pageIndex - i == 3) {
          pageArray.push(<span className="page-ignore" key={i} >...</span>);
        }
      }
    }
    pageArray.push(<a className="page-link" key='last' onClick={this.pageOnClick.bind(this, this.state.pages - 1)}>末页</a>);

    return (
      <div className="articlelist-wrapper abc">
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={this.props.articles}//利用redux从this.props属性中获取articles数据
          renderItem={(item, idx) => {
            return (
              <List.Item actions={[
                <a onClick={this.editList.bind(this, item.number)}>edit</a>,
                <Delete deleteIdex={idx} confirm={this.deleteConfirm.bind(this, idx)} />
              ]}>
                <Skeleton title={false} active loading={false}>
                  <List.Item.Meta
                    title={<Link to={`/detail/${item.number}`}>{item.title}</Link>}
                    description=""
                  />
                  <div className="bloglist-content" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </Skeleton>
              </List.Item>)
          }
          }
        />
        <Button type="primary" onClick={this.showAddModal} className="addButton">Add</Button>
        <Add editorState={this.state.editorState} visible={this.state.visible} handleCancel={this.handleCancel} handleOk={this.handleOk} titleOnChange={this.titleOnChange} contentOnChange={this.contentOnChange} />
        <Edit editArticle={this.state.editArticle} editorState={this.state.editorState} visible={this.state.visible} handleCancel={this.handleCancel} handleOk={this.handleOk} titleOnChange={this.titleOnChange} contentOnChange={this.contentOnChange} />
        <div className="page">{pageArray}</div>
      </div>
    );
  }
}

class Bloglist extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
  }
  render() {
    // console.log(this.props);
    return (
      <div className="bloglist">
        <div className="bloglist-wrapper">
          <Switch>
            <Route exact path='/list' render={() => {
              return <Articlelist {...this.props} />
            }} />
            <Route path='/detail/:number' component={Detail} />
          </Switch>
        </div>
      </div>
    )
  }
}
const saveListData = (payload) => {
  return {
    type: 'SAVELIST',
    articles: payload.articles,
  }
}

const mapStateToProps = (state) => {
  // console.log("list state:", state.listReducer)
  return { articles: state.listReducer.articles };
};

const mapDispatchToProps = (dispatch) => {
  return {
    savelist: (data) => {
      console.log("dispatch savelist", data);
      dispatch(saveListData(data))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bloglist);
