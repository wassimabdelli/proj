import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NrService } from './service/nr.service';

@Component({
  selector: 'app-nr',
  templateUrl: './nr.component.html',
  styleUrls: ['./nr.component.css']
})
export class NRComponent implements OnInit {
email! : string;
NR : any[] = [];
F = ['Toutes', 'Payée', 'Non Payée'];
selectedF: string = 'Toutes';
  constructor(private route: ActivatedRoute , private NRS : NrService ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email') as string ;   
   });

   /*this.NRS.getNR().subscribe(snapshots => {
    this.NR = snapshots.map(snapshot => snapshot.payload.doc.data());
}); */

this.NR = this.Filtrer();
  }

  changer( n : number , e : boolean )
  {
   this.NRS.changer(n,e);
  }

  Filtrer() : any
  {
    if ( this.selectedF === 'Toutes' )
      {
        this.NRS.getNR().subscribe(snapshots => {
          this.NR = snapshots.map(snapshot => snapshot.payload.doc.data());
      });
      }else{
        this.NRS.getNR1( this.NR , this.selectedF )
      }
  }

}
