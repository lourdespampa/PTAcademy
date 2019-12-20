import React from 'react'

export const TableBody = (props) => {
    return (
        <>
            {props.students.map(student=>(
                <tr key={student._id}>
                    <td className="nom" style={{width:"400px"}}>
                    {student.first_name}
                    </td>
                    <td className="ape" style={{width:"400px"}}>
                    {student.last_name}
                    </td>
                    <td className="nota"style={{textAlign:"center",width:'130px'}}>
                        {student.calific}10
                        <button onClick={()=>props.onClickNote(student._id,student.nota)+ props.setShow('shownota',true)} className="button pull-right btnMyM material-icons">
                    edit
                    </button>
                    </td>
                    <td className="compo"style={{textAlign:"center",width:'150px'}}>
                    {student.comportamiento}A
                    <button onClick={()=>props.onClick(student._id)+ props.setShow('showcomportamiento',true)} className="button pull-right btnMyM material-icons">
                    edit
                    </button>
                    </td>
                    <td style={{textAlign:"center",width:"160px"}}>
                    <button className="button btnMyM material-icons" onClick={()=>props.onClickPoint(student._id,student.puntos)+ props.setShow('showpuntosmas',true)} >
                    add_circle_outline
                    </button>
                    {student.puntos}12
                    <button className="button btnMyM material-icons" onClick={()=>props.onClickPoint(student._id,student.puntos)+ props.setShow('showpuntosmenos',true)}>
                    remove_circle_outline
                    </button> 
                    </td>
                    <td style={{width:"80px"}}>
                    <button className="button btnMyM material-icons" onClick={()=>props.onClick(student._id)+ props.setShow('showdelete',true)}>
                    delete
                    </button> 
                    </td>
                </tr>
            ))}
        </>
    )
}
