import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { HelloService } from './hello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  public name = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  public message: string;

  constructor(
    private helloService: HelloService,
    private snackBar: MatSnackBar
  ) {}

  sayHello(): void {
    this.helloService.sayHello(this.name.value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((message: string) => {
        if (message) {
          this.snackBar.open(message, '', {
            duration: 2000
          });
        }
      });
  }

  ngOnDestroy() {
    console.log('ngOnDestory');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
