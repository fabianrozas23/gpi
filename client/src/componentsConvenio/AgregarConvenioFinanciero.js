//Diálogo que aparece al agregar un nuevo pago

import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";

import { useState } from "react";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormDialog2() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //-----------------------------------------//
  //Ubicación del botón
  const mystyle = {
    height: 80,
    width: "100%",
    padding: "0px",
    margin: "80px 15px 15px 0px",
  };

   // Estados para datos de tabla convenios
   const [id_convF, setid_convF] = useState(0);
   const [nombre_convF, setnombre_convF] = useState(0);
   const [fecha_convF, setfecha_convF] = useState("");
 
  const agregarConvenioF = () => {
    Axios.post("http://localhost:3001/createConvenioF", {
      id_convF: id_convF,
      nombre_convF: nombre_convF,
      fecha_convF: fecha_convF,
    }).then(() => {
      console.log("exitoso");
    });
  };

  return (
    <div>
      <div style={mystyle}>
        <Box display="flex" justifyContent="center" m={1} p={1}>
          <Box p={5}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Agregar Convenio Financiero
            </Button>
          </Box>
        </Box>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form"
      >
        <DialogTitle id="form">agregar convenio financiero</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para agregar un convenio llenar los siguientes campos:
          </DialogContentText>
          <p> Datos del Convenio </p>

       {/*    <TextField
            autofocus
            margin="dense"
            id="id_convF"
            label="id convenio"
            variant="outlined"
            size="medium"
            onChange={(e) => {
              setid_convF(e.target.value);
            }}
          />  */}

          <p />
          <TextField
            autofocus
            margin="dense"
            id="nombre_convF"
            label="nombre convenio"
            variant="outlined"
            size="medium"
            onChange={(e) => {
              setnombre_convF(e.target.value);
            }}
          />
          <p />
          <TextField
            autofocus
            margin="dense"
            id="fecha_convF"
            variant="outlined"
            size="medium"
            type="date"
            onChange={(e) => {
              setfecha_convF(e.target.value);
            }}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={agregarConvenioF} color="primary">
            Agregar Convenio 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}