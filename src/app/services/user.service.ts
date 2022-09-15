import { Injectable } from '@angular/core';
import {
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { addDoc, collection, DocumentReference } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // User Reference (User Collection)
  userRef = collection(this.firestore, 'user');

  constructor(private firestore: Firestore) {}

  // Adding user to User Collection via userRef Variable
  addUser(user: User): Promise<DocumentReference<User>> {
    return addDoc(this.userRef, user) as Promise<DocumentReference<User>>;
  }

  // Get User from User Collection
  getUser(): Observable<User[]> {
    return collectionData(this.userRef, { idField: 'id' }) as Observable<
      User[]
    >;
  }
}
