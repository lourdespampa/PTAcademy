import React from 'react'
import Temp from '../../components/student/temporizador/temporizador'

export default function Temporizador(props) {
    return (
        <div className="fondoAlumno">
            <Temp socketUrl={props.socketUrl} id_access={props.id_access}/>
        </div>
    )
}
