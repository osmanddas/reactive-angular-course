import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.service';


@Component({
    selector: 'course',
    templateUrl: './search-lessons.component.html',
    styleUrls: ['./search-lessons.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SearchLessonsComponent implements OnInit {

  searchResults$: Observable<Lesson[]>;
  activeLesson: Lesson;

  constructor(private coursesService: CoursesService) {
    console.log('SearchLessonsComponent Constructor...')

  }

  ngOnInit() {
    console.log('SearchLessonsComponent ngOnInit()...')

  }

  onSearch(searchString: string) {
    console.log('SearchLessonsComponent:onSearch, search str: ', searchString)
    this.searchResults$ = this.coursesService.searchLessons(searchString);
  }

  openLesson(lesson: Lesson){
    this.activeLesson = lesson;
  }

  onBackToSearch(){
    this.activeLesson = null;
  }

}











