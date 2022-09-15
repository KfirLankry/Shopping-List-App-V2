import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/interfaces/Item';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
})
export class ShowListComponent implements OnInit {
  counter: number = 0;
  items: Item[] = [];
  user: User[] = [];
  ifChecked = [];

  constructor(
    private is: ItemService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private us: UserService,
    private as: AuthService
  ) {}

  ngOnInit(): void {
    // Showing Items on screen
    this.is.getItem().subscribe((itemData: Item[]) => {
      this.items = itemData;
    });
  }

  iretatorIncrement(): number {
    this.counter++;
    return this.counter;
  }

  resetIretatorIncrement() {
    this.counter = 0;
    return '';
  }

  // Filtering items which posted by email
  itemChecker() {
    const filteredItems = this.items.filter(
      (item) => item.userEmail == this.returnSessionDataInfo()
    );
    return filteredItems;
  }

  // Returning which email is connected
  returnSessionDataInfo() {
    return this.as.getSessionData('email');
  }

  // Updating Item
  updateItem(item: Item) {
    const modalRef = this.modal.open(EditItemComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = item.id;
  }

  // Deleting Item
  deleteItem(item: Item) {
    if (confirm('האם למחוק את המוצר מהרשימה?')) {
      this.is.deleteItem(item).then(() => {
        this.toastr.error('המוצר נמחק בהצלחה!', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 1500,
        });
      });
    }
  }

  // Deletes all items
  deleteAll() {
    if (confirm('האם למחוק את כל הרשימת המוצרים?')) {
      this.is.deleteAll(this.items);
      this.toastr.error('רשימת המוצרים נמחקה בהצלחה!', '', {
        progressBar: true,
        closeButton: true,
        timeOut: 1500,
      });
    }
  }

  // Checkbox Event
  change(event: any) {
    if (event.target.checked == true) {
      // this.as.setLocalData('ifChecked', 'true');
      event.path[2].style.backgroundColor = '#cefad0';
      event.path[2].style.textDecoration = 'line-through';
    } else if (event.target.checked == false) {
      // this.as.setLocalData('ifChecked', 'false');
      event.path[2].style.backgroundColor = 'white';
      event.path[2].style.textDecoration = 'none';
    }
  }
}
