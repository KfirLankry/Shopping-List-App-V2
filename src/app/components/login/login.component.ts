import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  user: User = { email: '', password: '' };
  constructor(
    private as: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Login with Email and Password
  submitLogin(): void {
    this.as
      .login(this.user)
      .then((data) => {
        this.as.setLocalData('email', data.user.email as string);
        this.as.setLocalData('isLoggedIn', 'true');
        this.router.navigateByUrl('home');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('אימייל או סיסמה שגויים', 'הודעה מערכת', {
          progressBar: true,
          closeButton: true,
          timeOut: 3000,
        });
      });
  }

  // Login with Google
  submitLoginWithGoogle(): void {
    this.as
      .loginWithGoogle()
      .then((data) => {
        this.as.setLocalData('email', data.user.displayName as string);
        this.as.setLocalData('isLoggedIn', 'true');
        this.toastr.success('נכנסת למערכת בהצלחה!', 'הודעה מערכת', {
          progressBar: true,
          closeButton: true,
          timeOut: 1500,
        });
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('כניסה לא בוצעה בהצלחה', 'הודעה מערכת', {
          progressBar: true,
          closeButton: true,
        });
      });
  }
}
