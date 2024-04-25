import { signUpUser } from "../app/registro/registro.functions";
import { updateUserData } from "./users";
import { signInUser } from "../app/login/login.functions";
import { forgotPassword } from "src/app/introducir-email/introducir-email.functions";
import { searchContainers } from "./containers";
import { insertInquiry } from "../app/nueva-incidencia/nueva-incidencia.functions";
import {muestraMisIncidencias } from "../app/mis-incidencias/mis-incidencias.functions";
import { supabaseClient } from "../supabase_client";
import { getFullName } from "../app/profile-user/profile-user.functions";


//signUpUser("maxkaidanov2@gmail.com","00000000","Max Chulisimo Latoncioso", "000111222")


// prueba().then((result)=> console.log("El correo especificado existe en la base de datos: ", result))

//signUpUser("jmarreq@gmail.com","000000", "Lato Latoncio Chulon", "23456781")
//signInUser("danielibanezlopez1@gmail.com","123456")//.then(() => updateUserData("Carlitos gordo GORDO"))
//forgotPassword("info2maxkaidanov2017@gmail.com")
//searchContainers()
//insertInquiry('Esto es una prueba de reporte','suggestion', null, null, 'glass_containers')
//imprime mis incidencias
// muestraMisIncidencias().then((data) => {
//     if(data.length == 0){
//         console.log("No hay incidencias")
//     }else{
//         for (let elem of data){
//             console.log(elem)
//         }
//     }
    
// })

//signInUser("maxkaidanov2@gmail.com","00000000").then(() => insertInquiry('Esto es una prueba de reporte','suggestion', 312, null, 'battery_containers'))
//signInUser("maxkaidanov2@gmail.com","00000000").then(() => getFullName() )
// insertInquiry('Esto es una prueba de reporte','suggestion', 1120161, null, 'Residuos Urbanos')
