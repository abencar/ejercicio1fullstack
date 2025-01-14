"use client"
import  {useState} from "react"


export default function CreateContact(){
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [birthdate, setBirthdate] = useState("")

    async function crearContacto(e) {

        if(name !== "" && surname !== "" && phone !== ""){
            e.preventDefault()
            await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    contact: {
                        name: name,
                        surname: surname,
                        phone: phone,
                        email: email,
                        birthdate: birthdate
                    }
                })
            })
        }else{
            alert("Algun campo esta vacío")
        }
    }

    return (
        <div>
            <h1>Crear Contacto</h1>
            <form onSubmit={crearContacto}>
                <label>
                    Nombre:
                    <input
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        onChange={(ev) => setName(ev.target.value)}
                        required
                    />
                </label><br />
                <label>
                    Apellidos:
                    <input
                        name="surname"
                        type="text"
                        placeholder="Apellido"
                        onChange={(ev) => setSurname(ev.target.value)}
                        required
                    />
                </label><br />
                <label>
                    Número de Teléfono
                    <input
                        name="phone"
                        type="number"
                        placeholder="Teléfono"
                        onChange={(ev) => setPhone(ev.target.value)}
                        required
                        maxLength={9}
                        minLength={9}
                    />
                </label><br />
                <label>
                    Correo Electrónico
                    <input
                        name="email"
                        type="text"
                        placeholder="Correo"
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </label><br />
                <label>
                    Fecha de Nacimiento
                    <input
                        name="birthdate"
                        type="date"
                        onChange={(ev) => setBirthdate(ev.target.value)}
                    />
                </label><br />
                <input type="submit" value="Crear" />
            </form>
        </div>
    )
}