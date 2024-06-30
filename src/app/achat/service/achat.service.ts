import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  constructor( private firestore : AngularFirestore ) { }

  addAchat( NF : string , date : Date ,client : string , PTHT : number , TVA : number , timbre : number ,  TTC: number  )
  {
    const d = new Date();
    const annee = d.getFullYear();
    const collection = "Achats"+annee;
    const doc = NF.toLowerCase() + client.toLowerCase()  
      this.firestore.collection(collection).doc(doc).set({
      NF : NF ,      
      date: date,
      client:client,
      PTHT : PTHT,
      TVA : TVA ,
      timbre : timbre,
      TTC : TTC    
    })
    .then(() => {
      alert(' La Facture d\'achat est stocker avec succées');
    })
    .catch((err) => {
      alert(err.message);
    });
  }

  DocsId() 
  {
    const d = new Date();
    const annee = d.getFullYear();
    const collection = "Achats"+annee;
    return this.firestore.collection(collection).snapshotChanges()
  }

}
