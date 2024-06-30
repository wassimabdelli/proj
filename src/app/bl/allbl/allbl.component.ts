import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allbl',
  templateUrl: './allbl.component.html',
  styleUrls: ['./allbl.component.css']
})
export class AllblComponent implements OnInit {
  email!: string;
  years: number[] = [];
  date : Date = new Date()
  selectedYear!: number;
  facts: any[] = [];
  BLs: any[] = [];
  DocBL: any[] = [];
  arrayNumC: any[] = [];
  arrayNumBL:any[] = [];
  NC!: string ;
  NF!: number ;
   //////////////////////////////////////
   ok : boolean = false
   constructor( private allS : ServiceService  , private router : Router ,private route : ActivatedRoute ) { }


  ngOnInit(): void {
    this.allS.NumBL().subscribe(snapshots => {
      this.DocBL = snapshots.map(snapshot => snapshot.payload.doc.id);
  }); 
    this.route.paramMap.subscribe((params) => {
      let nba = params.get('email')  ;
        this.email = params.get('email') as string ;   
     });
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
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
    
      console.log(this.arrayNumBL)
  
  }
  onYearChange() {
    this.allS.getBLA(this.selectedYear).subscribe(snapshots => {
      this.BLs = snapshots.map(snapshot => snapshot.payload.doc.data());
  }); 
  }

  getAllFact( )
  {
    this.allS.getBLA(this.selectedYear).subscribe(snapshots => {
      this.BLs = snapshots.map(snapshot => snapshot.payload.doc.data());
  }); 
 
  }
  seeBL(a : string)
  {
    {
      this.router.navigate(['/BL',a,this.email])
     }
}
toAddBl()
{
  this.router.navigate(['/addbl',this.email]);
}

delete( a : string )
{
  const date = new Date();
  const annee = date.getFullYear();
  const collection = annee;
  this.allS.deleteC(a,"Article")
  this.allS.deleteC(a,"ArticleBL")
  this.allS.deleteC(a,"BL"+annee)
  alert("Le BL est Bien Supprimé .")
}
 update( NumBL : number , date : Date  )
 {

   const parm2 = date.toLocaleDateString('en-GB');
   this.router.navigate(['/updateBL', this.email ,parm2 , NumBL])
 }

}
