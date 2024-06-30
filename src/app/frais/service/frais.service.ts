import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  constructor(private firestore : AngularFirestore ) { }
  addFrais( NF : string , date : Date ,des : string , M: number , )
  {
    const d = new Date();
    const annee = d.getFullYear();
    const collection = "Frais"+annee;
    this.firestore.collection(collection).doc().set({
      NF : NF ,      
      Designation:des,
      date: date,
      M : M  
      
    })
    .then(() => {
      alert(' Le frais est stocker avec succées');
    })
    .catch((err) => {
      alert(err.message);
    });
  }
  getFraisID()
 {
  const d = new Date();
    const annee = d.getFullYear();
    const collection = "Frais"+annee;
   return this.firestore.collection(collection).snapshotChanges();
 }

 getFrais( annee : number , mois : string , v : any[] ) : any{
  let Ventes: any[]
  v.length = 0;
  const collection = "Frais"+annee;
  this.firestore.collection(collection).snapshotChanges().subscribe(snapshots => {
     Ventes = snapshots.map(snapshot => snapshot.payload.doc.data());
   for (var index = 0; index < Ventes.length; index++) {
    if (  (Ventes[index]['date']).toDate().toLocaleString('en-US', { month: 'long' }) == mois )
      {
        v.push(Ventes[index])
      }
   }
  })

  return v;
}


somme( annee : number , mois : string , v : any[]   ) {
  let Ventes: any[]
  v.length = 0;
  const collection = "Frais"+annee;
  this.firestore.collection(collection).snapshotChanges().subscribe(snapshots => {
     Ventes = snapshots.map(snapshot => snapshot.payload.doc.data());
   for (var index = 0; index < Ventes.length; index++) {
    if (  (Ventes[index]['date']).toDate().toLocaleString('en-US', { month: 'long' }) == mois )
      {
      v.push(parseFloat(Ventes[index]['M']))
     
      }
      
   }

  })
  
}
somme1( annee : number ,  v : any[] ) {
  let Ventes: any[]
  v.length = 0;
  let s = 0
  const collection = "Frais"+annee;
  this.firestore.collection(collection).snapshotChanges().subscribe(snapshots => {
     Ventes = snapshots.map(snapshot => snapshot.payload.doc.data());
   for (var index = 0; index < Ventes.length; index++) {
   
      v.push(parseFloat(Ventes[index]['M']))
      
   }

  })
}





}
