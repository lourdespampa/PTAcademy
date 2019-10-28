import React, { Component } from 'react'
import './grupos.css'
import js from './grupos.js'



export default class GrupoPage extends Component {
    render() {
        
        return (
              <>
             <div className="wrapper">
            <div className="panel-principal" width="100%" height="200px">
                <div className="content">
                    <div className="form-group">
                        <label>N° DE GRUPOS: <span id="num_grupos">6</span></label>
                        <input id="slider" type="range" value="6" min="2" max="20" step="1" className="slider" />
                        <button onclick={js.generar_grupos} className="btn btn-primary pull-right">GENERAR GRUPOS</button>
                    </div>
                </div>
            </div>

        </div><br />
        <div className="wrapper2">
            <div id="salida_grupos"></div>
        </div>
        </> 
        )
    }
}
