import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { repeat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private fireauth : AngularFireAuth , private firestore : AngularFirestore , private router : Router ) { }



  getFactA( annee : number ) {
    const collection = "FactA"+annee;
    return this.firestore.collection(collection).snapshotChanges();
  }
  getFactA1(  ) {
    const date = new Date();
    const annee = date.getFullYear();
    const collection = "FactA"+annee;
    return this.firestore.collection(collection).snapshotChanges();
  }
  getBL() {
    const date = new Date();
    const annee = date.getFullYear();
    const collection = "BL"+annee
    return this.firestore.collection(collection).snapshotChanges();
  }
 BLGlobal( NumF : number , NumC : string , NumBL : number   )
 {
 
  const date = new Date();
  const annee = date.getFullYear();
  const collection = "BL"+annee;
  this.firestore.collection(collection).doc(NumBL.toString()).set({
    NumC: NumC,
    NumF:NumF,
    NumBL : NumBL , 
    date : new Date(),
    Cat : "G"
  })
  .then(() => {
    alert(' Le BL est ajoutée  ');
  })
  .catch((err) => {
    alert(err.message);
  });
  let C = "FactA"+annee
  // update num bl dans la collection facture
  this.firestore.collection(C).doc(NumF.toString()).update({
    NumBL : NumBL , 
  })
// update num bl dans la collection comande
  this.firestore.collection('Commande').doc(NumC.toString()).update({
    NumBL : NumBL , 
  })  
 }
 getNumBL()
 {
   const date = new Date();
   const annee = date.getFullYear();
   const collection = "BL"+annee;
   return this.firestore.collection(collection).snapshotChanges();
 }


 getNumFcours()
 {
  return this.firestore.collection("FECours").snapshotChanges();
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

maxTab( x : number , tab : any[] )
{
 tab.sort()
 if ( tab[ tab.length - 1 ] === x  )
  {
    return true
  }else{
    return false
  }
}
commandeInfo( docId: string) {

  return this.firestore.collection('Commande').doc(docId).get();
  
}

articleInfo() {

return this.firestore.collection('Article').snapshotChanges();


}
 addFcours( c :string , f : number , m : string )
 {
  
    this.firestore.collection("FECours").doc(c).set({
       NumC: c,
       NumF : f,
       MTTC : m
     })
 }
}
