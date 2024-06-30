import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FactAService {

  constructor( private fireauth : AngularFireAuth ,  private firestore: AngularFirestore , private router : Router ) { }

  commandeInfo( docId: string) {

    return this.firestore.collection('Commande').doc(docId).get();
    
}

articleInfo() {
  return this.firestore.collection('Article').snapshotChanges(); 
}
IBM()
{
  return this.firestore.collection('IBM').doc('gjmZnHkOvgCiPrRNReTt').get();
}
 timestampToDate(timestamp: string): string {
  const seconds = parseInt(timestamp.split("seconds=")[1].split(",")[0]);
  const nanoseconds = parseInt(timestamp.split("nanoseconds=")[1].split(")")[0]);

  const milliseconds = seconds * 1000 + nanoseconds / 1000000;

  const date = new Date(milliseconds);

  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
}