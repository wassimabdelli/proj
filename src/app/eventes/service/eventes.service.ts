import { Injectable, Query } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventesService {

  constructor( private firestore : AngularFirestore , private router : Router  ) { }
  
  getVentes() {
    const date = new Date();
    const annee = date.getFullYear();
    const collection = "Ventes"+annee;
    return this.firestore.collection(collection).snapshotChanges();
  }

  getVentes01( annee : number )  {
    const collection = "Ventes"+annee;
    return this.firestore.collection(collection).snapshotChanges();
  }
  getVentes02( annee : number , mois : string , v : any[] ) : any{
        let Ventes: any[]
        v.length = 0;
        const collection = "Ventes"+annee;
        this.firestore.collection(collection).snapshotChanges().subscribe(snapshots => {
           Ventes = snapshots.map(snapshot => snapshot.payload.doc.data());
         for (var index = 0; index < Ventes.length; index++) {
          if (  (Ventes[index]['dateF']).toDate().toLocaleString('en-US', { month: 'long' }) == mois )
            {
              v.push(Ventes[index])
            }
         }
        })
  
        return v;
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


somme( annee : number , mois : string , v : any[] , v2 : any , v3 : any  ) {
  let Ventes: any[]
  v.length = 0;
  v2.length = 0 ; 
  v3.length = 0 ; 
  let s = 0
  const collection = "Ventes"+annee;
  this.firestore.collection(collection).snapshotChanges().subscribe(snapshots => {
     Ventes = snapshots.map(snapshot => snapshot.payload.doc.data());
   for (var index = 0; index < Ventes.length; index++) {
    if (  (Ventes[index]['dateF']).toDate().toLocaleString('en-US', { month: 'long' }) == mois )
      {
      v.push(parseFloat(Ventes[index]['MTTC']))
      v2.push(parseFloat(Ventes[index]['PTHT']))
      v3.push(parseFloat(Ventes[index]['MTVA']))
      }
      
   }

  })
  
}
somme1( annee : number ,  v : any[] , v2 : any , v3 : any  ) {
  let Ventes: any[]
  v.length = 0;
  v2.length = 0 ; 
  v3.length = 0 ; 
  const collection = "Ventes"+annee;
  this.firestore.collection(collection).snapshotChanges().subscribe(snapshots => {
     Ventes = snapshots.map(snapshot => snapshot.payload.doc.data());
   for (var index = 0; index < Ventes.length; index++) {
   
      v.push(parseFloat(Ventes[index]['MTTC']))
      v2.push(parseFloat(Ventes[index]['PTHT']))
      v3.push(parseFloat(Ventes[index]['MTVA']))
      
      
   }

  })

}

  }