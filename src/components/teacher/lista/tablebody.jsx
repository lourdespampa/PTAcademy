import React from 'react'

export const TableBody = (props) => {
    return (
        <>
            {props.students.map(student => (
                <tr key={student._id}>
                    <td className="nom" style={{ width: "80px" }}>
                        {student.name_stu}
                    </td>
                    <td className="ape" style={{ width: "80px" }}>
                        {student.lastName_stu}
                    </td>
                    <td className="nota" style={{ textAlign: "center", width: '80px' }}>
                        {student.score}
                        <button onClick={() => props.onClickNote(student._id, student.score) + props.setShow('shownota', 1)} className="button pull-right btnMyM material-icons">
                            edit
                    </button>
                    </td>
                    <td className="compo" style={{ textAlign: "center", width: '50px' }}>
                        {student.conduct}
                        <button onClick={() => props.onClick(student._id) + props.setShow('showcomportamiento', 1)} className="button pull-right btnMyM material-icons">
                            edit
                    </button>
                    </td>
                    <td style={{ textAlign: "center", width: "80px" }}>
                        <button className="button btnMyM material-icons" onClick={() => props.onClickPoint(student._id, student.point) + props.setShow('showpuntosmas', 1)} >
                            add_circle_outline
                    </button>
                        {student.point}
                        <button className="button btnMyM material-icons" onClick={() => props.onClickPoint(student._id, student.point) + props.setShow('showpuntosmenos', 1)}>
                            remove_circle_outline
                    </button>
                    </td>
                    <td style={{ width: "50px" }}>
                        <button className="button btnMyM material-icons" onClick={() => props.onClick(student._id) + props.setShow('showdelete', 1)}>
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
