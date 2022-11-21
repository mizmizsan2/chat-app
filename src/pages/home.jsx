import React from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Block,
  Input,
  Button,
} from 'framework7-react';
import MemoItem from '../components/MemoItem';

import { collection, addDoc } from "firebase/firestore";  //firestoreのための読み込み
import { firestore } from '../js/firebase'; //firebase接続のためのプログラム

const HomePage = () => {
  const [inputText, setInputText] = React.useState("");
  const [memoList, setMemoList] = React.useState([]);

  const addMemo = async () => {
    let d = new Date();
    let inputDate = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    let newlist = [{ text: inputText, date: inputDate }, ...memoList];
    setMemoList(newlist);

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(firestore, "1linememo"), {
      text: inputText,
      date: `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` 
    });
    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar large>
        <NavTitle>メモ</NavTitle>
        <NavTitleLarge>memo</NavTitleLarge>
      </Navbar>

      {/* Page content */}
      <Input
        outline
        type="text"
        placeholder="メモを入力"
        clearButton
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      />

      <Button onClick={() => addMemo()}>記録</Button>

      <Block strong>
        {memoList.map(item => <MemoItem text={item.text} date={item.date}></MemoItem>)}
      </Block>

    </Page>
  )
};
export default HomePage;