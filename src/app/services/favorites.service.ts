import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  userID: string = '';

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.user.subscribe(v => {
      this.userID = v ? v.uid : null
    });
  }

  addFavorite(name: string, url: string, type: string, phoneNumber: number) {
    this.afs.collection('favorites').add({
      userId: this.userID,
      name: name,
      url: url,
      type: type,
      phoneNumber: phoneNumber
    })
  }

  deleteFavorite(id) {
    this.afs.collection('favorites').doc(id).delete();
  }
}
