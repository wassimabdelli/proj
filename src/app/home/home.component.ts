import { Component, OnInit } from '@angular/core';
import { HomeService } from './homeService/home.service'; 
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, ParamMap  } from '@angular/router';
import { BlServiceService } from '../bl/bl-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 email! : string;
 commandes: any[] = [];
 d : Date = new Date();
 NumF! : any[] ;
 arrayNumC : string[] = [] ;
 arrayNumF : number[] = [] ;
 DFacturation = this.d.toLocaleDateString("fr-FR");
 DocF : any[] = [];
 NC!: string ;
 numf!:number ; 
/////////Variable teb3in l modal//////////////////////////////////
OK! : boolean ;
 constructor(private HS: HomeService , private firestore : AngularFirestore , private router : Router , private BS : BlServiceService , 
  private route : ActivatedRoute) { }
 
  ngOnInit(): void {

    this.HS.getNumF().subscribe(snapshots => {
      this.DocF = snapshots.map(snapshot => snapshot.payload.doc.id);
  }); 
    this.getCommandes();
    this.route.paramMap.subscribe((params) => {
        this.email = params.get('email') as string ;
           this.HS.getNumF().subscribe(snapshots => {
        this.NumF = snapshots.map(snapshot => snapshot.payload.doc.data());
        for (let index = 0; index <this.NumF.length; index++) {
          const numc = ( this.NumF[index]['NumC'] )
          const numf = JSON.parse( this.NumF[index]['NumF'] )
          this.arrayNumC[index] = numc
          this.arrayNumF[index] = numf 
        } }); 
     });
   

  }
  getCommandes()  {
      this.HS.getCommandes().subscribe(snapshots => {
        this.commandes = snapshots.map(snapshot => snapshot.payload.doc.data());
    }); 
   
  }
testModal( nc : string  )
{
  
  this.NC = nc;
    if( this.arrayNumC.includes(nc) )
    {
      this.OK = true
    }else{ 
     this.OK = false
    }
    console.log(this.OK)
   }
   seeFact()
   {
    this.router.navigate(['/FactA',this.NC, this.email])
   }
   FacturationAuto(){
    if (this.DocF.length != 0)
    {
      const a = this.DocF.length + 1 ; 
      this.HS.addFactA(this.NC , a )
    }else{
      this.HS.addFactA(this.NC , 1 )
    }
   }
   delete( a : string )
{
  const date = new Date();
  const annee = date.getFullYear();
  const collection = annee;
  this.HS.deleteC(a,"Article")
  this.HS.deleteC(a,"ArticleBL")
  this.HS.deleteC(a,"BL"+annee)
  this.HS.deleteC(a,"FactA"+collection);
  this.HS.deleteC(a,"Commande");
  this.HS.deleteC(a,"FECours")
  alert("La commande est Bien Supprimé , ainsi que la facture, le BL et de l'etat des des factures en cours de livraison")
}
update( numc : string , date : Date , timbre : number , client : string )
{
  const parm2 = date.toLocaleDateString('en-GB');
  const aa = timbre.toString()
  this.router.navigate(['/updateC', this.email ,parm2 , client , timbre , numc])
}

}