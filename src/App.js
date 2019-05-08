import React, { Component } from 'react';
// import './App.css';
import  styles from './App.module.less';
import './App.less';
import listIcon from './image/list.png';
import homeIcon from './image/home.png';
import { Switch, Route, Link } from 'react-router-dom';
import Bloglist from './Bloglist';
import Detail from './Detail';

console.log(styles.introduction);
const Home = () => (
  <div className="introduction">
    <blockquote>
      洋槐朵朵笑的博客
              <p className={styles.line1}>人生就像峡谷里的一粒种子。</p>
      <p className={styles.line2}>只有顽强拼搏，努力生长，才能长出峡谷，看见阳光，</p>
      <p className={styles.line3}>如果放弃，那么就会永远看不见阳光。</p>
    </blockquote>
  </div >
)


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/list' component={Bloglist} />
      <Route path='/detail/:number' component={Detail} />
    </Switch>
  </main>
)
const Header = () => (
  <header>
    <nav>
      <ul className={styles.icon}>
        <li><Link to='/'><img className={styles.home} src={homeIcon} alt="homeIcon" /></Link></li>
        <li><Link to='/list'><img className={styles.list} src={listIcon} alt="listIcon" /></Link></li>
      </ul>
    </nav>
  </header>
)

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
