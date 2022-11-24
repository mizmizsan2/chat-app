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
import { useCollection } from 'react-firebase-hooks/firestore';

const HomePage = () => {
    const [inputText, setInputText] = React.useState("");

    const addMemo = async () => {   //メモの保存ボタンを押したときに実行

        if (inputText == '') {  //入力欄が空の時
            alert('文字を入力してください！')
            return;
        }

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(firestore, "1-line-memo"), {
            text: inputText,
            date: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
    }

    const [value, loading, error] = useCollection(collection(firestore, '1-line-memo'),
        { snapshotListenOptions: { includeMetadataChanges: true } }
    );

    let docs = [];
    if (value) {
        docs = value.docs.slice(); // value.docsのコピーをつくる
        // docsの要素を日付順（逆順）に並び替え
        docs.sort((x, y) => y.data().date.toDate().getTime() - x.data().date.toDate().getTime());
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

            <Block>
                {error && <strong>エラー: {JSON.stringify(error)}</strong>}
                {loading && <span>メモデータ読み込み中...</span>}
                {value && (
                    <div>
                        {docs.map((doc) => (
                            <MemoItem key={doc.id} text={doc.data().text} date={doc.data().date.toDate()}></MemoItem>
                        ))}
                    </div>
                )}
            </Block>



        </Page >
    )
};
export default HomePage;