import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
} from 'framework7-react';

const MemoItem = (props) => {
    let d = props.date
    let inputDate = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

    return (
        <Card>
            <CardContent>{props.text}</CardContent>
            <CardFooter>{inputDate}</CardFooter>
        </Card>
    );
}
export default MemoItem;