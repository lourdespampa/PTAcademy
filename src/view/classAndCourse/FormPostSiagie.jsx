import React, { Component } from 'react'

export default class FormPostSiagie extends Component {
    render() {
        return (
            <>
                <label className="modal-title__controlname">
                  Subir Excel aqui
                </label>
            <input type="file" required name="file" id="excel" onChange={this.handleFileChange} placeholder="Archivo de excel" />
            <br/>
            <br/>
            </>
        )
    }
}
