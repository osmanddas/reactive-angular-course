import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable() // not a global singleton i.e. there may be more than one message service instances. 
export class MessagesService {

    private subject = new BehaviorSubject<string[]>([]);

    errors$: Observable<string[]> = this.subject.asObservable().pipe(
        filter(messsages => messsages && messsages.length > 0)
    );

    showErrors(...errors: string[]){
        this.subject.next(errors);
    }
}