import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceUfactService } from './service/service-ufact.service';

@Component({
  selector: 'app-update-fact',
  templateUrl: './update-fact.component.html',
  styleUrls: ['./update-fact.component.css']
})
export class UpdateFactComponent implements OnInit {
email! : string;
date! : string;
NumF! : string;
  constructor( private route : ActivatedRoute , private us : ServiceUfactService ) { }

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
    this.NumF = params.get('NumF') as string ;   
 });
  }
  update( date : string )
  {
    const a = new Date ( this.date );
    this.us.update(a,this.NumF)
  }
}
