import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NrService {

  constructor( private firestore : AngularFirestore , private router : Router  ) { }
  getNR() {
    return this.firestore.collection("EtatNR").snapshotChanges();
  }


  getNR1( nr : any[] , f : string ){
    let Ventes: any[]
    nr.length = 0
    if( f =='Payée')
      {
        this.firestore.collection("EtatNR").snapshotChanges().subscribe(snapshots => {
          Ventes = snapshots.map(snapshot => snapshot.payload.doc.data());
        for (var index = 0; index < Ventes.length; index++) {
         if ( Ventes[index]['Reg'] )
           {
             nr.push(Ventes[index])
           }
           
        }
        return nr ;
       })
     
      }else if ( f =='Non Payée')
        {
          this.firestore.collection("EtatNR").snapshotChanges().subscribe(snapshots => {
            Ventes = snapshots.map(snapshot => snapshot.payload.doc.data());
          for (var index = 0; index < Ventes.length; index++) {
           if ( !Ventes[index]['Reg'] )
             {
               nr.push(Ventes[index])
             }
          }
          return nr ;
         })
      

      }

  }


  changer( NumF : number , e : boolean ){

    if (e)
      {
        this.firestore.collection("EtatNR").doc(NumF.toString()).update({
          Reg : false , 
      })
      } else{
        this.firestore.collection("EtatNR").doc(NumF.toString()).update({
          Reg : true , 
      })
      }
  }
}
