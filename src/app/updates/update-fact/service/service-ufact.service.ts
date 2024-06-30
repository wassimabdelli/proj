import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceUfactService {

  constructor( private fireauth : AngularFireAuth , private firestore : AngularFirestore , private router : Router ) { }

  update( date : Date , idoc : string )
  {
    const d = new Date();
    const annee = d.getFullYear();
    const collection = "FactA"+annee;
    this.firestore.collection(collection).doc(idoc).update({
      date: date,
    })
    .then(() => {
      alert('update Successful');
    })
    .catch((err) => {
      alert(err.message);
    });
  }
}

