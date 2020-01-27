import React, { Component } from 'react'
import save_pic from './assets/save.svg';
import discard_pic from './assets/discard.svg';
import edit_pic from './assets/edit.svg';
import axios from 'axios'







class TablaCompetnecias extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            competencias: props.competencias
        }
    }

    renderCompetencia(competencia, id) {

        let subCompetencia = competencia.subCompetencia
        return (
            <tr key={competencia.titulo}  >
                <th onClick={() => this.props.setSelected(id)}>
                    {competencia.titulo}
                </th>
                {subCompetencia.map((sub, id_sub) => {
                    return (
                        <td key={sub.title}
                            onClick={() => this.props.setSelected(id, id_sub)}>
                            {sub.title}
                        </td>)
                })}
            </tr>
        )
    }

    render() {
        let competencias = this.state.competencias
        return (
            <div className='CourseDetail-table' >
                <table>
                    <tbody>
                        {competencias.map((com, id) => this.renderCompetencia(com, id))}
                    </tbody>

                </table>
            </div>
        )
    }
}


class TablaInfoAlumnos extends Component {    

    constructor(props) {
        super(props) 
        this.state = {
            competencias: props.competencias,
            studens: props.studens,
            option: props.option
        }
    }


 
    showEstudents(student) {
        return (
            <tr key={student.name + student.lastname + 'fullname'}>
                <th >
                    {student.name}
                </th>
                <th >
                    {student.lastname}
                </th>
            </tr>
        )
    }
 
    showEstudentsCompentencia(student) {
        let selected = this.state.selected
        let id = selected[0]
        let competencia = student.competencias[id]
        return (
            <tr key={student.name + student.lastname + 'fullnameCompentecias'}>
                <th>
                    {student.name} 
                </th>
                <th> 
                    {student.lastname}  
                </th> 
                {competencia.subCompetencia.map( 
                    (ele) => (<th key={student.name + student.lastname + 'Nota' + ele.value} >
                        {this.renderEditing(ele.value, () => { })} 
                    </th>) 
                )} 
            </tr> 
        )

    }
    showEstudentsSubCompetencia(student) {

        let selected = this.state.selected
        let id = selected[0]
        let sub_id = selected[1]
        let subCompetencia = student.competencias[id].subCompetencia[sub_id]
        return (
            <tr key={student.name + student.lastname + 'fullnameSubCompentecias'}>
                <th>
                    {student.name}
                </th>
                <th>
                    {student.lastname}
                </th>
                <th>

                    {this.renderEditing(subCompetencia.value, () => { })}
                </th>
                <th>
                    {this.renderEditing(subCompetencia.descripcion, () => { })}
                </th>
            </tr>
        )
    }

    renderBodyTable() {

        let students = this.state.studens
        let show = (student) => this.showEstudents(student)
        let option = this.state.option
        let tipo = option.length
        if (tipo === 1)
            show = (student) => this.showEstudentsCompentencia(student)
        if (tipo === 2)
            show = (student) => this.showEstudentsSubCompetencia(student)
        return (
            <tbody>
                {students.map(show)}
            </tbody>
        )
    }   



    renderHeadTable() {
        let option = this.state.option
        let tipo = option.length    
        let heads = ['Nombre', 'Apellido']  
        let heads2 = []   
        if (tipo === 1) {  
            let subCompetencias = this.state.competencias[option[0]].subCompetencia; 
            heads2 = subCompetencias.map(ele => ele.title) 
        } 
        if (tipo === 2) 
            heads2 = ['Notas', 'Descripcion'] 
        heads = heads.concat(heads2) 
        return ( 
            <thead> 
                <tr> 
                    {heads.map( 
                        (ele) => <th key={ele + 'headas'} > {ele} </th> 
                    )} 
                </tr> 
            </thead> 
        )
    }




    render() {
        return (<table>
            {this.renderHeadTable()}

        </table>)
    }
}










export default class CourseDetail extends Component {

    constructor(props) {
        super(props)
        let competencias = [
            {
                titulo: 'construye interpretaciones historicas',
                subCompetencia:
                    [
                        {
                            title: 'interpreta criticamente fuertemente diversas',
                            value: 'A',
                            descripcion: 'cosas de cosas '

                        },
                        {
                            title: 'Comprende el tiempo historico',
                            value: 'B',
                            descripcion: 'cosas de cosas '
                        },
                        {
                            title: 'Elavora explicaciones historicos',
                            value: 'C',
                            descripcion: 'cosas de cosas '

                        },

                    ],
                promedio: 'B'

            },
            {
                titulo: 'gestiona responsablemnte el espacio y el ambiente ',
                subCompetencia:
                    [
                        {
                            title: 'comprende las relaciones entre los elementos naturales y sociales',
                            value: 'A',
                            descripcion: 'cosas de cosas '
                        },
                        {
                            title: 'maneja fuerte de inrmacion para comprender el espacio geografico y el ambiente',
                            value: 'B',
                            descripcion: 'cosas de cosas '
                        },
                        {
                            title: 'Elavora explicaciones historicos',
                            value: 'C',
                            descripcion: 'cosas de cosas '
                        },
                    ],
                promedio: 'B'
            }

        ]

        let students =
            [
                { name: 'estudiante1', lastname: 'estudiante1', competencias: competencias },
                { name: 'estudiante2', lastname: 'estudiante2', competencias: competencias },
                { name: 'estudiante3', lastname: 'estudiante3', competencias: competencias },
                { name: 'estudiante4', lastname: 'estudiante4', competencias: competencias },
                { name: 'estudiante5', lastname: 'estudiante5', competencias: competencias },
                { name: 'estudiante6', lastname: 'estudiante6', competencias: competencias },
            ]




        let datapoint = {
            positivo:
                [
                    { valor: 1, title: 'Ayuda a Otros' },// va a tener sus propios sub item 
                    { valor: 1, title: 'Cumplimiento de Tareas' },
                    { valor: 1, title: 'Participacion' },
                    { valor: 1, title: 'Persistencia' },
                    { valor: 1, title: 'responsabilidad' },
                    { valor: 1, title: 'trabajo en equipo' }
                ],
            negativo:
                [
                    { valor: 1, title: 'Ayuda a Otros' },
                    { valor: 1, title: 'Cumplimiento de Tareas' },
                    { valor: 1, title: 'Participacion' }
                ],
            comportamiento:
                [
                    { title: '', valor: 'A' },
                    { title: '', valor: 'B' },
                    { title: '', valor: 'C' },
                    { title: '', valor: 'D' }, 
                    { title: '', valor: 'E' }, 
                    { title: '', valor: 'F' } 
                ]
        }
        console.log(datapoint)
        this.state = {
            studens: students,
            competencias: competencias,
            selected: [],
            editing: false

        }
        console.log(props.id_access, 'id acceses') 
    }


    // get studens 
    getStudents = async () => {
        console.log(this.state.students)
        console.log(this.props.id_access)
        var varToken = localStorage.getItem('token');
        const res = await axios({
            url: `${this.props.apiUrl + '/v1/api/lesson'}/${this.props.id_access}/students`,
            //pendiente que se haga peticion de estuantes por curso 
            method: 'GET', 
            headers: { 
                'x-access-token': `${varToken}` 
            }
        })
        this.setState({
            students: await res.data
        });
    }


    renderEditing(value, handler) {
        if (this.state.editing) {
            return (
                <React.Fragment>
                    <input type="text" defaultValue={value} />

                </React.Fragment>
            )
        } else {
            return <React.Fragment> 
                {value} 
            </React.Fragment> 
        }
    }



    renderHeadTable() {
        let selected = this.state.selected
        let tipo = selected.length
        let heads = []

        if (tipo === 1)
            heads = this.state.competencias[selected[0]].subCompetencia.map(ele => ele.title)

        if (tipo === 2)
            heads = ['Notas', 'Descripcion']
        return (
            <thead>
                <tr>
                    <th>
                        Nombre
                    </th>
                    <th>
                        Apellido
                    </th>
                    {heads.map(
                        (ele) => <th key={ele + 'headas'} > {ele} </th>
                    )}
                </tr>
            </thead>
        )
    }



    showEstudents(student) {
        return (
            <tr key={student.name + student.lastname + 'fullname'}>
                <th >
                    {student.name}
                </th>
                <th >
                    {student.lastname}
                </th>
            </tr>
        )
    }

    showEstudentsCompentencia(student) {
        let selected = this.state.selected
        let id = selected[0]
        let competencia = student.competencias[id]
        return (
            <tr key={student.name + student.lastname + 'fullnameCompentecias'}>
                <th>
                    {student.name}
                </th>
                <th>
                    {student.lastname}
                </th>
                {competencia.subCompetencia.map(
                    (ele) => <th key={student.name + student.lastname + 'Nota' + ele.value} >{this.renderEditing(ele.value, () => { })}</th>
                )}
            </tr>
        )

    }
    showEstudentsSubCompetencia(student) {

        let selected = this.state.selected
        let id = selected[0]
        let sub_id = selected[1]
        let subCompetencia = student.competencias[id].subCompetencia[sub_id]
        return (
            <tr key={student.name + student.lastname + 'fullnameSubCompentecias'}>
                <th>
                    {student.name}
                </th>
                <th>
                    {student.lastname}
                </th>
                <th>

                    {this.renderEditing(subCompetencia.value, () => { })}
                </th>
                <th>
                    {this.renderEditing(subCompetencia.descripcion, () => { })}
                </th>
            </tr>
        )
    }

    renderBodyTable() {

        let students = this.state.studens
        let show = (student) => this.showEstudents(student)
        let selected = this.state.selected
        let tipo = selected.length
        if (tipo === 1)
            show = (student) => this.showEstudentsCompentencia(student)
        if (tipo === 2)
            show = (student) => this.showEstudentsSubCompetencia(student)
        return (
            <tbody>
                {students.map(show)}
            </tbody>
        )
    }
    setSelected(x, y) {
        console.log('selecting' + Number(new Date()) % 1000)
        let selected = y !== undefined ? [x, y] : [x]
        this.setState({ selected: selected })
    }

    editButtonHandler() {
        this.setState({ editing: !this.state.editing })
    }
    saveData() {
        // falta la rutas para metodo post 
        this.editButtonHandler()
    }


    rendersave() {
        if (this.state.editing)
            return (
                <img src={save_pic}
                    onClick={() => this.saveData()}
                    alt="save"
                    title='guardar'
                />
            )
        else
            return null
    }

    renderEditingDiscart() {
        if (!this.state.editing)
            return (
                <img src={edit_pic} alt="edit"
                    onClick={() => this.editButtonHandler()}
                    title='editar'
                />)
        else
            return (
                <img src={discard_pic}
                    alt="discart"
                    title='descartar'
                    onClick={() => this.editButtonHandler()}
                />)

    }


    render() {
        return (
            <React.Fragment>
                <TablaCompetnecias competencias={this.state.competencias} setSelected={(x, y) => this.setSelected(x, y)}  ></TablaCompetnecias>

                <div className='CourseDetail-table'>

                    <table  >
                        {this.renderHeadTable()}
                        {this.renderBodyTable()}
                    </table>

                    {this.rendersave()}
                    {this.renderEditingDiscart()}
                </div>
            </React.Fragment>
        )
    }
}
