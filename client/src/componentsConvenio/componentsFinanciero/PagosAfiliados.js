//En este componente está la tabla con info de los pagos de afiliados + CRUD; Pertenece al perfil de Directiva.
import React, { useState, useEffect } from "react";
/* import { DataGrid } from "@material-ui/data-grid";
 */ import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Modal, TextField, Button } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import ResetSearch from "@material-ui/icons/Clear";
import Filter from "@material-ui/icons/FilterList";
import Export from "@material-ui/icons/SaveAlt";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import NextPage from "@material-ui/icons/ChevronRight";
import PreviousPage from "@material-ui/icons/ChevronLeft";
import SortArrow from "@material-ui/icons/ArrowUpward";

const columns = [
  {
    title: "id convenio",
    field: "id_convenio",
    export: false,
    headerStyle: {
      backgroundColor: "#01579b",
    },
  },
  {
    title: "Convenio",
    field: "nombre_convenio",
    headerStyle: {
      backgroundColor: "#01579b",
    },
  },
  {
    title: "Fecha de ingreso",
    field: "fecha_ingreso",
    type: "date",
    dateSetting: {
      format: "dd/MM/yyyy",
    },
    headerStyle: {
      backgroundColor: "#01579b",
    },
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: "1%",
  },
}));

function AgregarConvenio() {
  const styles = useStyles();
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [listConvenio, setListConvenio] = useState([]);
  const [convenioSelect, setConvenioSelect] = useState({
    id_convenio: "",
    nombre_convenio: "",
    fecha_ingreso: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConvenioSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    await Axios.get("http://localhost:3001/showConvenio")
      .then((response) => {
        setListConvenio(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async (id) => {
    await Axios.put("http://localhost:3001/editConvenio", {
      id_convenio: convenioSelect.id_convenio,
      nombre_convenio: convenioSelect.nombre_convenio,
      fecha_ingreso: convenioSelect.fecha_ingreso,
    })
      .then((response) => {
        setListConvenio(
          listConvenio.map((val) => {
            return val.id_convenio === convenioSelect.id_convenio
              ? {
                  id_convenio: convenioSelect.id_convenio,
                  nombre_convenio: convenioSelect.nombre_convenio,
                  fecha_ingreso: convenioSelect.fecha_ingreso,
                }
              : val;
          })
        );
        OCModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async (id) => {
    await Axios.delete(`http://localhost:3001/deleteConvenio/${id}`)
      .then((response) => {
        setListConvenio(
          listConvenio.filter((val) => {
            return val.id_convenio !== convenioSelect.id_convenio;
          })
        );
        OCModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SelectConvenio = (id_convenio, caso) => {
    setConvenioSelect(id_convenio);
    caso === "Editar" ? OCModalEditar() : OCModalEliminar();
  };

  const OCModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const OCModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  //Interfaz de modal editar
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Convenio</h3>
      <TextField
        className={styles.inputMaterial}
        label="id convenio"
        name="id_convenio"
        onChange={handleChange}
        value={convenioSelect && convenioSelect.id_convenio}
      />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Nombre Convenio"
        name="nombre_convenio"
        onChange={handleChange}
        value={convenioSelect && convenioSelect.nombre_convenio}
      />

      <TextField
        className={styles.inputMaterial}
        name="fecha_ingreso"
        type="date"
        format="yyyy-MM-dd"
        onChange={handleChange}
        value={convenioSelect && convenioSelect.fecha_ingreso}
      />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => OCModalEditar()}> Cancelar </Button>
      </div>
    </div>
  );

  //interfaz de model eliminar
  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas eliminar el siguiente Convenio:{" "}
        <b>{convenioSelect && convenioSelect.id_convenio}</b>?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Sí
        </Button>
        <Button onClick={() => OCModalEliminar()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <MaterialTable
        title="Lista de Convenios"
        data={listConvenio}
        columns={columns}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Editar Convenio",
            onClick: (event, rowData) => SelectConvenio(rowData, "Editar"),
            iconProps: {
              style: { backgroundColor: "#33ACFF" },
            },
          },
          {
            icon: DeleteIcon,
            tooltip: "Eliminar Convenio",
            onClick: (event, rowData) => SelectConvenio(rowData, "Eliminar"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          search: true,
          exportButton: true,
          headerStyle: {
            backgroundColor: "#3374FF",
            color: "#FFF",
            fontSize: "14px",
          },
        }}
        localization={{
          header: {
            actions: "Acciones",
          },
          pagination: {
            labelRowsSelect: "Filas",
            labelDisplayedRows: "{count} de {from}-{to}",
            firstTooltip: "Primera página",
            previousTooltip: "Página anterior",
            nextTooltip: "Próxima página",
            lastTooltip: "Última página",
          },
          toolbar: {
            searchTooltip: "Busqueda",
            searchPlaceholder: "Buscar",
            exportTitle: "Exportar",
            exportName: "Exportar a CSV",
          },
        }}
        icons={{
          Search: Search,
          ResetSearch: ResetSearch,
          Filter: Filter,
          Export: Export,
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: NextPage,
          PreviousPage: PreviousPage,
          SortArrow: SortArrow,
        }}
      />

      <Modal open={modalEditar} onClose={OCModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalEliminar} onClose={OCModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}
export default AgregarConvenio;