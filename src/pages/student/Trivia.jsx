import React from 'react'
import Trivia from '../../components/student/trivia/Trivia'
export default function Triviacompo(props) {
    return (
        <>
            <Trivia socketUrl={props.socketUrl} id_access={props.id_access}/>
        </>
    )
}
