import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { FavoritesService } from '../services/favorites.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router, private FavoritesService: FavoritesService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(v => {
      this.router.navigate(["/favorites"])
    })
    .catch(err => {

    });
  }

}
