import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}
   items = [
    { id: 'checkbox1', selected: false },
    { id: 'checkbox2', selected: false },
    { id: 'checkbox3', selected: false },
    { id: 'checkbox4', selected: false },
    { id: 'checkbox5', selected: false },
    { id: 'checkbox6', selected: false },
    { id: 'checkbox7', selected: false },
 ];

 @ViewChildren('.filter-checkbox') filterCheckboxes!: QueryList<ElementRef>;

 ngAfterViewInit() {
    this.filterCheckboxes.changes.subscribe(() => {
      this.updateCheckboxes();
    });
 }

 updateCheckboxes() {
  const selectAllCheckbox = document.getElementById('checkbox-top-right') as HTMLInputElement;
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      this.items.forEach(item => {
        const checkbox = document.getElementById(item.id) as HTMLInputElement;
        if (checkbox) {
          this.renderer.setProperty(checkbox, 'checked', selectAllCheckbox.checked);
        }
      });
    });
  }
}
}
