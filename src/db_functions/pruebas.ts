import { signUpUser } from "src/app/registro/registro.functions";
import { updateUserData } from "./users";
import { signInUser } from "src/app/login/login.functions";
import { forgotPassword } from "src/app/login/login.functions";
import { searchContainers } from "./containers";
import { insertInquiry } from "../app/nueva-incidencia/nueva-incidencia.functions";
import { muestraMisIncidencias } from "src/app/mis-incidencias/mis-incidencias.functions";

//signUpUser("maxkaidanov2@gmail.com","000000", "M")
//signInUser("danielibanezlopez1@gmail.com","123456")//.then(() => updateUserData("Carlitos gordo GORDO"))
//forgotPassword("info2maxkaidanov2017@gmail.com")
//searchContainers()
//insertInquiry('Esto es una prueba de reporte','suggestion', null, null, 'glass_containers')
muestraMisIncidencias()

