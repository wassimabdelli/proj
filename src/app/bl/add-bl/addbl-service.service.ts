import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddblServiceService {


  constructor( private firestore : AngularFirestore) { }
  NumBL()
  {
    const date = new Date();
    const annee = date.getFullYear();
    const collection = "BL"+annee;
    return this.firestore.collection(collection).snapshotChanges();
  }

  addArticle ( NumC : string , NumBL : number , nomAR : string , Qte : number )
     
 {

  this.firestore.collection("ArticleBL").doc(NumBL.toString()).set({
     NumC: NumC,
     NumBL : NumBL,
     nomAR: nomAR,
     Qte: Qte,
   })
   .then(() => {
     alert('L\'article est ajoutée pour le BL Numero: '+NumBL);
   })
   .catch((err) => {
     alert(err.message);
   });
 }

 addBL( NumC : string , NumBL : number , client : string )
    {
      const date = new Date();
      const annee = date.getFullYear();
      const collection = "BL"+annee;
      this.firestore.collection(collection).doc(NumBL.toString()).set({
      NumC: NumC,
      NumBL : NumBL,
      client : client,
      Cat : "p",
      date : new Date(), 
    })
    .then(() => {
      alert('Le BL est ajoutée dans la base de données sous le numéro : '+NumBL);
    })
    .catch((err) => {
      alert(err.message);
    });
    }
  

}
