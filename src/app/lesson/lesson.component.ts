import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../model/lesson';

@Component({
    selector: 'lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.css'],
    standalone: false
})
export class LessonComponent implements OnInit {

    @Input() activeLesson: Lesson;

    constructor(){
        console.log('LessonComponent Constructor...')
    }

    ngOnInit(): void {
        console.log('LessonComponent ngOnInit()...')
    }

}
