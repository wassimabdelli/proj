import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private fireauth : AngularFireAuth , private firestore : AngularFirestore , private router : Router ) { }

  NumBL()
  {
    const date = new Date();
    const annee = date.getFullYear();
    const collection = "BL"+annee;
    return this.firestore.collection(collection).snapshotChanges();
  }

  getBL() {
    const date = new Date();
    const annee = date.getFullYear();
    const collection = "BL"+annee
    return this.firestore.collection(collection).snapshotChanges();
  }
  getBLA( annee : number ) {
    const collection = "BL"+annee;
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
