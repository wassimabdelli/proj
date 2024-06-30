import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlServiceService } from '../bl/bl-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HomeService } from '../home/homeService/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() email!: string;
  constructor(private HS: HomeService , private firestore : AngularFirestore , private router : Router , private BS : BlServiceService , 
    private route : ActivatedRoute) {
    }

  ngOnInit(): void {
  
  }

}
