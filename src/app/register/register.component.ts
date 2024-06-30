import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { RegisterService } from './RegisterService/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  file! : File
  selectedFile!: string;
  //////////////////////
  email! : string ;
  password! : string ;
  nom! : string 
  prenom! : string;
  tel!  : number ;
  private img! :string;
  isSpinnerVisible = false;
  Users: any[] = [];
  arrayEmail: any[] = [];
  //////////////////////
  constructor(private storage: AngularFireStorage,private Rs : RegisterService) {}

  ngOnInit(): void {

    this.Rs.getUsers().subscribe(snapshots => {
      this.Users = snapshots.map(snapshot => snapshot.payload.doc.data());
      for (let index = 0; index <this.Users.length; index++) {
        const e = ( this.Users[index]['email'] )
        this.arrayEmail[index] = e
      }
  });    

  }


  upload(event: any) {
    this.file = event.target.files[0];
    //this.uploadFile(file);
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile = reader.result as string;
        const storageRef = this.storage.ref('users/' + this.file.name);
    storageRef.put(this.file).then((snapshot) => {
     // console.log('Image uploaded successfully!');
      // le code qui donne la path de l'image dans storage
      snapshot.ref.getDownloadURL()
      .then((downloadURL) => {
        console.log('Image URL:', downloadURL);
        this.img = downloadURL;
        console.log(this.img)
          // Log the URL to the console
      })
     ////////////////////////////////////
    })
      };
    }
  }
  register()
  {
    
    if ( this.email =='' )
    {
      alert('Please enter your email');
      return;
    }else if ( this.password =='' )
    {
      alert('Please enter your password');
      return;
    }else if (this.arrayEmail.includes(this.email) )
      {
        alert(' Cette email est utiliser dans un autre compte ')
      }
    this.Rs.register(this.email,this.password,this.nom,this.prenom,this.tel,this.img);
    this.email = '';
    this.password = '';
  }



}
