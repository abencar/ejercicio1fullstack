import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqpvixmzjnqsjlwgirfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHZpeG16am5xc2psd2dpcmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNzksImV4cCI6MjA1MjQyMzI3OX0.eOq6jIOMrUJZ8seEs1rNlXV7tNee-utFr9z18toDskw'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    const { data: contacts, error } = await supabase
        .from('contacto')
        .select('*')

    if (error) {
        console.log(error)
    }

    return new Response(JSON.stringify(contacts), { status: 200 })
}


export async function DELETE(request){
    const body = await request.json()
    const id = body.id

    const {data : deleteData, error} = await supabase.from("contacto").delete().eq({id: id})

    if(error){
        return new Response(JSON.stringify(error), {status: 404})
    }

    return new Response(JSON.stringify({su : "eliminado con exito" }), {status: 200})
}

export  async function POST(request){
    const body = await request.json()
    const contacto = body.contact
    const {data, error} = await supabase.from("contacto").insert(contacto)

    if(!error){
        return new Response(JSON.stringify({succes: "Contacto creado con exito"}), {status: 200})
    }

   return new Response(JSON.stringify(error), {status: 404})
}
