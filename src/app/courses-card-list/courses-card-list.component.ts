import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
  standalone: false

})
export class CoursesCardListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() private courseChanged = new EventEmitter();

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
      
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    
    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val), // for successful course saved
        tap(() => this.courseChanged.emit()) // tap operator is used for emitting side effects
      ).subscribe();

  }
}
