import React from 'react'
import Board from '../../components/student/pizarra/board'

export default function pizarra(props) {
    return (
        <div className="fondoAlumno">
            <Board socketUrl={props.socketUrl} id_access={props.id_access}></Board>
        </div>
    )
}
