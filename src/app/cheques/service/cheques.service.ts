import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChequesService {

  constructor(private firestore : AngularFirestore , private router : Router) { }

  addCheque( NCH : string , des : string ,dateCH : Date , M: number , NF : string )
  {
    this.firestore.collection('Cheque').doc(NCH).set({
      NCH: NCH,
      Designation:des,
      dateCH: dateCH,
      M : M , 
      NF : NF ,
      rq : false
    })
    .then(() => {
      alert(' Le Cheque Numero: '+NCH+' est stocker avec succées');
    })
    .catch((err) => {
      alert(err.message);
    });
  }
  getChequesID()
 {
   return this.firestore.collection("Cheque").snapshotChanges();
 }
 changer( id : string , rq : boolean )
 {
  this.firestore.collection("Cheque").doc(id).update({
    rq : rq , 
  })
 }

 getNR1( nr : any[] , f : string ){
  let cheques: any[]
  nr.length = 0
  if( f =='versé')
    {
      this.firestore.collection("Cheque").snapshotChanges().subscribe(snapshots => {
        cheques = snapshots.map(snapshot => snapshot.payload.doc.data());
      for (var index = 0; index < cheques.length; index++) {
       if ( cheques[index]['rq'] )
         {
           nr.push(cheques[index])
         }
         
      }
      return nr ;
     })
   
    }else if ( f =='Non versé')
      {
        this.firestore.collection("Cheque").snapshotChanges().subscribe(snapshots => {
          cheques = snapshots.map(snapshot => snapshot.payload.doc.data());
        for (var index = 0; index < cheques.length; index++) {
         if ( !cheques[index]['rq'] )
           {
             nr.push(cheques[index])
           }
        }
        return nr ;
       })
    }
}
}
