import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private fireauth : AngularFireAuth ,  private firestore: AngularFirestore , private router : Router ) { }

  
      getPass( docId: string) {

        return  this.firestore.collection('users').doc(docId).get();
        
    
  }



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

}
