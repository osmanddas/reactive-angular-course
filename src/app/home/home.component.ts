import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import { CoursesStore } from '../services/courses.store';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>; // these are now not mutable objects.

  advancedCourses$: Observable<Course[]>; // these are now not mutable objects.

  constructor(private coursesStore: CoursesStore) {
    console.log('HomeComponent Constructor...')
  }

  ngOnInit() {
    console.log('HomeComponent ngOnInit()...')
    this.reloadCourses()
  }

  reloadCourses() {
    this.beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER');
    this.advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED'); 
  }

}




