import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { filter, map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private http: HttpClient) {

    }

    loadCoursesById(courseId: number):Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseId}`).pipe(
            shareReplay()
        )
    }

    loadAllCourseLessons(courseId: number): Observable<Lesson[]> {
        return this.http.get<Lesson[]>('/api/lessons', {
            params: {
                courseId: courseId.toString(),
                pageSize: "10000"
            }
        }).pipe(
            map(response => response["payload"]),
            shareReplay()
        );
    }

    loadAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>("/api/courses")
            .pipe(
                map(res => res["payload"]),
                shareReplay() // prevents duplicate http calls
            );
    }

    saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
        return this.http.put(`/api/courses/${courseId}`, changes).pipe(
            shareReplay()
        )          
    }

    searchLessons(searchString: string): Observable<Lesson[]> {
        return this.http.get<Lesson[]>('/api/lessons', {
            params: {
                filter: searchString,
                pageSize: "100"
            }
        }).pipe(
            map(response => response["payload"]),
            shareReplay()
        );
    }
}