import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private firestore : AngularFirestore , private router : Router) { }
  


  addArticle ( NumC : string , LibA : string ,
     PrixUn : number , TVA:number , Qte : number ) 
  {
 
    
    this.firestore.collection('Article').doc().set({
      NumC: NumC,
      LibA: LibA,
      PrixUn: PrixUn,
      TVA: TVA,
      Qte: Qte,
    })
    .then(() => {
      alert('L\'article est ajoutée pour la commande Numero: '+NumC);
    })
    .catch((err) => {
      alert(err.message);
    });
  }
  ///////////////////////////////////////////////////////////////////////
  addCommande( NumC : string , client : string ,Timbre : number )
 {
   this.firestore.collection('Commande').doc(NumC).set({
     NumC: NumC,
     client:client,
     Timbre: Timbre,
     NumF : 0,
     date : new Date(), 
     etat : 'en attente...',
     NumBL : 0
   })
   .then(() => {
     alert(' La commande Numero: '+NumC+' est stocker avec succées');
   })
   .catch((err) => {
     alert(err.message);
   });
 }
 getCommandes() {
    
  return this.firestore.collection('Commande').snapshotChanges();
  
}


}
