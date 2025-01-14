import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqpvixmzjnqsjlwgirfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHZpeG16am5xc2psd2dpcmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNzksImV4cCI6MjA1MjQyMzI3OX0.eOq6jIOMrUJZ8seEs1rNlXV7tNee-utFr9z18toDskw'
const supabase = createClient(supabaseUrl, supabaseKey)


export async function GET(request) {

    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")

    const { data: contacto, error } = await supabase.from("contacto").select("*").eq("id", idBuscado);

    if(contacto) {
        return new Response(JSON.stringify(contacto), {status:200})
    }else{
        return new Response(JSON.stringify({error: "No existe"}), {status: 404})
    }
}

export async function PUT(request) {
    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")
    const body = await request.json();
    
    if(body.nombre && body.apellidos && body.numero_telefono){
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.correo)){
            if(String(body.numero_telefono).length == 9){
                const { data: contacto, error } = await supabase.from("contacto").update({nombre: body.nombre, apellidos: body.apellidos, correo: body.correo, numero_telefono: body.numero_telefono, fecha_nacimiento: body.fecha_nacimiento}).eq("id", idBuscado);
                return new Response(
                    JSON.stringify({message: "Usuario actualizado correctamente"}),
                    { headers: { "Content-Type": "application/json" } }
                );
            }
        }
    }

    return new Response(
        JSON.stringify({message: "El usuario no se ha podido actualizar"}),
        {status:500, headers: { "Content-Type": "application/json" } }
    );
}