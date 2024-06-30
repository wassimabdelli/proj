import { Component, OnInit } from '@angular/core';
import { LoginService } from './LoginService/login.service';
import { Router } from '@angular/router';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email : string = '';
  password : string = '';
  name : string = '';
  LastName : string = '';
  DateBrit! : Date ;
  mdpRecup : any ;
  emailRecup : any ;
  p!: string
  m! : string;
  loading: boolean = false;
  constructor(private ls : LoginService , private router : Router  ) {
    emailjs.init('NLWkU3VzrBbZHeV4q');
   }

  ngOnInit(): void {
  }



  login()
  {
    if ( this.email =='' )
    {
      alert('Please enter your email');
      return;
    }else if ( this.password =='' )
    {
      alert('Please enter your password');
      return;
    }
    this.ls.getPass(this.email).subscribe(snapshots => {///////////////////////////////////////
          if ( snapshots.exists   )
          {
            this.mdpRecup = snapshots.data(); // Récupérer toutes les données du document
            this.mdpRecup = this.mdpRecup['password'];
           
            this.emailRecup = snapshots.data(); // Récupérer toutes les données du document
            this.emailRecup = this.emailRecup['email'];
           
            this.password = this.ls.encryptPassword(this.password,1)
            if ( this.email == this.emailRecup && this.password == this.mdpRecup )

            {
              this.router.navigate(['/home',this.email]);
            
            }else{
              alert("Mot de passe est inccorect")
            }
          }else{
            alert('Adresse Introuvable')
          }
          
        }, error => {
            console.error("Une erreur s'est produite :", error);
        });
       
    } 
  
 
  verif(e: Event) {
    if (this.email != '') {
    //  alert(this.email)
        e.preventDefault();
        // Activer l'icône de chargement
        this.loading = true;
        this.ls.getPass(this.email).subscribe(snapshots => {
          if( snapshots.exists )
          {
            this.mdpRecup = snapshots.data(); // Récupérer toutes les données du document
            this.mdpRecup = this.mdpRecup['password'];

            // Déplacer le code pour l'envoi de l'email à l'intérieur du bloc subscribe pour garantir que le code est exécuté après que les données sont récupérées
            this.m = JSON.stringify(this.mdpRecup);
            let mdp = this.ls.decryptPassword(this.m,1);
            const data = {
                Destinataire: this.email,
                message: mdp,
            };
            
            // Utiliser setTimeout pour retarder l'envoi de l'email de 5 secondes
            setTimeout(() => {
                emailjs
                    .send('service_taqdhdx', 'template_boay3io', data)
                    .then(
                        () => {
                          alert('merci de verifier votre email')
                            // Désactiver l'icône de chargement après l'envoi de l'email
                            this.loading = false;
                        },
                        (error) => {
                            console.log('FAILED...', error.text);
                            // Désactiver l'icône de chargement en cas d'erreur
                            this.loading = false;
                        },
                    );
                    this.loading = false;
            }, 2500);
            //  alert('adress introuvable')
             // Délai de 5 secondes (5000 millisecondes)
          }else{
            alert('Adresse Introuvable')
            this.loading = false;
          }
        }, error => {
          alert("Une erreur s'est produite ");
            // Désactiver l'icône de chargement en cas d'erreur
            this.loading = false;
        });
       
    } 
}
  

  }
  

