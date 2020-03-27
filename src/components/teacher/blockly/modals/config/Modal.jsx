import React from 'react';
import Blockly from "../../blockly copy/core";
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import SettingsIcon from '@material-ui/icons/Settings';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import en from "../../blockly copy/msg/en";
import es from "../../blockly copy/msg/es";
import fr from "../../blockly copy/msg/fr";
//import Form from 'react-bootstrap/Form';
//import {Row, Col} from 'react-bootstrap';

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }
// };



class Menu extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            "PlayBot": false,
            "lcd": false,
            "ultrasonic": false,
            "Bluetooth": false,
            "RFID": false,
            "Sensores": false

        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.classes = makeStyles(theme => ({
            button: {
                margin: theme.spacing(1),
            },
            root: {
                width: '100%',
                maxWidth: 360,
                backgroundColor: theme.palette.background.paper,
            },
            paper: {
                width: '80%',
                maxHeight: 435,
            },
        }));
        this.arregloBloques = [
            "PlayBot",
            "lcd",
            "ultrasonic",
            "Bluetooth",
            "RFID",
            "Sensores"
        ]

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

        if (this.state.selectedOption === 'Es') {
            Blockly.setLocale(es);
        } else if (this.state.selectedOption === 'En') {
            Blockly.setLocale(en);
        } else if (this.state.selectedOption === 'Fr') {
            Blockly.setLocale(fr);

        }
        let positivos = []
        for (const key in this.arregloBloques) {
            let element = this.arregloBloques[key]
            let p = (this.state[element] !== undefined || null) ? this.state[element] : 0;
            positivos.push({ [element]: p })

        }
        this.props.cambioCategorias(positivos)
        this.setState({ modalIsOpen: false });

    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    changeBlock = (elem) => {
        let variableBlock = elem.target.value
        let StateBlock = elem.target.checked
        if (StateBlock === true) {
            this.setState({ [variableBlock]: true })
        } else {
            this.setState({ [variableBlock]: false })
        }


    }
    render() {
        return (
            <div id="modal"
            >
                <button onClick={this.openModal}>Language</button>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="sm"
                    aria-labelledby="confirmation-dialog-title"
                    open={this.state.modalIsOpen}
                >

                    <form onSubmit={this.handleFormSubmit}>
                        <DialogTitle id="confirmation-dialog-title">Configuraciones</DialogTitle>
                        <DialogContent dividers>
                            <div className={"container"}>
                                <p>idiomas</p>
                                <RadioGroup
                                    aria-label="ringtone"
                                    name="ringtone"
                                    row
                                >
                                    <FormControlLabel value={"español"} key={"español"} control={
                                        <Radio id={'radio_español'}

                                            checked={this.state.selectedOption === 'Es'}
                                            onChange={this.handleOptionChange}
                                            value={'Es'}
                                        />
                                    } label={"español"} />

                                    <FormControlLabel value={"ingles"} key={"ingles"} control={
                                        <Radio id={'radio_ingles'}

                                            checked={this.state.selectedOption === 'En'}
                                            onChange={this.handleOptionChange}
                                            value={'En'}
                                        />
                                    } label={"ingles"} />

                                    {/* <FormControlLabel value={"frances"} key={"frances"} control={
                                        <Radio id={'radio_frances'}

                                            checked={this.state.selectedOption === 'Fr'}
                                            onChange={this.handleOptionChange}
                                            value={'Fr'}
                                        />
                                    } label={"frances"} /> */}

                                </RadioGroup>
                                {/* <p>otros Componetes</p> */}
                                <FormGroup row id="contenedor_radio">
                                    {/* {
                                        this.arregloBloques.map(element => {
                                            return <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state[element]}
                                                        onChange={this.changeBlock}
                                                        value={element} />
                                                }
                                                label={element}
                                            />
                                        })
                                    }
 */}


                                </FormGroup>

                            </div>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.closeModal} color="primary">
                                Cancel
                    </Button>
                            <Button onClick={this.handleFormSubmit} color="primary">
                                Ok
                    </Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </div>
        );
    }
}

export default Menu;








