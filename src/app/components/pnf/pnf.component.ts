import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-pnf',
  templateUrl: './pnf.component.html',
  styleUrls: ['./pnf.component.css'],
})
export class PnfComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  back() {
    history.back();
  }
}
