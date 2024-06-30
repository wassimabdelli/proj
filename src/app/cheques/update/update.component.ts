import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateService } from './service/update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
email! : string
IDC! : string
////////CHequeINFO///////////////
des! : any
dateCH : any
date! : string
M! : any
NF! : any
rq! : any   
rq2 : any
/////////////////////////////////
  constructor(private router : Router ,private route : ActivatedRoute , private UCH : UpdateService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') as string ;   
      this.IDC = params.get('IDC') as string;
   });
   this.UCH.getCH(this.IDC).subscribe(snapshots => {///////////////////////////////////////
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
      this.rq = this.rq['rq']   

      this.rq2 = this.rq ? 'Oui' : 'Non' 

      this.date = this.dateCH.toDate().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  
      var dateParts = this.date.split('/');
       this.date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
  
  
    }
  })
  }
update( idc : string )
{

 const d = new Date(this.date)
  alert (d)
  this.UCH.update(idc , this.des , this.M , this.NF , d , this.rq )
}
changer()
{
  this.rq = !this.rq
  this.rq2 = this.rq ? 'Oui' : 'Non' 
}
}
