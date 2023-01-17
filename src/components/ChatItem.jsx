import React from 'react';
import {
    Card,
    CardContent,
    CardFooter,
} from 'framework7-react';

const ChatItem = (props) => {
    let d = props.date
    let inputDate = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    let myorother;



    if (props.user == props.myUser) {

    } else {

    }

    return (

        // <Card>
        //     <CardContent>{props.text}</CardContent>
        //     <CardFooter>{inputDate}</CardFooter>
        // </Card>
        <>
            {
                props.user == props.myUser && (
                    <div className="right">
                        <div className='my'>
                            {props.text}
                        </div>

                        <br />
                        
                        <div className="Date">
                            {inputDate}
                        </div>
                    </div>
                )
            }

            {
                props.user != props.myUser && (
                    <div>
                        {props.user}
                        <br />

                        <div className='other'>
                            {props.text}
                        </div>

                        <br />

                        <div className="Date">
                            {inputDate}
                        </div>
                    </div>
                )
            }
            <br />
        </>

    );
}
export default ChatItem;