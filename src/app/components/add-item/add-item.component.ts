import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/interfaces/Item';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  item: Item = { item: '', userEmail: '' };
  constructor(
    private is: ItemService,
    private toastr: ToastrService,
    private as: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // Adding Relevant UserEmail key to Item Document
    this.item.userEmail = this.as.getSessionData('email');
    // Adding Item to DB
    this.is.addItem(this.item).then(() => {
      this.toastr.success('המוצר נוסף בהצלחה!', '', {
        progressBar: true,
        closeButton: true,
        timeOut: 1500,
      });
      this.reset();
    });
  }

  // Resets Input
  reset(): void {
    this.item = { item: '' };
  }
}
