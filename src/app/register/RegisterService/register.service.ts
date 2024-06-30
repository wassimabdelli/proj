import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private fireauth : AngularFireAuth , private firestore : AngularFirestore , private router : Router ) { }
///////////////////////////////Fonction cryptage//////////////////////////////////////////////////////////////////////////////////
   encryptPassword(password: string, shift: number): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let encryptedPassword = "";
    for (let i = 0; i < password.length; i++) {
        const char = password[i];
        const index = alphabet.indexOf(char);
        if (index !== -1) {
            const newIndex = (index + shift) % alphabet.length;
            encryptedPassword += alphabet[newIndex];
        } else {
            encryptedPassword += char; // Conserver les caractères spéciaux tels quels
        }
    }
    return encryptedPassword;
}
  //////////////////////////////////////////////////Fonction decryptage////////////////////////////////////////////////////////////////
   decryptPassword(encryptedPassword: string, shift: number): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let decryptedPassword = "";
    for (let i = 0; i < encryptedPassword.length; i++) {
        const char = encryptedPassword[i];
        const index = alphabet.indexOf(char);
        if (index !== -1) {
            let newIndex = (index - shift) % alphabet.length;
            if (newIndex < 0) {
                newIndex += alphabet.length;
            }
            decryptedPassword += alphabet[newIndex];
        } else {
            decryptedPassword += char; // Conserver les caractères spéciaux tels quels
        }
    }
    return decryptedPassword;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    register( email : string , password : string , nom : string , prenom : string , tel : number , img : string  )
  {
   /* this.fireauth.createUserWithEmailAndPassword(email,password).then((userCredential)=> {
      const user = userCredential.user;
      const userId = user!.uid;*/
      const mdp = this.encryptPassword(password , 1);
      this.firestore.collection('users').doc(email).set({
        nom: nom,
        prenom: prenom,
        email : email,
        tel: tel,
        img: img,
        password : mdp
      })
        .then(() => {
          alert('Registration Successful');
          this.router.navigate(['/login']);
        })
        .catch((err) => {
          alert(err.message);
          this.router.navigate(['/register']);
        });
    
  }
 getUsers()
 {
  return this.firestore.collection('users').snapshotChanges();
 }
}
