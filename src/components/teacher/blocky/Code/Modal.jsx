import React from 'react';
//import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Blockly from "../blockly copy/core";
import en from "../blockly copy/msg/en";
import es from "../blockly copy/msg/es";
import fr from "../blockly copy/msg/fr";
//import Form from 'react-bootstrap/Form';
//import {Row, Col} from 'react-bootstrap';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement(document.getElementById('modal'))


class Menu extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }
    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }
    handleFormSubmit = (formSubmitEvent) => {
        //formSubmitEvent.preventDefault();
        console.log('You have selected:', this.state.selectedOption);
        if (this.state.selectedOption === 'Es') {
            Blockly.setLocale(es);
            this.setState({ modalIsOpen: false });
        } else if (this.state.selectedOption === 'En') {
            Blockly.setLocale(en);
            this.setState({ modalIsOpen: false });
        } else if (this.state.selectedOption === 'Fr') {
            Blockly.setLocale(fr);
            this.setState({ modalIsOpen: false });
        }
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    render() {
        return (
            <div id="modal">
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Lenguaje"
                    ariaHideApp={false}
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Lenguaje</h2>


                    <form onSubmit={this.handleFormSubmit}>
                        <div className="radio">
                            <label>
                                <input type="radio" value="Es"
                                    checked={this.state.selectedOption === 'Es'}
                                    onChange={this.handleOptionChange} />
                                Español
      </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" value="En"
                                    checked={this.state.selectedOption === 'En'}
                                    onChange={this.handleOptionChange} />
                                Ingles
      </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" value="Fr"
                                    checked={this.state.selectedOption === 'Fr'}
                                    onChange={this.handleOptionChange} />
                                Frances
      </label>
                        </div>
                        <button onClick={this.closeModal}>close</button>
                        <button className="btn btn-default" type="submit" >Save</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default Menu;
