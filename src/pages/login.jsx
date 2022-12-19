import React from 'react';
import {
    Page,
    Link,
    Input,
    Navbar,
    NavTitle,
    NavTitleLarge
} from 'framework7-react';
const LoginPage = ({ props, f7router }) => {
    const [inputName, setInputName] = React.useState("");
    const [inputPass, setInputPass] = React.useState("");
    
    // ここに関数定義を書く
    // ここにそのコンポーネントでやりたい処理内容を必要に応じて書く
    // returnのところに表示したい内容（タグ）を書く
    return (
        <Page>
            <Navbar large>
                <NavTitle>ログイン画面</NavTitle>
                <NavTitleLarge>login</NavTitleLarge>
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
                type="text"
                placeholder="パスワード"
                clearButton
                value={inputPass}
                onChange={(event) => setInputPass(event.target.value)}
            />
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            <Input />
        </Page>
    );
}
export default LoginPage;
