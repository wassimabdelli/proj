import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeserviceService } from './service/feservice.service';

@Component({
  selector: 'app-factencours',
  templateUrl: './factencours.component.html',
  styleUrls: ['./factencours.component.css']
})
export class FactencoursComponent implements OnInit {
  email! : string;
  FEL : any[] = [];
  /////////////pour calculer Le MTTC///////////////////////////////////////
Articles! : any[]; 
LibA! : string;
prixUn! : number;
Qte!:number;
TVA!:number;
TVA19 : number = 0;
TVA7 : number =0 ;
MTVA! : string ;
THT! : string ;
///////////////
date! : Date ;
client!:string;
Timbre!:number;
  constructor(private route: ActivatedRoute ,private FELS : FeserviceService , private router : Router )  { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let nba = params.get('email')  ;
        this.email = params.get('email') as string ;   
     });
     this.FELS.getNumFcours().subscribe(snapshots => {
      this.FEL = snapshots.map(snapshot => snapshot.payload.doc.data());
  }); 
console.log(this.FEL)  
  }
 delete( c : string )
 {
  this.FELS.deleteC(c,"FECours")
  alert("Cette Facture est supprimer de l'etat")
 }
 add( c : string , f : number , m : string )
 {
  this.FELS.articleInfo().subscribe(snapshots => {
      
    this.Articles = snapshots.map(snapshot => snapshot.payload.doc.data());
    this.Articles = this.Articles.filter(element => element['NumC'] === c);
    this.Articles.forEach(element => {
      this.THT = (element['PrixUn'] * element['Qte']).toFixed(3).toString()
    });


    this.Articles.forEach(element => {
      if( element['TVA'] == 19 )
      {
        this.TVA19 += (element['PrixUn'] * element['Qte'] ) * (element['TVA'] /100)
      }else{
        this.TVA7 += (element['PrixUn'] * element['Qte'] ) * (element['TVA'] /100)
      }
      this.MTVA = (this.TVA19 + this.TVA7).toFixed(3).toString()
    });
  })
  this.FELS.commandeInfo(c).subscribe((snapshots) => {
    const a = snapshots.data() as any  ;
    this.Timbre = a['Timbre'];
    this.client = a['client'];
    this.date = a['date'];  
    this.FELS.addET( c , f , this.date , this.client , this.THT, this.MTVA, this.Timbre , m );
    this.FELS.addNR( c , f , this.date , this.client , this.THT, this.MTVA, this.Timbre , m );
  } )
  this.FELS.deleteC(c,"FECours")
 }
 
}
