import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import en from "../../blockly copy/msg/en";
import es from "../../blockly copy/msg/es";
import fr from "../../blockly copy/msg/fr";


const lang = [
    "Ingles",
    "español",
    "frances"
];
const langOBJ = [
    { "Ingles": "en" },
    { "español": "es" },
    { "frances": "fr" }
];
const comp_block = {
    "PlayBot": false,
    "lcd": false,
    "ultrasonic": false,
    "Bluetooth": false,
    "RFID": false,
    "Sensores": false
}
function C_block_to_array() {
    let arr = []
    for (const key in comp_block) {
        arr.push(key)
    }
    return arr
}

function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);
    const block = C_block_to_array()

    // estado de los check box de lo componentes

    const [state, setState] = React.useState(comp_block);
    React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value);
    };
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });

    };
    const handleChangeLang = event => {
        setValue(event.target.value);
    }
    const handleFormSubmit = event => {
        event.preventDefault()

        // Blockly.setLocale(es);
    }
    const handleOptionChange = (changeEvent) => {
        setState({
            selectedOption: changeEvent.target.value
        });

    }


    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="sm"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >

            <form onSubmit={handleFormSubmit}>
                <DialogTitle id="confirmation-dialog-title">Configuraciones</DialogTitle>
                <DialogContent dividers>
                    <div className={"container"}>
                        <p>idiomas</p>
                        <RadioGroup
                            ref={radioGroupRef}
                            aria-label="ringtone"
                            name="ringtone"
                            value={value}
                            onChange={handleChangeLang}
                            row
                        >
                            {langOBJ.map(open => {
                                for (const key in open) {
                                    return <FormControlLabel value={open[key]} key={open[key]} control={
                                        <Radio id={'radio_' + open[key]}
                                            onChange={handleOptionChange}
                                            value={open[key]}
                                        />
                                    } label={key} />
                                }
                            })

                            }
                        </RadioGroup>
                        <p>otros Co mponetes</p>
                        <FormGroup row id="contenedor_radio">
                            {block.map(function (elemento) {
                                return <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.elemento}
                                            onChange={handleChange(elemento)}
                                            value={elemento} />
                                    }
                                    label={elemento}
                                />
                            })}
                        </FormGroup>

                    </div>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleOk} type="submit" color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
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

export default function ConfirmationDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('Dione');

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = newValue => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="default"
                className={classes.button}

                onClick={handleClickListItem}
                startIcon={<SettingsIcon />}
            >
                configuraciones
            </Button>
            <ConfirmationDialogRaw
                classes={{
                    paper: classes.paper,
                }}
                id="ringtone-menu"
                keepMounted
                open={open}
                onClose={handleClose}
                value={value}
            />
        </div>
    );
}
