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

import { collection, addDoc } from "firebase/firestore";  //firestoreのための読み込み
import { firestore } from '../js/firebase'; //firebase接続のためのプログラム
import { useCollection } from 'react-firebase-hooks/firestore';

const HomePage = ({ props, f7router }) => {
    const [inputName, setInputName] = React.useState("");
    const [inputPass, setInputPass] = React.useState("");

    const addNew = async () => {   //メモの保存ボタンを押したときに実行

        if (inputName == '') {  //入力欄が空の時
            alert('ユーザー名を入力してください！')
            return;
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

        f7router.navigate('/chatPage');

        console.log("Document written with ID: ", docRef.id);

    }

    // const [value, loading, error] = useCollection(collection(firestore, '1-line-memo'),
    //     { snapshotListenOptions: { includeMetadataChanges: true } }
    // );

    const navigateLogin = () => {
        f7router.navigate('/LoginPage');
    }


    return (
        <Page name="home">
            {/* Top Navbar */}
            <Navbar large>
                <NavTitle>ホーム</NavTitle>
                <NavTitleLarge>ホーム</NavTitleLarge>
            </Navbar>

            {/* Page content */}
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
                type="text"
                placeholder="パスワード"
                clearButton
                value={inputPass}
                onChange={(event) => setInputPass(event.target.value)}
            />

            <Button fill onClick={() => navigateLogin()}>ログイン</Button>
            <Button fill onClick={() => addNew()}>ユーザー新規登録</Button>


        </Page >
    )
};
export default HomePage;