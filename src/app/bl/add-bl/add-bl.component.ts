import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddblServiceService } from './addbl-service.service';

@Component({
  selector: 'app-add-bl',
  templateUrl: './add-bl.component.html',
  styleUrls: ['./add-bl.component.css']
})
export class AddBLComponent implements OnInit {
  email! : string;
  DocBL: any[] = [];
  /////////////////BLA
  NumC! : string;
  NumBL : number =1 ;   
  date : Date = new Date()
  client! : string;
  ////////////////Article_AR
  nomAR!: string;
  Qte! : number;
  constructor( private route : ActivatedRoute , private ABS : AddblServiceService, private router : Router  ) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') as string ;
    });
    this.ABS.NumBL().subscribe(snapshots => {
      this.DocBL = snapshots.map(snapshot => snapshot.payload.doc.id);
       for (let index = 0; index <this.DocBL.length; index++) 
        {
              if (this.NumBL < this.DocBL[index])
              {
                this.NumBL = this.DocBL[index ]
              }
            
        }
 }); 
  }
  toAddBl()
  {
    this.router.navigate(['/addbl',this.email]);
  } 
  addArticleBL()
  {
  this.ABS.addArticle( this.NumC , this.NumBL , this.nomAR , this.Qte )
      this.nomAR = "";
      this.Qte = 0 ;
  }
  addBLA()
  {
    this.NumBL = Number(this.NumBL) +1
    this.ABS.addBL( this.NumC , this.NumBL , this.client)
    this.NumBL = this.NumBL ;
    this.NumC = ''
    this.client = ''
    this.toAddBl();
  }
}