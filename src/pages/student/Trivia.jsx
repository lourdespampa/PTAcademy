import React from 'react'
import Trivia from '../../components/student/trivia/Trivia'
export default function Triviacompo() {
    return (
        <>
            <Trivia socketUrl={this.props.socketUrl} id_access={this.props.id_access}/>
        </>
    )
}
