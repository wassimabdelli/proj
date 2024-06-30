import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUBLService } from './service/service-ubl.service';

@Component({
  selector: 'app-update-bl',
  templateUrl: './update-bl.component.html',
  styleUrls: ['./update-bl.component.css']
})
export class UpdateBLComponent implements OnInit {
  email! : string;
  date! : string;
  NumF! : string;
  constructor( private route : ActivatedRoute , private ubls : ServiceUBLService ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') as string ;   
   });

   this.route.paramMap.subscribe((params) => {
    this.date = params.get('date') as string ;   

    var dateParts = this.date.split('/');
    // Réorganiser les parties de la date dans le nouveau format
     this.date = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
 });

 this.route.paramMap.subscribe((params) => {
  this.NumF = params.get('NumBL') as string ;   
});
  }
  update( date : string )
  {
    const a = new Date ( this.date );
    this.ubls.update(a,this.NumF)
  }
}
