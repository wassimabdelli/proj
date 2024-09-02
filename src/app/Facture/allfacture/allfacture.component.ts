import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allfacture',
  templateUrl: './allfacture.component.html',
  styleUrls: ['./allfacture.component.css']
})
export class AllfactureComponent implements OnInit {
  email!: string;
  years: number[] = [];
  date : Date = new Date()
  selectedYear!: number;
  facts: any[] = [];
  BLs: any[] = [];
  DocBL: any[] = [];
  DocFE: any[] = [];
  arrayNumC: any[] = [];
  arrayNumBL:any[] = [];
  arrayNumF : any[] = [];
  NC!: string ;
  NF!: number ; 
  //////////////////////////////////////
  ok : boolean = false
  /////////////pour calculer Le MTTC///////////////////////////////////////
  Articles! : any[]; 
LibA! : string;
prixUn! : number;
Qte!:number;
TVA!:number;
TVA19 : number = 0;
TVA7 : number =0 ;
MTVA! : number ;
THT :number = 0 ;
  constructor( private allS : ServiceService , private router : Router ,private route : ActivatedRoute ) { }

  ngOnInit() {
    this.allS.getNumBL().subscribe(snapshots => {
      this.DocBL = snapshots.map(snapshot => snapshot.payload.doc.id);
  }); 

  this.allS.getNumFcours().subscribe(snapshots => {
    this.DocFE = snapshots.map(snapshot => snapshot.payload.doc.id);
}); 

    this.route.paramMap.subscribe((params) => {
      let nba = params.get('email')  ;
        this.email = params.get('email') as string ;   
     });
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.getAllFact( this.selectedYear ) ;
   
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear - i);
    }
   
    this.allS.getBL().subscribe(snapshots => {
      this.BLs = snapshots.map(snapshot => snapshot.payload.doc.data());
      for (let index = 0; index <this.BLs.length; index++) {
        const numc = ( this.BLs[index]['NumC'] )
        const numbl = ( this.BLs[index]['NumBL'] )
        this.arrayNumC[index] = numc
        this.arrayNumBL[index] = numbl
      } }); 


      this.allS.getFactA1().subscribe(snapshots => {
        this.BLs = snapshots.map(snapshot => snapshot.payload.doc.data());
        for (let index = 0; index <this.BLs.length; index++) {
          const numf = ( this.BLs[index]['NumF'] )
          this.arrayNumF[index] = numf
        } });
  
  }
  onYearChange() {
    this.allS.getFactA(this.selectedYear).subscribe(snapshots => {
      this.facts = snapshots.map(snapshot => snapshot.payload.doc.data());
  }); 
  }

  getAllFact( a: number )
  {
    this.allS.getFactA(a).subscribe(snapshots => {
      this.facts = snapshots.map(snapshot => snapshot.payload.doc.data());
  }); 
 
  }
  seeFact( nc : string  )
  {
   this.router.navigate(['/FactA',nc,this.email]);
  }
  AjouterBL( nc : string , NumF : number )
  {
    this.NC = nc ; 
    this.NF = NumF;
    if ( this.arrayNumC.includes(nc) )
    {
      this.ok = true
    }else{
      this.ok = false
    }
   
  }
  BLGlobal()
  {
    if (this.DocBL.length != 0)
    {
      const a = this.DocBL.length + 1 ; 
      this.allS.BLGlobal(this.NF , this.NC , a  )
    }else{
      this.allS.BLGlobal(this.NF , this.NC , 1  )
    }
  }
  seeBL()
  {
    {
      this.router.navigate(['/BL',this.NC,this.email])
     }
  }

  delete( a : string , b : number )
  {
    if (this.allS.maxTab(b , this.arrayNumF)) {
      const date = new Date();
      const annee = date.getFullYear();
      const collection = annee;
      //this.allS.deleteC(a,"Article")
      this.allS.deleteC(a,"ArticleBL")
      this.allS.deleteC(a,"BL"+annee)
      this.allS.deleteC(a,"FactA"+collection);
      this.allS.deleteC(a,"EtatNR");
      this.allS.deleteC(a,"Ventes"+collection);
      alert("La facture est Bien Supprimé , ainsi que le BL")
    }else{
      alert('Vous ne pouvez pas supprimer cette facture, car ce n\'est pas la dernière')
    }
 
  }
  livraison( c : string , f : number )
  {

if( this.DocFE.includes(c) )
{
  alert(" Cette Facture est deja au cours de livraison ")
}else{
    this.allS.articleInfo().subscribe(snapshots => {   
      this.Articles = snapshots.map(snapshot => snapshot.payload.doc.data());
      this.Articles = this.Articles.filter(element => element['NumC'] === c);
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
      const m = this.THT + this.MTVA ;  
      this.allS.addFcours(c,f,m.toFixed(3));
      alert(" Cette Facture est Maintenant en cours de livraison ")
  });
}
} 

toupdate( date : Date , NumF : number )
{
  const parm2 = date.toLocaleDateString('en-GB');
  this.router.navigate(['/updateF', this.email ,parm2 , NumF])
}

}
