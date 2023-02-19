import logo from './logo.svg';
import './App.css';
//State를 쓰기 위해서는 import 해줘야함
import {useState} from 'react';
import Login from "./Login";
import SelectSignup from './SelectSignup';
import Signup from './Signup';
import { Route, Link } from 'react-router-dom';

function Alarm(props) {
  return <a class="nav-link alarm" href="/" onClick={function(event){
    event.preventDefault();
    props.onChangeMode();
  }}>알람</a>
}
function Header(props) {
  return <header>
    <h1 class="header-style"><a class="header-link" href="/" onClick={(event)=>{
      event.preventDefault(); //기본동작 방지 => 클릭해도 reload 일어나지 않음
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props) {
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li class="nav-item" key={t.id}>
      <a class="nav-link" id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)); //event를 발생시키는 target(a태그)의 id
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol class="nav-list">
      {lis}
    </ol>
  </nav>
}
function Article(props) {
  return <article>
    <h2 class="content-title">{props.title}</h2>
    {props.body}
  </article>
}
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={(event)=>{
      //form 태그는 submit을 하면, 페이지가 reload됨
      event.preventDefault();
      //form태그의 title과 body의 value값을 props를 통해
      //onCreate함수로 넘겨준다.
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}
function App() {
  // const _mode = useState('WELCOME'); //useState는 state의 초기값 
  // console.log('_mode', _mode) => 총 두가지의 값이 나옴
  // const mode = _mode[0]; //상태의 값을 읽을 때 쓰는 데이터
  // const setMode = _mode[1]; //상태의 값을 변경할 때 쓰는 함수
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'로그인', body:<Login/>},
    {id:2, title:'회원가입', body:<SelectSignup/>},
  ])
  

  //tab의 기본값을 null로 세팅
  const [color, setColor] = useState('black');
  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="내 자녀 OOO의 승하차 여부" body=
    <div class="bus-box">
      <img className={`bus-img ${color === 'blue' ? 'active' : ''} ${color === 'green' ? 'deactive' : ''} `} src="assets/img/bus.png" />
      <div>
        <button onClick={()=>setColor('green')}>승차</button>
        <button onClick={()=>setColor('blue')}>하차</button>
      </div>
    </div>>
  </Article>
  } else if(mode === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      } 
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'CREATE') {
    content = <Create onCreate={(title, body)=>{
      const newTopic = {id:nextId, title:title, body:body}
      //바깥쪽이 배열이므로 배열을 복제
      const newTopics = [...topics]
      //복제한 newTopics에 newTopic을 push
      newTopics.push(newTopic)
      //setTopics를 newTopics로 바꿔줌
      setTopics(newTopics);

      //글의 상세페이지로 이동
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } 
  return (
    <div className="App">
      <div class="navbar">
        <div>
          <Header title="갤로퍼" onChangeMode={()=>{
            setMode('WELCOME');
          }}></Header>
        </div>
        <div class="flex">
          <Nav topics={topics} onChangeMode={(id)=>{
            setMode('READ');
            setId(id);
          }}></Nav>
          <Alarm onChangeMode={function(){
            alert('당신의 자녀에게 위험한 일이 생겼습니다!');
          }}>알람</Alarm>
        </div>
      </div>
      <div class="content">
        {content}
      </div>
    </div>
  );
}

export default App;
