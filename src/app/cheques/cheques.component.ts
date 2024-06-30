import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChequesService } from './service/cheques.service';

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.css']
})
export class ChequesComponent implements OnInit {
email! : string
//////cheque/////////
IDS : any[] = []
NCH! : string
des! : string
dateCH : Date = new Date()
M! : any
NF! : string
rq : boolean = false
cheques : any[] = []

F = ['Toutes', 'versé', 'Non versé'];
selectedF: string = 'Toutes';

////////////////
selectedValue: string = 'oui';
  constructor(private route : ActivatedRoute , private CHS : ChequesService , private router : Router ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') as string ;   
   });

   this.CHS.getChequesID().subscribe(snapshots => {
    this.IDS = snapshots.map(snapshot => snapshot.payload.doc.id);
}); 

    
      this.cheques =this.Filtrer()
  

  }
  addCheque()
  {

    const d = new Date( this.dateCH )

    if( this.IDS.includes(this.NCH) )
      {
        alert('Ce cheques est deja stockée')
      }else{
        this.M = (this.M).toFixed(3)
        this.CHS.addCheque(this.NCH , this.des , d , this.M , this .NF )
        this.NCH = "";
        this.des = "";
        this.dateCH = new Date()
        this.M = 0
        this.NF = ""
      }
  }
  changer( id : string , rq : boolean )
  {
    rq = !rq 
    this.CHS.changer(id , rq);
  }
   Filtrer() : any
  {
    if ( this.selectedF === 'Toutes' )
      {
        this.CHS.getChequesID().subscribe(snapshots => {
          this.cheques = snapshots.map(snapshot => snapshot.payload.doc.data());
        }); 
      }else{
        this.CHS.getNR1( this.cheques , this.selectedF )
      } 
  }
  delete( IDC : string ) {
    this.router.navigate(['/deleteCheque',this.email,IDC])     
  }
  update( IDC : string ){
    this.router.navigate(['/updateCheque',this.email,IDC]) 
  }
}
