import React, {useState,useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import $ from 'jquery'
import './headerStyles.sass'
import Audio from './audio'
import axios from 'axios'
import io from 'socket.io-client';

// User has switched back to the tab
const onFocus = () => {
  console.log('Tab is in focus');
};

// User has switched away from the tab (AKA tab is hidden)
const onBlur = (props) => {
    const socket = io(props.socketUrl, {
        query:
            { pin: props.id_access }
      })
      socket.emit('tabBlurred',{fullname:props.fullname})
  console.log(props.fullname);
  console.log('Tab is blurred');
};

const WindowFocusHandler = (props) => {
  useEffect(() => {
    window.addEventListener('focus',onFocus);
    window.addEventListener('blur', ()=>onBlur(props));    
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus',onFocus);
      window.removeEventListener('blur',onBlur);
    };
  });

  return <></>;
};
export default function HeaderContainer(props) {
    const [redirect,setredirect]=useState(false);
    const [trivia,settrivia]=useState(false);
    const [temporizador,settemporizador]=useState(false);
    const [Exit,setExit]=useState(false);
    const reinicio=()=>settrivia(false)+settemporizador(false)
    const deleteStudent=async ()=>{
        console.log(props.apiUrl,props.id_access,props.id_student)
        await axios.put(`${props.apiUrl}/v1/api/lesson/${props.id_access}/student/${props.id_student}`)
    }
    useEffect(()=>{
        const socket = io(props.socketUrl, {
            query:
                { pin: props.id_access }
          })
        socket.on('redirectAlum', (data) => {
            console.log('llega redirectAlum')
            if(data.pin == (props.id_access).toUpperCase()){
                if(data.page == 'trivia'){
                    settrivia(true)
                    settemporizador(false)
                }else if(data.page == 'temporizador'){
                    settemporizador(true)
                    settrivia(false)
                }
            }
        })
        socket.on('ExitSocket',(data)=>{
            if(data.pin==(props.id_access).toUpperCase()){
                setExit(true)
            }
        })
        
        //liSTA
        socket.on('RemoveStudS',(data)=>{
            console.log(data)
            if(data.pin == (props.id_access).toUpperCase()) {
                console.log('REcibe salida')
                if(data.id==props.id_student){
                    console.log('REcibe  salida fase 2')
                    setExit(true)
                }
            }
        })
        //END LISTA
    })
    return (
        <div>
            <WindowFocusHandler id_access={props.id_access} fullname={props.name+' '+props.lastName} id_student={props.id_student} socketUrl={props.socketUrl} ></WindowFocusHandler>
        {
          trivia==true
          ? 
          <Redirect to={`/student/${props.id_student}/${props.id_access}/trivia`} /> 
          :
          null
          }
          {
          temporizador==true
          ? 
          <Redirect to={`/student/${props.id_student}/${props.id_access}/temporizador`} /> 
          :
          null
          }
          {
          Exit==true
          ? 
          <Redirect to={`/`} /> 
          :
          null
          }
            <nav id="header" className="mb-1 navbar navbar-expand-lg navbar-dark primary-color lighten-1 fixed">
    <div className="navbar-brand">Bienvenido {props.name} {props.lastName} </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555" aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link onClick={reinicio} className="nav-link" to={`/student/${props.id_student}/${props.id_access}`}>Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link onClick={reinicio} className="nav-link" to={`/student/${props.id_student}/${props.id_access}/temporizador`}>Temporizador</Link>
                </li>
                <li className="nav-item">
                    <Link onClick={reinicio} className="nav-link" to={`/student/${props.id_student}/${props.id_access}/trivia`}>Trivia</Link>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <div className="btn nav-link" onClick={() => deleteStudent()+setredirect(true)}>salir</div>
                    {
                        redirect==true?
                        <Redirect to = '/' /> :
                        null
                    }
                    {/* <Link className="nav-link" to="/" id="btnsalirclase">Salir</Link> */}

                </li>
            </ul>
        </div>
    </nav>
    <Audio  id_access={props.id_access} id_student={props.id_student} socketUrl={props.socketUrl}/>
        </div>
    )
}
