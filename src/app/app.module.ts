import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire/compat"  ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CommandeComponent } from './commande/commande.component';
import { FactAutoComponent } from './Facture/fact-auto/fact-auto.component';
import { FactManuelComponent } from './Facture/fact-manuel/fact-manuel.component';
import { BLComponent } from './bl/bl.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AllfactureComponent } from './Facture/allfacture/allfacture.component';
import { AllblComponent } from './bl/allbl/allbl.component';
import { AddBLComponent } from './bl/add-bl/add-bl.component';
import { FactencoursComponent } from './factencours/factencours.component';
import { EVentesComponent } from './eventes/eventes.component';
import { NRComponent } from './nr/nr.component';
import { UpdateFactComponent } from './updates/update-fact/update-fact.component';
import { UpdateBLComponent } from './updates/update-bl/update-bl.component';
import { UpdateCComponent } from './updates/update-c/update-c.component';
import { ChequesComponent } from './cheques/cheques.component';
import { DeleteComponent } from './cheques/delete/delete.component';
import { UpdateComponent } from './cheques/update/update.component';
import { FraisComponent } from './frais/frais.component';
import { AchatComponent } from './achat/achat.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CommandeComponent,
  
    FactAutoComponent,
    FactManuelComponent,
    BLComponent,
    NavbarComponent,
    AllfactureComponent,
    AllblComponent,
    AddBLComponent,
    FactencoursComponent,
    EVentesComponent,
    NRComponent,
    UpdateFactComponent,
    UpdateBLComponent,
    UpdateCComponent,
    ChequesComponent,
    DeleteComponent,
    UpdateComponent,
    FraisComponent,
    AchatComponent,
  

  
 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'IBM-Backend'),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
