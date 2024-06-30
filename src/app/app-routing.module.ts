import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CommandeComponent } from './commande/commande.component';
import { FactAutoComponent } from './Facture/fact-auto/fact-auto.component';
import { BLComponent } from './bl/bl.component';
import { AllfactureComponent } from './Facture/allfacture/allfacture.component';
import { AllblComponent } from './bl/allbl/allbl.component';
import { AddBLComponent } from './bl/add-bl/add-bl.component';
import { FactencoursComponent } from './factencours/factencours.component';
import { EVentesComponent } from './eventes/eventes.component';
import { NRComponent } from './nr/nr.component';
import { UpdateFactComponent } from './updates/update-fact/update-fact.component';
import { UpdateCComponent } from './updates/update-c/update-c.component';
import { UpdateBLComponent } from './updates/update-bl/update-bl.component';
import { ChequesComponent } from './cheques/cheques.component';
import { UpdateComponent } from './cheques/update/update.component';
import { DeleteComponent } from './cheques/delete/delete.component';
import { FraisComponent } from './frais/frais.component';
import { AchatComponent } from './achat/achat.component';

const routes: Routes = [
  { path : '' , redirectTo : 'login' , pathMatch : 'full' },
  { path : 'login', component : LoginComponent },
  { path : 'register' , component : RegisterComponent },
  { path : 'home/:email' , component : HomeComponent },
  { path : 'commande/:email' , component : CommandeComponent },
  { path : 'FactA/:NumC/:email' , component : FactAutoComponent },
  { path : 'BL/:NumC/:email' , component : BLComponent },
  { path : 'allFact/:email' , component :AllfactureComponent }, 
  { path : 'allBL/:email' , component :AllblComponent },
  { path : 'fcours/:email' , component :FactencoursComponent },
  { path : 'addbl/:email' , component : AddBLComponent },
  { path : 'EVentes/:email' , component : EVentesComponent },
  { path : 'EtatNR/:email' , component : NRComponent },
  { path : 'updateF/:email/:date/:NumF', component : UpdateFactComponent },
  { path : 'updateC/:email/:date/:client/:timbre/:NumC' , component : UpdateCComponent },
  { path : 'updateBL/:email/:date/:NumBL' , component : UpdateBLComponent },
  { path : 'cheques/:email' , component : ChequesComponent },
  { path : 'updateCheque/:email/:IDC' , component : UpdateComponent },
  { path : 'deleteCheque/:email/:IDC' , component : DeleteComponent },
  { path : 'frais/:email' , component : FraisComponent },
  { path : 'achats/:email' , component : AchatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
