import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private firestore: AngularFirestore , private router : Router) { }
  getCH( docId: string) {

    return  this.firestore.collection('Cheque').doc(docId).get();
    

}
update( docID :string , des : string , M : number , NF : string , dateCH : Date , rq : boolean )
{
  this.firestore.collection('Cheque').doc(docID).update({
    Designation: des,
    M : M,
    NCH : docID, 
    NF : NF ,
    dateCH : dateCH ,
    rq : rq
  })
  alert('Mise à jour du chèque N°' + docID + ' effectuée avec succès !');
}catch (error: any) {
  alert('Échec de la mise à jour du chèque. Veuillez réessayer.');
} 
}
