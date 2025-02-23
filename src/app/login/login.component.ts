import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


import {Router} from '@angular/router';
import { AuthStore } from '../services/auth.store';
import { MessagesService } from '../messages/messages.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authStore: AuthStore,
    private messagesService: MessagesService
    ) {

      console.log('LoginComponent Constructor...')
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {
    console.log('LoginComponent ngOnInit()...')
  }

  ngOnDestroy() {
    console.log('LoginComponent ngOnDestroy()...')
  }

  login() {
    const val = this.form.value;
    this.authStore.login(val.email, val.password).subscribe(
      () => {
        console.log('Successfully LoggedIn...');
        this.messagesService.showErrors(null);
        this.router.navigateByUrl('/courses')
      },
      err => {
        const message = 'Login Failed. Please check emailId and password.';
        console.log(message, err);
        this.messagesService.showErrors(message);
      }
    );
  }

}
