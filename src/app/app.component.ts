import {Component, OnInit} from '@angular/core';
import { AuthStore } from './services/auth.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false,
    providers: [
    ]
})
export class AppComponent implements  OnInit {

    constructor(public authStore: AuthStore) {
      console.log('AppComponent Constructor...')
    }

    ngOnInit() {
      console.log('AppComponent ngOnInit()...')
    }

  logout() {
    this.authStore.logout();
  }

}
