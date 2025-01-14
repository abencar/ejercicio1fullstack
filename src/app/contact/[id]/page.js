"use client"

import { use, useEffect, useState } from "react"

export default function Contact({ params }) {
    const { id } = use(params)
    const [contacto, setContacto] = useState()

    async function fetchContacto() {
        const url = await fetch("/api/contact/contactuser?id" + id)
        const response = await url.json()
        const cont = await response.json()

        setContacto(cont)
    }

    useEffect(() => {
        fetchContacto()
    }, [])

    if (contacto) {

        return (
            <div>
                <h1> {contacto.name} </h1>
                <h2> {contacto.surnames} </h2>
                <p> {contacto.email} </p>
                <p> {contacto.phone} </p>
                <p>{contacto.birthdate}</p>

            </div>)
    } else {
        return <div> Cargando... </div>
    }
}