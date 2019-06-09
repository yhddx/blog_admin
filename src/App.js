import React, { Component } from 'react';
// import './App.css';
import './App.less';
import listIcon from './image/list.png';
import homeIcon from './image/home.png';
import centerIcon from './image/menu.png';
import pictureIcon from './image/picture.png';
import logoutIcon from './image/logout.png';

import { Switch, Route, Link } from 'react-router-dom';
import { Router } from 'react-router'
import Bloglist from './Bloglist';
import Detail from './Detail';
import Register from './Register';
import Login from './Login';
import Picture from './Picture';
import { connect } from 'react-redux';
import { Avatar, Menu, Dropdown, Icon, Button } from 'antd';
import { number } from 'prop-types';
import { createHashHistory } from 'history';
import {get_api_host} from './utils';

let userId = number;
let userName = '';

const Home = () => (
  <div className="introduction">
    <blockquote>
      洋槐朵朵笑的博客
              <p className="line1">人生就像峡谷里的一粒种子。</p>
      <p className="line2">只有顽强拼搏，努力生长，才能长出峡谷，看见阳光，</p>
      <p className="line3">如果放弃，那么就会永远看不见阳光。</p>
    </blockquote>
  </div >
)

class Main extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" >
            {this.props.userId}
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" >
            {this.props.userName}
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={this.props.logout} >
            注销
          </a>
        </Menu.Item>
      </Menu>
    );
    const loginButton =
      this.props.userId > 0 ?
        <Dropdown overlay={menu} className="dropdown">
          <a className="ant-dropdown-link" href="#">
            <Avatar icon="user" style={{ backgroundColor: '#87d068' }} />
            <Icon type="down" />
          </a>
        </Dropdown>
        : <Button className="dropdown" type="primary"><Link to='/login/'>登录</Link></Button>
      ;
    return (
      <main>
        <div className="dropdown-outwrapper">
          <div className="dropdown-wrapper">
            {loginButton}
            {/* <Button className="dropdown" type="primary"><Link to='/picture/'>上传</Link></Button> */}
          </div>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/list' component={Bloglist} />
          <Route path='/detail/:number' component={Detail} />
          <Route path='/register/' component={Register} />
          <Route path='/login/' component={Login} />
          <Route path='/picture/' component={Picture} />
        </Switch>
      </main>
    )
  }
}




class Header extends Component {

  render() {
    // console.log('header')
    return (
      <header>
        <nav>
          {/* <ul className="icon">
            <li><Link to='/'><img className="home" src={homeIcon} alt="homeIcon" /></Link></li>
            <li><Link to='/list'><img className="list" src={listIcon} alt="listIcon" /></Link></li>
          </ul> */}
          <div className="icon-rotate">
            <div className="center-rotate">
              <img src={centerIcon} />
            </div>
            <div className="one-rotate animation">             
                <Link to='/'>
                <img className="home" src={homeIcon} alt="homeIcon" />
                </Link>          
            </div>
            {/* <div className = "two-rotate animation"></div> */}
            <div className = "three-rotate animation">
            <Link to='/picture/'>
              <img src={logoutIcon} />              
              </Link>
            </div>
            
            {/* <div className="four-rotate animation"> </div> */}
            <div className = "five-rotate animation">
            <Link to='/picture/'>
              <img src={pictureIcon} />              
              </Link></div>
            {/* <div className = "six-rotate animation"></div> */}
            <div className="seven-rotate animation">
                <Link to='/list'><img className="list" src={listIcon} alt="listIcon" /></Link>
            </div>
            {/* <div className = "eghit-rotate animation"></div> */}
          </div>
        </nav>
      </header>
    )
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      userData: {
      }
    }
  }
  componentDidMount() {
    this.userInfo();
    // userName = this.props.userData.username;
    // userId = this.props.userData.id;
  }

  userInfo() {
    fetch(`${get_api_host()}/userinfo/`, {
      method: 'POST',
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
        if (myJson.status === 9) {
          console.log(this.props);
          // this.props.history.push({pathname:"/login/"});
          createHashHistory().push({ pathname: "/login/" })

          // this.setState({
          //   login:false,
          // })
          return;
        }
        if (myJson.status === 0) {
          this.setState({});
          this.props.success(myJson);
          // console.log(myJson);
        }
      });
  }

  logout() {
    fetch(`${get_api_host()}/logout/`, {
      method: 'POST',
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

        if (myJson.status === 0) {
          console.log('logout', myJson);
          this.setState({
            login: false,
            userData: {},
          });
          createHashHistory().push({ pathname: '/login/' })
          this.props.success(myJson);
          // this.setState({
          //   count: myJson.count,
          //   pages: Math.ceil(myJson.count / numPerPage),
          //   pageIndex: page,
          // })
        }
      });
  }


  render() {
    let username = this.props.userData.userName;
    let userid = this.props.userData.userId;
    return (
      <div>
        <Header />
        <Main
          userName={this.props.userData.userName}
          userId={this.props.userData.userId}
          logout={this.logout.bind(this)}
          logStatus={this.state.login}
        />
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
      dispatch(saveUserData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

