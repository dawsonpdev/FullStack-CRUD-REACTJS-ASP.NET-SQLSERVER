import React, { useState , useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function App() {
  const baseUrl="https://localhost:44341/api/gestores";
  const [data, setData]=useState([]);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [gestorSeleccionado, setGestorSeleccionado]=useState({
    id: '',
    nombre: '',
    lanzamiento: '',
    desarrollador: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

   const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    delete gestorSeleccionado.id;
    gestorSeleccionado.lanzamiento=parseInt(gestorSeleccionado.lanzamiento);
    await axios.post(baseUrl, gestorSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    gestorSeleccionado.lanzamiento=parseInt(gestorSeleccionado.lanzamiento);
    await axios.put(baseUrl+"/"+gestorSeleccionado.id, gestorSeleccionado)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map(gestor=>{
        if(gestor.id===gestorSeleccionado.id){
          gestor.nombre=respuesta.nombre;
          gestor.lanzamiento=respuesta.lanzamiento;
          gestor.desarrollador=respuesta.desarrollador;
        }
      });
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+gestorSeleccionado.id)
    .then(response=>{
     setData(data.filter(gestor=>gestor.id!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarGestor=(gestor, caso)=>{
    setGestorSeleccionado(gestor);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="App">
      <br/><br/>
      <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Insertar Nuevo Gestor</button>
      <br/><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Lanzamiento</th>
            <th>Desarrollador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {data.map(gestor=>(
          <tr key={gestor.id}>
            <td>{gestor.id}</td>
            <td>{gestor.nombre}</td>
            <td>{gestor.lanzamiento}</td>
            <td>{gestor.desarrollador}</td>
            <td>
              <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor, "Editar")}>Editar</button> {"  "}
              <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
            </td>
            </tr>
        ))}
        </tbody>

      </table>

      <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar Gestor de Base de Datos</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre"  onChange={handleChange}/>
          <br />
          <label>Lanzamiento: </label>
          <br />
          <input type="text" className="form-control" name="lanzamiento" onChange={handleChange}/>
          <br />
          <label>Desarrollador: </label>
          <br />
          <input type="text" className="form-control" name="desarrollador" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Gestor de Base de Datos</ModalHeader>
      <ModalBody>
        <div className="form-group">
        <label>ID: </label>
          <br />
          <input type="text" className="form-control" readOnly value={gestorSeleccionado && gestorSeleccionado.id}/>
          <br />
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.nombre}/>
          <br />
          <label>Lanzamiento: </label>
          <br />
          <input type="text" className="form-control" name="lanzamiento" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.lanzamiento}/>
          <br />
          <label>Desarrollador: </label>
          <br />
          <input type="text" className="form-control" name="desarrollador" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.desarrollador}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Gestor de Base de datos {gestorSeleccionado && gestorSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
