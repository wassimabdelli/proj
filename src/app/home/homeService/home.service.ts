import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private fireauth : AngularFireAuth , private firestore : AngularFirestore , private router : Router ) { }


  getCommandes() {
    
    return this.firestore.collection('Commande').snapshotChanges();
    
  }
  getFactA( NumC : string ) {
    const date = new Date();
    const annee = date.getFullYear();
    const collection = "FactA"+annee;
    return this.firestore.collection(collection).doc().get();
  }
  addFactA( NumC : string , NumF : number )
  {
    const date = new Date();
    const annee = date.getFullYear();
    const collection = "FactA"+annee;
    this.firestore.collection(collection).doc(NumF.toString()).set({
      NumC: NumC,
      NumF:NumF,
      date : new Date(),
      NumBL : 0
    })
    .then(() => {
      alert(' La commande Numero: '+NumC+' est Facturée');
    })
    .catch((err) => {
      alert(err.message);
    });
    this.firestore.collection('Commande').doc(NumC).update({
      NumF:NumF,
    })
    .then(() => {
      console.log('update NumF Successful');
    })
    .catch((err) => {
      alert(err.message);
    });
  }
  getNumF()
  {
    const date = new Date();
    const annee = date.getFullYear();
    const collection = "FactA"+annee;
    return this.firestore.collection(collection).snapshotChanges();
  }
async deleteC(id: string , collection : string ) {
  const collectionRef = this.firestore.collection(collection).ref;
  // Récupérer le document correspondant au champ "id" spécifié
  const query = collectionRef.where('NumC', '==', id);
  const querySnapshot = await query.get();
  // Vérifier si un document correspond à la requête
  if (querySnapshot.size === 0) {
    console.error(`Aucun document trouvé avec l'id: ${id}`);
    return;
  }
  // Supprimer le document correspondant
  querySnapshot.docs.forEach(doc => {
    doc.ref.delete();
  });
}


}
