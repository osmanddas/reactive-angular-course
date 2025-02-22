import {AfterViewInit, Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

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
        private courseService: CoursesService,
        private loadingService: LoadingService,
        private messagesService: MessagesService        
        // Note that although loadingService, and messagesService are declared at the applicaiton root level (app component)
        // however, the CourseDialogComponent is opened by Material Dialog which is not under app root. Hence we are giving 
        // CourseDialogComponent different instances of these services..
    ) {
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {
    }

    save() {
      const changes = this.form.value;

      const saveCourses$ = this.courseService.saveCourse(this.course.id, changes)
      .pipe(
        catchError(err => {
            const message = "Could not save Course";
            console.log(message, err)
            this.messagesService.showErrors(message);
            return throwError(err)
        })
      );

      /*
      this.courseService.saveCourse(this.course.id, changes).subscribe(
        (val) => this.dialogRef.close(val)
      )*/
          
      this.loadingService.showLoaderUntilCompleted(saveCourses$).subscribe(
        (val) => this.dialogRef.close(val)
      )

    }

    close() {
        this.dialogRef.close();
    }
}
