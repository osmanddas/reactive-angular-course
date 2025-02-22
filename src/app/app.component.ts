import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false,
    providers: [
    ]
})
export class AppComponent implements  OnInit {

    constructor() {
      console.log('AppComponent Constructor...')
    }

    ngOnInit() {
      console.log('AppComponent ngOnInit()...')
    }

  logout() {
  }

}
