import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AchatService } from './service/achat.service';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css']
})
export class AchatComponent implements OnInit {
email! : string
////////////////////////////////
NF! : string;
dateFact!: Date;
client!: string;
PTHT!: number;
TVA!:number;
timbre!:number;
TTC!:number;
////////////////////////////////
Achats : any[] = []
selectedValue: string = 'oui';
///////////////////////////////
F = ['Toutes l\'année','Par Mois']
selectedF: string = 'Toutes l\'année';

months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  selectedMonth: string = 'January';

  years: number[] = [];
  selectedYear!: number;

  constructor(private route : ActivatedRoute , private router : Router , private Aservice : AchatService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') as string ;   
   });
   this.Aservice.DocsId().subscribe(snapshots => {
    this.Achats = snapshots.map(snapshot => snapshot.payload.doc.data());
}); 
const currentYear = new Date().getFullYear();
this.selectedYear = currentYear;
for (let i = 0; i < 10; i++) {
  this.years.push(currentYear - i);
}


  }
addAchat()
{
  if (this.PTHT + this.TVA + this.timbre === this.TTC) {
    const d = new Date(this.dateFact)
    this.Aservice.addAchat(this.NF , d , this.client, this.PTHT, this.TVA , this.timbre , this.TTC )
  } else {
    alert('Merci de vérifier les Montants que vous Avez entrez')
  }

}
filtrer()
{
  if ( this.selectedF ==='Toutes l\'année' )
    {
      this.Aservice.DocsId().subscribe(snapshots => {
        this.Achats = snapshots.map(snapshot => snapshot.payload.doc.data());
    }); 
    }else{
    this.Achats = this.Aservice.getAchats( this.selectedYear,this.selectedMonth , this.Achats );
   // this.Aservice.somme(this.selectedYear , this.selectedMonth ,  this.Totale )
} ; 
  
}
}
