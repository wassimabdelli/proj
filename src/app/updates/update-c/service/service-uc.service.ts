import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceUCService {

  constructor( private fireauth : AngularFireAuth , private firestore : AngularFirestore , private router : Router ) { }
 async update( date : Date , client : string , timbre : number , idoc : string )
  {
    const d = new Date();
    const annee = d.getFullYear();
    
    const v = "Ventes"+annee;
    this.firestore.collection("Commande").doc(idoc).update({
      date: date,
      client : client,
      timbre : timbre,
    })
    .then(() => {
      alert('update Successful');
    })
    .catch((err) => {
      alert(err.message);
    });
    ///
    const collectionRef = this.firestore.collection(v).ref;
    const collectionRefNR = this.firestore.collection("EtatNR").ref;
  // Récupérer le document correspondant au champ "id" spécifié
  const queryV = collectionRef.where('NumC', '==', idoc);
  const querySnapshotV = await queryV.get();
  querySnapshotV.docs.forEach(doc => {
    doc.ref.update({
      client : client,
      timbre : timbre
    })
  });

  const queryNR = collectionRefNR.where('NumC', '==', idoc);
  const querySnapshotNR = await queryNR.get();
  querySnapshotNR.docs.forEach(doc => {
    doc.ref.update({
      client : client,
      Timbre : timbre
    })
  });



  }
}
