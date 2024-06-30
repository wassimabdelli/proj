import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteService } from './service/delete.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
email! : string
IDC! : string
////////CHequeINFO///////////////
des! : any
dateCH : any
date! : string
M! : any
NF! : any
rq! : any 
/////////////////////////////////
constructor( private router : Router ,private route : ActivatedRoute , private DCH : DeleteService ) { }

ngOnInit() {

  this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') as string ;   
      this.IDC = params.get('IDC') as string;
   });
this.DCH.getCH(this.IDC).subscribe(snapshots => {///////////////////////////////////////
  if ( snapshots.exists   )
  {
    this.des = snapshots.data(); 
    this.des = this.des['Designation'] as string ;

    this.dateCH = snapshots.data(); 
    this.dateCH = this.dateCH['dateCH'] as Date ;

    this.M = snapshots.data(); 
    this.M = this.M['M'] as number ;

    this.NF = snapshots.data(); 
    this.NF = this.NF['NF'] as string ;

    this.rq = snapshots.data(); 
    this.rq = this.rq['rq'] ? 'Oui' : 'Non' 

    this.date = this.dateCH.toDate().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })

    var dateParts = this.date.split('/');
     this.date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];


  }
})

}
  delete( NCH : string  )
  {
    this.DCH.deleteCH(NCH);
    this.router.navigate(['/cheques',this.email]) 
  }
}
