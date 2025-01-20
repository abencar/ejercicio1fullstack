"use client"
import  {useState} from "react"
import  '../../../styles/estiloContactos.css'


export default function CreateContact(){
    const [contacto, setContacto] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        numero_telefono: 0,
        fecha_nacimiento: ""
    });

    async function crearContacto(e) {

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {"Content-Type": "application-json"},
            body: JSON.stringify(contacto)
        })
        fetchUsers();
    }

    function onChange(e) {
        setContacto({...contacto,[e.target.name]:e.target.value})
    }

    function filtroContacto(){
        if(contacto.nombre && contacto.apellidos && contacto.numero_telefono){
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.correo)){
                if(String(contacto.numero_telefono).length == 9){
                    crearContacto()
                }
            }
        }
    }

    return (
        <div className="container">
            <h1>Crear Contacto</h1>
            <form  onSubmit={filtroContacto}>
                <label>
                    Nombre:
                    <input
                        className="form"
                        name="nombre"
                        type="text"
                        placeholder="Nombre"
                        onChange={e => onChange(e)} value={contacto.nombre}
                        required
                    />
                </label><br />
                <label>
                    Apellidos:
                    <input
                        className="form"
                        name="apellidos"
                        type="text"
                        placeholder="Apellido"
                        onChange={e => onChange(e)} value={contacto.apellidos}
                        required
                    />
                </label><br />
                <label>
                    Número de Teléfono
                    <input
                        className="form"
                        name="numero_telefono"
                        type="number"
                        placeholder="Teléfono"
                        onChange={e => onChange(e)} value={contacto.numero_telefono}
                        required
                        pattern="[0-9]{9}"
                    />
                </label><br />
                <label>
                    Correo Electrónico
                    <input
                        className="form"
                        name="correo"
                        type="text"
                        placeholder="Correo"
                        onChange={e => onChange(e)} value={contacto.correo}
                        required
                    />
                </label><br />
                <label>
                    Fecha de Nacimiento
                    <input
                        className="form"
                        name="fecha_nacimiento"
                        type="date"
                        onChange={e => onChange(e)} value={contacto.fecha_nacimiento}
                        required
                    />
                </label><br />
                <input type="submit" value="Crear" id="add" />
            </form>
        </div>
    )
}