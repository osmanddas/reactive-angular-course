import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";

@Injectable({ providedIn: 'root'} )
export class CoursesStore {

    private subject = new BehaviorSubject<Course[]>([]);

    courses$: Observable<Course[]> = this.subject.asObservable();

    constructor(
        private http: HttpClient,
        private loadingService: LoadingService,
        private messagesService: MessagesService
    ){
        console.log('CoursesStore Constructor...')
        this.loadAllCourses();
    }

    private loadAllCourses(){
        const loadCourses$ = 
        this.http.get<Course[]>('/api/courses').pipe(
            map(response => response['payload']),
            catchError(err => {
                const message = "Could not load Courses."
                this.messagesService.showErrors(message);
                console.log(message, err);
                return throwError(err);
            }),
            tap(courses => this.subject.next(courses))
        );

        const loading$ = this.loadingService.showLoaderUntilCompleted(loadCourses$); 
        // we have to subscribe to the Observable returned by above call else loading wheel won't show up
        loading$.subscribe();

    }

    filterByCategory(category: string): Observable<Course[]> {
        return this.courses$
        .pipe(
            map(
                (courses: any[]) => courses.filter(course => course.category == category).sort(sortCoursesBySeqNo)
            )            
        )
    }
}