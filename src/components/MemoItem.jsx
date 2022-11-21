import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
} from 'framework7-react';

const MemoItem = (props) => {
    return (
        <Card>
            <CardContent>{props.text}</CardContent>
            <CardFooter>{props.date}</CardFooter>
        </Card>
    );
}
export default MemoItem;