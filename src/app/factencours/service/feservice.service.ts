import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeserviceService {

  constructor( private fireauth : AngularFireAuth , private firestore : AngularFirestore , private router : Router ) { }

  
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

commandeInfo( docId: string) {

  return this.firestore.collection('Commande').doc(docId).get();
  
}

articleInfo() {

return this.firestore.collection('Article').snapshotChanges();

}

addET( NumC : string , NumF : number , dateF : Date , client : string , PTHT : string , MTVA : string , 
  timbre : number , MTTC : string
   ) 
{
  const date = new Date();
  const annee = date.getFullYear();
  const collection = "Ventes"+annee;
  this.firestore.collection(collection).doc(NumF.toString()).set({
   NumC: NumC,
   NumF: NumF,
   dateF: dateF,
   client: client,
   PTHT: PTHT,
   MTVA : MTVA ,
   timbre : timbre,
   MTTC : MTTC
 })
 .then(() => {
   alert('La facture est ajoutée a l\'etat des ventes:');
 })
 .catch((err) => {
   alert(err.message);
 });
}




addNR( NumC : string , NumF : number , dateF : Date , client : string , PTHT : string , MTVA : string , 
  timbre : number , MTTC : string
   ) 
{
 
  this.firestore.collection("EtatNR").doc(NumF.toString()).set({
   NumC: NumC,
   NumF: NumF,
   dateF: dateF,
   client: client,
   PTHT: PTHT,
   MTVA : MTVA ,  
   timbre : timbre,
   MTTC : MTTC,
   Reg : false
 })
 .then(() => {
   alert('La facture est ajoutée a l\'etat des factures non réglée');
 })
 .catch((err) => {
   alert(err.message);
 });
}

}
