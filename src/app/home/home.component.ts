import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>; // these are now not mutable objects.

  advancedCourses$: Observable<Course[]>; // these are now not mutable objects.

  constructor(
    private coursesService: CoursesService, 
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
  }

  ngOnInit() {
    this.reloadCourses()
  }

  reloadCourses() {

    //this.loadingService.loadingOn();
      const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
        catchError(err => {
          const message = "Could not load courses";
          this.messagesService.showErrors(message);
          console.log(message, err);
          return throwError(err); // ensuring that original observable chain is terminated; 
          // here we are creating a new Observable of error terminating the original one which could not complete
        })
        //, finalize(() => this.loadingService.loadingOff())
      );

      const laodCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    //courses$.subscribe(values => console.log(values));
    // the higher the number of subscriptions, higher the number of API calls.
    this.beginnerCourses$ = laodCourses$.pipe( map(courses => courses.filter(course => course.category === 'BEGINNER')));
    this.advancedCourses$ = laodCourses$.pipe( map(courses => courses.filter(course => course.category === 'ADVANCED')));
  }

}




