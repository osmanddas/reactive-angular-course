import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Lesson} from '../model/lesson';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    standalone: false
})
export class CourseComponent implements OnInit {

  course: Course;

  lessons: Lesson[];

  constructor(private route: ActivatedRoute) {
    console.log('Course Constructor...')

  }

  ngOnInit() {
    console.log('Course ngOnInit()...')
  }

}











