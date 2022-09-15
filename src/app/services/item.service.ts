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
import { Item } from '../interfaces/Item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  itemRef = collection(this.firestore, 'item');

  constructor(private firestore: Firestore) {}

  // Add Item
  addItem(item: Item): Promise<DocumentReference<Item>> {
    return addDoc(this.itemRef, item) as Promise<DocumentReference<Item>>;
  }

  // Get Item
  getItem(): Observable<Item[]> {
    return collectionData(this.itemRef, { idField: 'id' }) as Observable<
      Item[]
    >;
  }

  // Get Item by its ID
  getItemId(id: string): Observable<Item> {
    const itemRef = doc(this.firestore, `item/${id}`);
    return docData(itemRef, { idField: 'id' }) as Observable<Item>;
  }

  // Delete Item
  deleteItem(item: Item): Promise<void> {
    const itemRef = doc(this.firestore, `item/${item.id}`);
    return deleteDoc(itemRef) as Promise<void>;
  }

  // Delete All Items
  deleteAll(itemArr: Item[]): void {
    for (let item of itemArr) {
      if (item.userEmail == sessionStorage.getItem('email'))
        this.deleteItem(item);
    }
  }

  // Update Item
  updateItem(item: Item): Promise<void> {
    const bookRef = doc(this.firestore, `item/${item.id}`);
    return setDoc(bookRef, item) as Promise<void>;
  }
}
