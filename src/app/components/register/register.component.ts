import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = { email: '', password: '' };
  constructor(
    private toastr: ToastrService,
    private as: AuthService,
    private router: Router,
    private us: UserService
  ) {}

  ngOnInit(): void {}

  // Register With Email and Password
  submitRegister() {
    this.as
      .register(this.user)
      .then((data) => {
        this.us.addUser(this.user).then(() => {
          this.toastr.success('המוצר נוסף בהצלחה!', '', {
            progressBar: true,
            closeButton: true,
            timeOut: 1500,
          });
        });
        this.as.setSessionData('email', data.user.email as string);
        this.as.setSessionData('isLoggedIn', 'true');
        this.toastr.success('הרשמה למערכת בוצעה בהצלחה!!', 'הודעה מערכת', {
          progressBar: true,
          closeButton: true,
          timeOut: 1500,
        });
        this.router.navigateByUrl('home');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('דוא"ל זה כבר רשום במערכת', 'הודעה מערכת', {
          progressBar: true,
          closeButton: true,
        });
      });
  }
}
