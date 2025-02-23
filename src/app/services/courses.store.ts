import { ErrorHandler, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
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
        // we have to subscribe to the Observable returned by above call else nothing will happen i.e. no data will be shown on the UI
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

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any>{
        // modify our data in memory first
        const courses = this.subject.getValue();
        const index = courses.findIndex(course => course.id == courseId) 
        // merge the changes
        const updatedCourse: Course = {
            ...courses[index],
            ...changes
        }
        const updatedCourses: Course[] = courses.slice(0); // creates a new Array from index 0
        updatedCourses[index] = updatedCourse;
        this.subject.next(updatedCourses); // emit these changes so that app components can receive the changes.
        return this.http.put(`/api/courses/${courseId}`, changes).pipe(
            catchError(err => {
                const message = 'Could not save Course';
                console.log(message, err);
                this.messagesService.showErrors(message);
                return throwError(err);
            }),
            tap(course => console.log('Saved Course Changes', course)),
            shareReplay() // call shareReplay to prevent multiple calls to the put call by multiple subscriptions to the returned Observable 
        )

    }
}