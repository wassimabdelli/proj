import { Component, OnInit } from '@angular/core';
import { BlServiceService } from './bl-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bl',
  templateUrl: './bl.component.html',
  styleUrls: ['./bl.component.css']
})
export class BLComponent implements OnInit {
  email!: string;
  NC!: string;
  Articles! : any[];
  NumBL : number = 0;
  years = new Date();
  annee = this.years.getFullYear();
  date! : Date ;
  mydate! : any;
  client!:string;
  Timbre!:number;
  etat!: string;
  NumF! : number ;
  fullNumBL! : string ;
  constructor( private BS : BlServiceService ,  private route : ActivatedRoute ) { }

  ngOnInit(): void {
    this.Getarticles();
    this.route.paramMap.subscribe((params) => {
        this.email = params.get('email') as string ;  
        this.NC = params.get('NumC') as string ; 
     });
     
     this.GetCommandes();
  }

  Getarticles() {
    this.BS.articleInfo().subscribe(snapshots => {
      this.Articles = snapshots.map(snapshot => snapshot.payload.doc.data());
      this.Articles = this.Articles.filter(element => element['NumC'] === this.NC);
   } )
  }

    GetCommandes()
    {
      this.BS.commandeInfo(this.NC).subscribe((snapshots) => {
        const a = snapshots.data() as any  ;
        this.Timbre = a['Timbre'];
        this.NumBL = a['NumBL'];
        this.NumF = a['NumF'];
        this.fullNumBL = this.NumF.toString() + "/" + this.annee.toString()
        this.client = a['client'];
        this.etat = a['etat'];
        this.date = a['date'];  
        this.mydate = this. date.toLocaleString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        this.mydate = this.BS.timestampToDate(this.mydate)
      } )
    }
  }

