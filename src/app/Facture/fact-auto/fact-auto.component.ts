import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { FactAService } from './factAService/fact-a.service';
import { AngularFirestore  } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-fact-auto',
  templateUrl: './fact-auto.component.html',
  styleUrls: ['./fact-auto.component.css']
})
export class FactAutoComponent implements OnInit {
email!: string;
BL!:string;
NumC! : string;
////////////////
date! : Date ;
mydate! : any;
client!:string;
Timbre!:number;
etat!: string;
NumF! : number ;
 years = new Date();
 annee = this.years.getFullYear();
 fullNumF! : string ;
 NumBL : number = 0 ;
 fullNumBL! : string;
//////////////////
Articles! : any[]; 
LibA! : string;
prixUn! : number;
Qte!:number;
TVA!:number;
TVA19 : number = 0;
TVA7 : number =0 ;
MTVA! : number ;
THT :number = 0 ;
////////IBM///////////
codeTVA! : any
adr! : any
fax! : any
GSM! : any
EIBM! : any
RIB! : any
///////////////////
  constructor(private route : ActivatedRoute ,private FAS : FactAService , private firestore : AngularFirestore ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') as string ;   
      this.NumC = params.get('NumC') as string ;   
      this.Getarticles()
      this.GetCommandes()
      
   });
   this.FAS.IBM().subscribe(snapshots => {
    if ( snapshots.exists   )
      {
        this.codeTVA = snapshots.data();
        this.codeTVA =  this.codeTVA['CodeTva']

        this.adr = snapshots.data();
        this.adr =  this.adr['Adresse']

        this.EIBM = snapshots.data();
        this.EIBM =  this.EIBM['Email']

        this.fax = snapshots.data();
        this.fax =  this.fax['Tél/Fax']

        this.GSM = snapshots.data()
        this.GSM = this.GSM['GSM']

        this.RIB = snapshots.data()
        this.RIB = this.RIB['RIB']
      }
    
      
   
   }
   )
  }
  Getarticles() {
    this.FAS.articleInfo().subscribe(snapshots => {
      
      this.Articles = snapshots.map(snapshot => snapshot.payload.doc.data());
      this.Articles = this.Articles.filter(element => element['NumC'] === this.NumC);
      this.Articles.forEach(element => {
        this.THT += (element['PrixUn'] * element['Qte']) 
      });


      this.Articles.forEach(element => {
        if( element['TVA'] == 19 )
        {
          this.TVA19 += (element['PrixUn'] * element['Qte'] ) * (element['TVA'] /100)
        }else{
          this.TVA7 += (element['PrixUn'] * element['Qte'] ) * (element['TVA'] /100)
        }
        this.MTVA = this.TVA19 + this.TVA7
      });
    })

  }

  GetCommandes()
  {
    this.FAS.commandeInfo(this.NumC).subscribe((snapshots) => {
      const a = snapshots.data() as any  ;
      this.Timbre = a['Timbre'];
      this.NumF = a['NumF'];
      this.fullNumF = this.NumF.toString() + "/" + this.annee.toString()
      this.client = a['client'];
      this.etat = a['etat'];
      this.date = a['date'];  
      this.NumBL = a['NumBL'];
      this.fullNumBL = this.NumBL.toString()+"/"+this.annee.toString()
      this.mydate = this. date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      this.mydate = this.FAS.timestampToDate(this.mydate)
    } )
  }
}
