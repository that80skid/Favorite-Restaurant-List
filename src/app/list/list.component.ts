import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { FavoritesService } from '../services/favorites.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  name: string;
  url: string;
  type: string;
  phoneNumber: number;
  favorites: Array<Object>;
  userID$ = new Subject<string>();
  favorites$ = this.userID$.pipe(
    switchMap(uid => {
      return this.afs.collection('favorites', ref => ref.where('userID', '==', uid)).valueChanges({idField: 'id'})
    })
  )

  constructor(private FavoritesService: FavoritesService, private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.user.subscribe(v => {
      this.userID$.next(v ? v.uid : null);
    })
    this.favorites$.subscribe(val => this.favorites = val);
  }
  ngOnInit(): void {
  }

  deleteFavorite(id) {
    this.FavoritesService.deleteFavorite(id)
  }

  addFavorite() {
    this.FavoritesService.addFavorite(this.name, this.url, this.type, this.phoneNumber)
  }

}
