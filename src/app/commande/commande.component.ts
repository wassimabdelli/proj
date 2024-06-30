import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { CommandeService } from './commandeService/commande.service';
import { HomeService } from '../home/homeService/home.service';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
email! : string;
nba! : number  ; //==> sera supprimer 
client! : string;//==> commande 
NumC! : string;//==> commande 
LibA!:string;//==>article
PA! : number; //==>article
TVA!:number;//==>article
QTE!:number;//==>article
Timbre!: number;//==>commande
reglement!: string;//==>Fact
etat!: string;//==>Fact
NumF!:string;//==>commande
BL!:string;//==>commande
commandes: any[] = [];
arrayNumC : any[] = [];
  constructor(private route: ActivatedRoute,private CS : CommandeService , private HS : HomeService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let nba = params.get('email')  ;
        this.email = params.get('email') as string ;   
     });
      this.HS.getCommandes().subscribe(snapshots => {
        this.commandes = snapshots.map(snapshot => snapshot.payload.doc.id);
    }); 
    this.route.paramMap.subscribe((params) => {
     let nba = params.get('nba')  ;
     this.nba = parseInt(nba!);
    });
    this.CS.getCommandes().subscribe(snapshots => {
      this.commandes = snapshots.map(snapshot => snapshot.payload.doc.data());
      for (let index = 0; index <this.commandes.length; index++) {
        const numc = ( this.commandes[index]['NumC'] )
        this.arrayNumC[index] = numc
      }
  });    
  }
  addTask() {
    if (this.NumC === '' || this.client === ''){
      alert('La numero de Commande et le client sont obligatoire');
      return;
    }
    //const d =  this.date.toLocaleDateString('en-GB');
    this.CS.addArticle(this.NumC,this.LibA,this.PA,this.TVA,this.QTE);
    //this.NumC = '';
    this.LibA = '';
    this.PA = 0;
    this.TVA = 0;
    this.QTE = 0;
  }
////////////////////////////////////////////////////////////
addCommande() {
  if (  this.NumC === '' || this.client === ''  ){
    alert('La numero de Commande et le client sont obligatoire');
    return;
  } 
  else if ( this.arrayNumC.includes(this.NumC) )
  {
    alert('Ce Numero de Commande est deja existe dans le Base de donneés');
  }else{
  this.CS.addCommande(this.NumC,this.client,1)
  this.client = '';
  this.LibA = '';
  this.PA = 0;
  this.TVA = 0;
  this.QTE = 0;
  this.NumC = ''
}
}
  }

