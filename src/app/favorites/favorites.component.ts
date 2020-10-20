import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { FavoritesService } from '../services/favorites.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  name: string;
  url: string;
  type: string;
  phoneNumber: number;
  address: string;
  favorites: Array<Object>
  userID$ = new Subject<string>();
    favorites$ = this.userID$.pipe(
      switchMap(uid => {
        return this.afs.collection('favorites', ref => ref.where(userId, '==' uid)).valueChanges.({idField: 'id'})
      })
    )

  constructor(private favoritesService: FavoritesService, private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.user.subscribe(v => {
      this.userID$.next( v ? v.uid : null);
    });
  }

  ngOnInit(): void {
  }

  deleteFavorite(id) {
    this.favoritesService.deleteFavorite(id)
  }

  addFavorite() {
    this.favoritesService.addFavorite(this.name, this.url, this.type, this.phoneNumber, this.address)
  }
}
