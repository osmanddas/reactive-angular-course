import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>; // these are now not mutable objects.

  advancedCourses$: Observable<Course[]>; // these are now not mutable objects.

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.reloadCourses()
  }

  reloadCourses() {
      const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo))
      );
    //courses$.subscribe(values => console.log(values));
    // the higher the number of subscriptions, higher the number of API calls.
    this.beginnerCourses$ = courses$.pipe( map(courses => courses.filter(course => course.category === 'BEGINNER')));
    this.advancedCourses$ = courses$.pipe( map(courses => courses.filter(course => course.category === 'ADVANCED')));
  }

}




