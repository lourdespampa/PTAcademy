import React from 'react'

export const TableBody = (props) => {
    return (
        <>
            {props.students.map(student=>(
                <tr key={student._id}>
                    <td className="nom" style={{width:"400px"}}>
                    {student.name_stu}
                    </td>
                    <td className="ape" style={{width:"400px"}}>
                    {student.lastName_stu}
                    </td>
                    <td className="nota" style={{textAlign:"center",width:'130px'}}>
                        {student.score}
                        <button onClick={()=>props.onClickNote(student._id,student.score)+ props.setShow('shownota',true)} className="button pull-right btnMyM material-icons">
                    edit
                    </button>
                    </td>
                    <td className="compo"style={{textAlign:"center",width:'150px'}}>
                    {student.conduct}
                    <button onClick={()=>props.onClick(student._id)+ props.setShow('showcomportamiento',true)} className="button pull-right btnMyM material-icons">
                    edit
                    </button>
                    </td>
                    <td style={{textAlign:"center",width:"160px"}}>
                    <button className="button btnMyM material-icons" onClick={()=>props.onClickPoint(student._id,student.point)+ props.setShow('showpuntosmas',true)} >
                    add_circle_outline
                    </button>
                    {student.point}
                    <button className="button btnMyM material-icons" onClick={()=>props.onClickPoint(student._id,student.point)+ props.setShow('showpuntosmenos',true)}>
                    remove_circle_outline
                    </button> 
                    </td>
                    <td style={{width:"80px"}}>
                    <button className="button btnMyM material-icons" onClick={()=>props.onClick(student._id)+ props.setShow('showdelete',true)}>
                    delete
                    </button> 
                    </td>
                    {/* <td className="nom">
                    {student.finalScore}
                    </td> */}
                </tr>
            ))}
        </>
    )
}
