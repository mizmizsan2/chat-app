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

const HomePage = ({ f7router }) => {
    const [inputName, setInputName] = React.useState("");
    const [inputPass, setInputPass] = React.useState("");

    const [value, loading, error] = useCollection(collection(firestore, 'user-base'),
        { snapshotListenOptions: { includeMetadataChanges: true } }
    );

    const addAcc = async () => {   //メモの保存ボタンを押したときに実行

        let docs = [];
        if (value) {
            docs = value.docs.slice();
            let num = docs.findIndex(e => e.data().user == inputName);
            if (num >= 0) {
                if (docs[num].data().password == inputPass) {
                    alert('ログイン成功')
                    f7router.navigate('/chatPage', {
                        props: { myUserName: inputName }
                    });
                    return ;
                }
            }
        }

        alert('ログインできませんでした');

        // console.log("Document written with ID: ", docRef.id);

    }

    // const [value, loading, error] = useCollection(collection(firestore, '1-line-memo'),
    //     { snapshotListenOptions: { includeMetadataChanges: true } }
    // );

    const navigateNew = () => {
        f7router.navigate('/newAccount');
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

            <Button fill onClick={() => addAcc()}>ログイン</Button>
            <br />
            <div>↓アカウントを持っていない場合...</div>
            <Button fill onClick={() => navigateNew()}>ユーザー新規登録</Button>


        </Page >
    )
};
export default HomePage;