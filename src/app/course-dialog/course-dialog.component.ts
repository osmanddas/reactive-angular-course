import {AfterViewInit, Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    standalone: false,
    providers: [
        LoadingService,
        MessagesService
        // Different instance of LoadingService, and MessagesService for CourseDialogComponent since it doesn't come under application root.
        // Note that separate loading, and messages selectors are added to the course-dialog-component template.
    ]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;
    course:Course;

    constructor(
        private fb: FormBuilder, 
        private dialogRef: MatDialogRef<CourseDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) course:Course,
        //private courseService: CoursesService,
        private coursesStore: CoursesStore,
        //private loadingService: LoadingService,
        private messagesService: MessagesService        
        // Note that although loadingService, and messagesService are declared at the applicaiton root level (app component)
        // however, the CourseDialogComponent is opened by Material Dialog which is not under app root. Hence we are giving 
        // CourseDialogComponent different instances of these services..
    ) {
        console.log('CourseDialogComponent Constructor...')
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {
        console.log('CourseDialogComponent ngAfterViewInit()...')
    }

    save() {
      const changes = this.form.value;

      const saveCourses$ = this.coursesStore.saveCourse(this.course.id, changes)

      /*

      // Error handling won't work here as we are closing the dialog immediately after save is clicked.
      .pipe(
        catchError(err => {
            const message = "Could not save Course";
            console.log(message, err)
            this.messagesService.showErrors(message);
            return throwError(err)
        })
      );
        */
      /*
      this.courseService.saveCourse(this.course.id, changes).subscribe(
        (val) => this.dialogRef.close(val)
      )*/
      
    /*
    // LoadingService will no longer be called from the Dialog to improve user experience as loading blocks users to perform activity.

      this.loadingService.showLoaderUntilCompleted(saveCourses$).subscribe(
        (val) => this.dialogRef.close(val)
    )*/

      // subscribe to the Observable now since call to the loading was eliminated.
      saveCourses$.subscribe()
      this.dialogRef.close(changes)

    }

    close() {
        this.dialogRef.close();
    }
}
