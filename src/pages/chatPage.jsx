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
import ChatItem from '../components/ChatItem';

import { collection, addDoc } from "firebase/firestore";  //firestoreのための読み込み
import { firestore } from '../js/firebase'; //firebase接続のためのプログラム
import { useCollection } from 'react-firebase-hooks/firestore';

const ChatPage = (props) => {
    // console.log(props);

    const [inputText, setInputText] = React.useState("");

    const addMemo = async () => {   //メモの保存ボタンを押したときに実行

        if (inputText == '') {  //入力欄が空の時
            alert('文字を入力してください！')
            return;
        }

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(firestore, "chat-block"), {
            user: props.myUserName,
            text: inputText,
            date: new Date()
        });

        setInputText('');
        
        console.log("Document written with ID: ", docRef.id);
        
    }

    const [value, loading, error] = useCollection(collection(firestore, 'chat-block'),
        { snapshotListenOptions: { includeMetadataChanges: true } }
    );

    let docs = [];
    if (value) {
        docs = value.docs.slice(); // value.docsのコピーをつくる
        // docsの要素を日付順（逆順）に並び替え
        docs.sort((y, x) => y.data().date.toDate().getTime() - x.data().date.toDate().getTime());
        
    }

    return (
        <Page name="home">
            {/* Top Navbar */}
            <Navbar large>
                <NavTitle>チャット欄</NavTitle>
                <NavTitleLarge>chat</NavTitleLarge>
            </Navbar>

            {/* Page content */}

            <header>
                {props.myUserName}としてチャットに参加
            </header>

            <Block>
                {error && <strong>エラー: {JSON.stringify(error)}</strong>}
                {loading && <span>メモデータ読み込み中...</span>}
                {value && (
                    <div>

                        {docs.map((doc) => (
                            <ChatItem key={doc.id} user={doc.data().user} text={doc.data().text} date={doc.data().date.toDate()} myUser={props.myUserName}></ChatItem>
                        ))}
                    </div>
                )}
            </Block>

            <footer>
                <Input
                    outline
                    type="text"
                    placeholder="「最近どうしてる？」"
                    clearButton
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                />

                <Button onClick={() => addMemo()}>送信</Button>
            </footer>


        </Page >
    )
};
export default ChatPage;