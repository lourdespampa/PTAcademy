import React, { Component } from 'react'

export default class TableStudentPrivate extends Component {
  render() {
    return (
      <div>
        <table
          id="tabla_usuarios"
          className="table table-bordered table-striped table-hover dataTable js-exportable"
        >
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Nombres</th>
              <th style={{ textAlign: "center" }}>Apellidos</th>
              <th style={{ textAlign: "center", width: "15%" }}>
                Nota(0-20)
                        </th>
              <th style={{ textAlign: "center", width: "20%" }}>
                Comportamiento
                        </th>
              <th style={{ textAlign: "center", width: "15%" }}>
                Puntos
                        </th>
              <th style={{ textAlign: "center", width: "5%" }}>
                ...
                        </th>
            </tr>
          </thead>
          <tbody style={{ height: "350px" }}>
            {this.props.students ? (
              this.props.students.map(student => (
                <tr key={student._id}>
                  <td className="nom" style={{ width: "80px" }}>
                    {student.name_stu}
                  </td>
                  <td className="ape" style={{ width: "80px" }}>
                    {student.lastName_stu}
                  </td>
                  <td className="nota" style={{ textAlign: "center", width: '80px' }}>
                    {student.score}
                    <button onClick={() => this.props.onClickNote(student._id, student.score) + this.props.setShow('shownota', 1)} className="button pull-right btnMyM material-icons">
                      edit
                                </button>
                  </td>
                  <td className="compo" style={{ textAlign: "center", width: '50px' }}>
                    {student.conduct}
                    <button onClick={() => this.props.onClick(student._id) + this.props.setShow('showcomportamiento', 1)} className="button pull-right btnMyM material-icons">
                      edit
                                </button>
                  </td>
                  <td style={{ textAlign: "center", width: "80px" }}>
                    <button className="button btnMyM material-icons" onClick={() => this.props.onClickPoint(student._id, student.point) + this.props.setShow('showpuntosmas', 1)} >
                      add_circle_outline
                                </button>
                    {student.point}
                    <button className="button btnMyM material-icons" onClick={() => this.props.onClickPoint(student._id, student.point) + this.props.setShow('showpuntosmenos', 1)}>
                      remove_circle_outline
                                </button>
                  </td>
                  <td style={{ width: "50px" }}>
                    <button className="button btnMyM material-icons" onClick={() => this.props.onClick(student._id) + this.props.setShow('showdelete', 1)}>
                      delete
                                </button>
                  </td>
                </tr>
              ))
            ) : (
                <h1>no hay alumnos para mostrar</h1>
              )}
          </tbody>
        </table>
      </div>
    )
  }
}
