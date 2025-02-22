import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {tap} from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    standalone: false
})
export class MessagesComponent implements OnInit {

  showMessages = false;

  errors$: Observable<string[]>;

  constructor(public messagesService: MessagesService) {
    console.log("Created Messages Component..")
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe( 
      tap(() => { this.showMessages = true; console.log('value of showMessages flag:', this.showMessages) } )   
    )

  }


  onClose() {
    this.showMessages = false;

  }

}
