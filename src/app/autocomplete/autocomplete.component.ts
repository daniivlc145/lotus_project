import { Component } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  template: `
    <input type="text" (input)="onInput($event)" (keydown)="onKeyDown($event)">
  `,
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  currentFocus: number = -1;
  arr: string[] = ['Apple', 'Banana', 'Orange', 'Pineapple']; // Ejemplo de datos de autocompletado

  constructor() { }

  onInput(event: Event) {
    const val: string = (event.target as HTMLInputElement).value;
    this.closeAllLists();
    if (!val) { return false; }
    const a = document.createElement("DIV");
    a.setAttribute("class", "autocomplete-items");
    (event.target as HTMLInputElement).parentNode?.appendChild(a);
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        const b = document.createElement("DIV");
        b.innerHTML = "<strong>" + this.arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += this.arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + this.arr[i] + "'>";
        b.addEventListener("click", () => {
          (event.target as HTMLInputElement).value = (b.getElementsByTagName("input")[0] as HTMLInputElement).value;
          this.closeAllLists();
        });
        a.appendChild(b);
      }
    }
  }

  onKeyDown(event: KeyboardEvent) {
    let x = Array.from(document.getElementsByClassName("autocomplete-items")).map((el: Element) => el.getElementsByTagName("div")[0] as HTMLDivElement);
    if (x) {
      if (event.keyCode === 40) {
        this.currentFocus++;
        this.addActive(x);
      } else if (event.keyCode === 38) {
        this.currentFocus--;
        this.addActive(x);
      } else if (event.keyCode === 13) {
        event.preventDefault();
        if (this.currentFocus > -1) {
          x[this.currentFocus].click();
        }
      }
    }
  }

  addActive(x: HTMLDivElement[] | undefined) {
    if (!x) return false;
    this.removeActive(x);
    if (this.currentFocus >= x.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
    x[this.currentFocus].classList.add("autocomplete-active");
  }

  removeActive(x: HTMLDivElement[] | undefined) {
    if (!x) return false;
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  closeAllLists() {
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      (x[i] as HTMLElement).parentNode?.removeChild(x[i]);
    }
  }
}
