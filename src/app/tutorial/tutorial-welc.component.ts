import { Component } from '@angular/core';

@Component({
  selector: 'app-tutorial-welc', // o 'app-tutorial-abt' según el componente
  templateUrl: './tutorial-welc.component.html', // o './tutorial-abt.component.html' según el componente
})
export class TutorialWelcComponent {

  // Función para el desplazamiento suave
  smoothScroll(event: MouseEvent) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace

    const targetId = (event.target as HTMLAnchorElement).getAttribute("href"); // Obtiene el ID del objetivo del enlace

    if (targetId !== null) { // Verifica si targetId no es nulo
        const targetElement = document.querySelector(targetId); // Obtiene el elemento del objetivo en la página

        if (targetElement) {
            const targetPosition = (targetElement as HTMLElement).offsetTop; // Obtiene la posición del objetivo en la página

            // Realiza el desplazamiento suave utilizando animate
            window.scroll({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    }
}

}
