import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUCService } from './service/service-uc.service';

@Component({
  selector: 'app-update-c',
  templateUrl: './update-c.component.html',
  styleUrls: ['./update-c.component.css']
})
export class UpdateCComponent implements OnInit {
 email! : string
 date! : string
 NumC! : string
 client! : string;
 timbre! : string;
  constructor( private route : ActivatedRoute , private ucs : ServiceUCService  ) { }
  
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
  this.NumC = params.get('NumC') as string ;   
});

this.route.paramMap.subscribe((params) => {
  this.timbre = params.get('timbre') as string ;   
});

this.route.paramMap.subscribe((params) => {
  this.client = params.get('client') as string ;   
});

  }

  update(  )
  {
     const n = Number(this.timbre)
     const d = new Date( this.date )
     this.ucs.update(d , this.client , n , this.NumC )
  }

}
