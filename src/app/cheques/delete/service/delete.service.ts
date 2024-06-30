import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor( private firestore: AngularFirestore , private router : Router) { }

  getCH( docId: string) {

    return  this.firestore.collection('Cheque').doc(docId).get();
    

}

  async deleteCH( docID : string )
{
  try {
    await this.firestore.collection('Cheque').doc(docID).delete();
    console.log('Document successfully deleted.');
    // You can also display an alert to the user here
    alert('Document successfully deleted.');
  } catch (error) {
    console.error('Error deleting document:', error);
    // You can also display an alert to the user here
    alert('Error deleting document: '+error);
  }

}

}
