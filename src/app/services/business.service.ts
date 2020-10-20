import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire';
import { from } from 'rxjs';
import { AngularFirestore} from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  userID: string = '';


  constructor(private BusinessService: BusinessService, private auth: AngularFireAuth, private afs: AngularFirestore) { }
  this.auth.user.subscribe(v=> {
    this.userID = v ? v.uid : null
  });
 }
 addRestaurant(title: string, description: string){
  this.afs.collection('todos').add({
    userId: this.userID,
    title: title,
    description: description
  })
 }
 deleteRestaurant(id){
  this.afs.collection('todos').doc(id).delete();
 }
}
