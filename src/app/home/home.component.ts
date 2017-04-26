import { Component, OnInit,OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
numSubscription:Subscription;
timeoutSubscription:Subscription;
  constructor() { }

  ngOnInit() {
  const myNumbers = Observable.interval(1000);
    this.numSubscription=myNumbers.subscribe(
      (number:number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create((observer:Observer<string>) =>
      {
        setTimeout(()=>{
          observer.next("First package");
        },2000);
        setTimeout(()=>{
          observer.next("Second package");
        },4000);
        setTimeout(()=>{
          observer.error("Won't work.");
        },6000);
      });

    this.timeoutSubscription=myObservable.subscribe(
      (data:string)=>{console.log(data)},
      (error:string)=>{console.log(error)},
      () => {console.log("completed!");}
    );

  }

  ngOnDestroy(){
    this.numSubscription.unsubscribe();
    this.timeoutSubscription.unsubscribe();

  }

}
