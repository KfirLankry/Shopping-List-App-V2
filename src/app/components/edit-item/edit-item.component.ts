import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/interfaces/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  @Input() id?: string;
  item: Item = { item: '' };
  constructor(
    private is: ItemService,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Check item Id and gets item details to edit button
    if (this.id) {
      this.is.getItemId(this.id).subscribe((itemData: Item) => {
        this.item = itemData;
      });
    }
  }

  // Updating Item
  updateItem(): void {
    this.is.updateItem(this.item).then(() => {
      this.activeModal.close();
      this.toastr.success('המוצר נערך בהצלחה!', '', {
        progressBar: true,
        closeButton: true,
        timeOut: 1500,
      });
    });
  }
}
