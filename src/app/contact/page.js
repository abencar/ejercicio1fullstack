"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListContact() {

    const [contacts, setContacts] = useState([]);


    async function deleteContact(deleteId) {

        if (window.confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
            const response = await fetch("/api/contact", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ deleteId })
            });

            fetchContacts();
        }
    }


    async function fetchContacts() {
        const response = await fetch("/api/contact");
        const body = await response.json();
        console.log(body);
        
        setContacts(body);
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div>
            <h1>Lista de contactos:</h1>
            {contacts.map(contact =>
                <p>
                    <Link key={contact.id} href={"/contact/" + contact.id}>
                        {contact.name} -
                        {contact.surnames}
                    </Link>
                    <button onClick={() => deleteContact(contact.id)}>Eliminar contacto</button>
                </p>
            )}

            <Link href="/contact/create">Añadir contacto</Link>

        </div>);
}

