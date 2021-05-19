import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  backToOrigin() {
    this.location.back();
  }

  recoveryAccount() {
    this.userService.userRecoveryAccount(this.email).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
