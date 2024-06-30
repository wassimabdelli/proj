import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FraisService } from './service/frais.service';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css']
})
export class FraisComponent implements OnInit {
email! : string
frais: any[] = []
NF : string =""
date! : Date
des! : string
TTC! : any
Totale : any[] =[]
selectedValue: string = 'oui';

F = ['Toutes l\'année','Par Mois']
selectedF: string = 'Toutes l\'année';

months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  selectedMonth: string = 'January';

  years: number[] = [];
  selectedYear!: number;
  constructor(private route : ActivatedRoute , private router : Router , private FService : FraisService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') as string ;   
   });
   this.FService.getFraisID().subscribe(snapshots => {
    this.frais = snapshots.map(snapshot => snapshot.payload.doc.data());
}); 
const currentYear = new Date().getFullYear();
this.selectedYear = currentYear;
for (let i = 0; i < 10; i++) {
  this.years.push(currentYear - i);
}
this.FService.somme1(this.selectedYear , this.Totale )
  }
  
  addFrais()
  {
    const d = new Date( this.date )
    
        this.TTC = (this.TTC).toFixed(3)
        this.FService.addFrais( this.NF,d ,this.des ,this.TTC )
        this.NF = "";
        this.des = "";
        this.date= new Date()
        this.TTC = 0
  }
  
  filtrer()  {
    if ( this.selectedF ==='Toutes l\'année' )
      {
        this.FService.getFraisID().subscribe(snapshots => {
          this.frais = snapshots.map(snapshot => snapshot.payload.doc.data());
      }); 
      }else{
      this.frais = this.FService.getFrais( this.selectedYear,this.selectedMonth , this.frais );
      this.FService.somme(this.selectedYear , this.selectedMonth ,  this.Totale )
  } ; 
    
  }
  sumArray(array : any[] ) {
    let sum = 0;
    for (let num of array) {
      sum += num;
    }
    return sum.toFixed(3);
  }
}
