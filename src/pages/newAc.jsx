import React from 'react';
import {
    Page,
    Link,
    Input,
    Button,
    Navbar,
    NavTitle,
    NavTitleLarge
} from 'framework7-react';

import { collection, addDoc } from "firebase/firestore";  //firestoreのための読み込み
import { firestore } from '../js/firebase'; //firebase接続のためのプログラム
import { useCollection } from 'react-firebase-hooks/firestore';

const NewAcc = ({ f7router }) => {
    const [inputName, setInputName] = React.useState("");
    const [inputPass, setInputPass] = React.useState("");

    const [value, loading, error] = useCollection(collection(firestore, 'user-base'),
        { snapshotListenOptions: { includeMetadataChanges: true } }
    );

    // ここに関数定義を書く
    const addNew = async () => {   //メモの保存ボタンを押したときに実行

        if (inputName == '') {  //入力欄が空の時
            alert('ユーザー名を入力してください！')
            return;
        }

        let docs = [];
        if (value) {
            docs = value.docs.slice();
            let num = docs.findIndex(e => e.data().user == inputName);
            if (num >= 0) {
                alert('そのユーザー名は既に存在しています。')
                return;
            }
        }

        if (inputPass == '') {  //パスワードが空の時
            alert('パスワードを入力してください！')
            return;
        }

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(firestore, "user-base"), {
            user: inputName,
            password: inputPass
        });

        f7router.navigate('/chatPage', {
            props: { myUserName: inputName }
        });

        console.log("Document written with ID: ", docRef.id);

    }

    const backPage = () => {
        f7router.back();
    }


    // returnのところに表示したい内容（タグ）を書く
    return (
        <Page>
            <Navbar large>
                <Button fill onClick={() => backPage()}>＜＜＜</Button>
                <NavTitle>アカウント新規作成</NavTitle>
                <NavTitleLarge>New Account</NavTitleLarge>
            </Navbar>
            <Input
                outline
                type="text"
                placeholder="ユーザー名"
                clearButton
                value={inputName}
                onChange={(event) => setInputName(event.target.value)}
            />
            <Input
                outline
                type="password"
                placeholder="パスワード"
                clearButton
                value={inputPass}
                onChange={(event) => setInputPass(event.target.value)}
            />
            <Button fill onClick={() => addNew()}>登録！！！</Button>
            <Input />
        </Page>
    );
}
export default NewAcc;
