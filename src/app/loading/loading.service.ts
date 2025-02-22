import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {

    // Subject is similar to Observable, with a difference that it can emit value. the BahaviorSubject remembers the last value emitted.
    private loadingSubject = new BehaviorSubject<boolean>(false); 

    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T>{
        return of(null).pipe(
            tap(() => this.loadingOn()),
            concatMap(() => obs$),
            finalize(() => this.loadingOff())
        )
        //return undefined;
    }

    constructor(){
        console.log('LoadingService Constructor...')
    }

    loadingOn() {
        this.loadingSubject.next(true)
    }

    loadingOff() { 
        this.loadingSubject.next(false)       
    }
}