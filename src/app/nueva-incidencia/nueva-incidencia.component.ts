import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { StringComparison } from '../string-comparison/string-comparison';


@Component({
  selector: 'app-nueva-incidencia',
  templateUrl: './nueva-incidencia.component.html',
  styleUrls: ['./nueva-incidencia.component.scss'],
})

export class NuevaIncidenciaComponent  implements OnInit {
  textoUsuario: string = ''; // Variable para almacenar el texto ingresado por el usuario
  calles: string[] = []; // Lista de calles de Valencia (se cargará desde el archivo)
  callesRecomendadas: string[] = []; // Lista de calles recomendadas según el texto ingresado
  ubiActual: string= ''

  constructor(private router: Router,  private stringComparison: StringComparison) { this.cargarCallesDeValencia();}

  ngOnInit() {}

  // Método para cargar la lista de calles de Valencia desde el archivo
  cargarCallesDeValencia() {
    // Ruta al archivo calles_de_valencia.txt (ajusta la ruta según la estructura de tu proyecto)
    const filePath = '../utils/calles_de_valencia.txt';

    // Realizamos la petición HTTP para cargar el archivo
    fetch(filePath)
      .then(response => response.text()) // Convertimos la respuesta a texto
      .then(data => {
        // Dividimos el texto en líneas y lo asignamos a la lista de calles
        this.calles = data.split('●').map(calle => calle.trim());
      })
      .catch(error => console.error('Error al cargar las calles de Valencia:', error));
  }


  seleccionarCalle(calle: string) {
    // Al seleccionar una calle, se guarda en la variable ubiActual
    this.ubiActual = calle;
    console.log('Calle seleccionada:', this.ubiActual);
  }

      // En tu componente TypeScript
    compararTexto() {
      // Si el texto del usuario está vacío, no hacemos nada
      if (!this.textoUsuario) {
        this.callesRecomendadas = [];
        //this.toggleDropdownVisibility(false); // Oculta el dropdown
        return;
      }
    
      // Filtramos las calles recomendadas según el texto ingresado
      this.callesRecomendadas = StringComparison.recommendSimilarWords(this.textoUsuario, this.calles);
      //this.toggleDropdownVisibility(this.callesRecomendadas.length > 0); // Muestra el dropdown si hay opciones disponibles
    }
 
   /* toggleDropdownVisibility(show: boolean) {
      const dropdownElement = document.querySelector('.dropdownCalles');
      if (show) {
        dropdownElement.classList.add('show');
      } else {
        dropdownElement.classList.remove('show');
      }
    }*/
 

  goToHomePage() {
    console.log('goToHomePage() called');
    this.router.navigate(['/map']);
  }

}
