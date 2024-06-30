import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventesService } from './service/eventes.service';

@Component({
  selector: 'app-eventes',
  templateUrl: './eventes.component.html',
  styleUrls: ['./eventes.component.css']
})
export class EVentesComponent implements OnInit {
Ventes : any[] = []
Ventes2 : any[] = []
email!:string;
VTPM : any[] = []
TVTPM : any[] = []
THTPM : any[] = []
//////////////ListeDeroulante///////////////
 months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  selectedMonth: string = 'January';
  TR = ['Toutes l\'année','Par Mois']
  selectedTR: string = 'Toutes l\'année';
years: number[] = [];
date : Date = new Date()
selectedYear!: number;

  constructor(private route: ActivatedRoute , private evs : EventesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
        this.email = params.get('email') as string ;   
     });
  
      this.Ventes2 = this.onYearChange01();
      
  const currentYear = new Date().getFullYear();
  this.selectedYear = currentYear;
  this.evs.somme1(this.selectedYear , this.VTPM , this.THTPM , this.TVTPM  )
  for (let i = 0; i < 10; i++) {
    this.years.push(currentYear - i);
  }
  
  }
  onYearChange() {
    this.evs.getVentes01(this.selectedYear).subscribe(snapshots => {
      this.Ventes = snapshots.map(snapshot => snapshot.payload.doc.data());
  }); 
  }  onYearChange01() : any {
    if ( this.selectedTR ==='Toutes l\'année' )
      {
        this.evs.somme1(this.selectedYear , this.VTPM , this.THTPM , this.TVTPM  )
        this.evs.getVentes().subscribe(snapshots => {
          this.Ventes2 = snapshots.map(snapshot => snapshot.payload.doc.data());
         
        })
      }else{
        this.evs.somme(this.selectedYear , this.selectedMonth , this.VTPM , this.THTPM , this.TVTPM  )
        this.Ventes2 = this.evs.getVentes02(this.selectedYear , this.selectedMonth , this.Ventes2); 
  } ; 
    
    }
delete()
{
  
}
sumArray(array : any[] ) {
  let sum = 0;
  for (let num of array) {
    sum += num;
  }
  return sum;
}
} 
