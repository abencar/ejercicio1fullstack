import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqpvixmzjnqsjlwgirfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHZpeG16am5xc2psd2dpcmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNzksImV4cCI6MjA1MjQyMzI3OX0.eOq6jIOMrUJZ8seEs1rNlXV7tNee-utFr9z18toDskw'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    const { data: contacto, error } = await supabase.from("contacto").select("id, nombre, apellidos").order("nombre");

    if(error){ 
        return new Response(JSON.stringify({error: "No se han podido cargar los contactos"}), {status: 404}) 
    }

    return new Response(
        JSON.stringify(contacto),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

export async function POST(request) {
    const body = await request.json();

    if(body.nombre && body.apellidos && body.numero_telefono){
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.correo)){
            if(String(body.numero_telefono).length == 9){
                const { data: contacto, error } = await supabase.from("contacto").insert({nombre: body.nombre, apellidos: body.apellidos, correo: body.correo, numero_telefono: body.numero_telefono, fecha_nacimiento: body.fecha_nacimiento});
                return new Response(
                    JSON.stringify({message: "Usuario agregado correctamente"}),
                    { headers: { "Content-Type": "application/json" } }
                );
            }
        }
    }

    return new Response(
        JSON.stringify({message: "El contacto no se ha podido agregar"}),
        { headers: { "Content-Type": "application/json" } }
    );
}

export async function DELETE(request){
    const body = await request.json();

    const { data, error } = await supabase
    .from("contacto")
    .delete()
    .eq("id", body.id);

    return new Response(
        JSON.stringify({message: "Contacto eliminado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
}




