import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { getStats } from './stats.functions';
import { getFullContainerStat } from './stats.functions';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent  implements OnInit {

  constructor(private router: Router) { }

  async ngOnInit() {

   // getStats();
    await getFullContainerStat();

  }

  


  goToIncPage() {

    this.router.navigate(['/incOrg']);
  }

  goToMapPage() {

     
    this.router.navigate(['/mapCalor']); 
  }

  goToProfPage(){

    this.router.navigate(['/profOrg']);

  }

  goToStatsPage(){
    window.location.reload();
  }

}
