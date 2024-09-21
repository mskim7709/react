import { useState } from 'react';
import './App.css';

function Header(props) {
  return <header>
    <h1>{props.title}</h1>
  </header>
}
function Body(props) {
  const lis = [];
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={/read/+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></li>);
  }
  return (
    <ul>
      {lis}
    </ul>
  );
}
function Bottom(props) {
  return (
    <>내용 : {props.body}
    </>
  );
}
function Create(props) {
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onCreate(title, body);
    }}>
      <p> 제목 : <input type='text' name='title' placeholder='title'></input></p>
      <p> 내용 : <input type='text' name='body' placeholder='body'></input></p>
      <p><input type='submit' value='저 장'></input></p>
    </form>
  );
}

function App() {
  const [type, setType] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(7);
  const [topics, setTopics] = useState([
    {id:0, title:'보험료', body:'각종 보혐료 납부'},
    {id:1, title:'세금계산서', body:'세금계산서 발행'},
    {id:2, title:'카드값', body:'카드값 납부'},
    {id:3, title:'공과금', body:'공과금 납부'},
    {id:4, title:'월세', body:'월세 입금'},
    {id:5, title:'소득세', body:'소득세 납부'},
    {id:6, title:'지방세', body:'지방세 납부'},
    {id:7, title:'국세', body:'국세 납부.....'}
  ]);

  let content = '';
  let create = '';

  if(type === 'WELCOME') {
    create = <p><input type='button' value='Create' onClick={()=>{
      setType('CREATE');
    }}></input></p>
  } else if(type === 'READ') {
    for(let i=0; i<topics.length; i++) {
      let t = topics[i];
      if(t.id === id) {
        content = <Bottom title={t.title} body={t.body}></Bottom>
      }
    }
    create = <p><input type='button' value='Create' onClick={()=>{
      setType('CREATE');
    }}></input></p>
  } else if(type === 'CREATE') {
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body};
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setType('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }

  return (
    <div>
      <Header title="[나의 할일]" onChangeMode={()=>{
      }}></Header>
      <Body topics={topics} onChangeMode={(_id)=>{
        setType('READ');
        setId(_id);
      }}></Body>
      <br></br>{content}
      {create}
    </div>
  );
}

export default App;
