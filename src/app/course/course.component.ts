import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Lesson} from '../model/lesson';
import { combineLatest, Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { map, startWith, tap } from 'rxjs/operators';

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CourseComponent implements OnInit {

  data$: Observable<CourseData>;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {
    console.log('Course Constructor...')

  }

  ngOnInit() {
    console.log('Course ngOnInit()...')

    const courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

    const course$ = this.coursesService.loadCoursesById(courseId).pipe(
      startWith(null)
    );
    const lessons$ = this.coursesService.loadAllCourseLessons(courseId).pipe(
      startWith([])
    );

      this.data$ = combineLatest([course$, lessons$]).pipe( // combineLatest will start emiting values only when all the Observables have emitted their respective values. 
        map(([course, lessons]) => {
          return {
            course,
            lessons
          }
        }),
        tap(console.log)
      );
  }

}











