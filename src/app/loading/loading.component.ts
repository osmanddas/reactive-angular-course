import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css'],
    standalone: false
})
export class LoadingComponent implements OnInit {

  constructor(public loadingService: LoadingService) {
    console.log('LoadingComponent Constructor...')
  }

  ngOnInit() {
    console.log('LoadingComponent ngOnInit()...')
  }
  
}
