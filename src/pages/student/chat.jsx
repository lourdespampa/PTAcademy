import React from 'react'
import Test3 from '../../components/student/chat/chat_stud'

export default function Chat(props) {
    return (
        <div>
            <Test3 socketUrl={props.socketUrl} id_access={props.id_access} name={props.name} lastName={props.lastName} />
        </div>
    )
}
