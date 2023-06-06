import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  Subject,
  catchError,
  delay,
  delayWhen,
  filter,
  interval,
  map,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'OnChangesApp';

  randomSubject = new Subject<number>();
  randomObservable = this.randomSubject.asObservable();

  constructor(private cd: ChangeDetectorRef) {
    this.randomObservable
      .pipe(
        filter((value) => value < 100),
        tap((value) => {
          console.log('tap-1', value);
          return value;
        }),
        map((value) => value * 2),
        tap((value) => {
          console.log('tap-2', value);

          if (value % 2 == 0) {
            console.log('err');
            throw new Error('1 e kalanlı bölüm');
          }

          return value;
        }),
        catchError((err) => {
          console.log('err', err);
          return err;
        })
      )
      .subscribe((val) => {
        console.log('valueChange', val);
      });
  }

  val: number = 0;

  obj = {
    id: 1,
    name: 'ali',
  };

  arr: any[] = [
    { id: 1, name: 'ali' },
    { id: 2, name: 'can' },
  ];

  pushArray() {
    this.arr.push({ id: 1, name: 'mustafa' });
    console.log('arr', this.arr);
  }

  pushSpreadArray() {
    this.arr = [...this.arr, 'ali'];
    console.log('arr', this.arr);
  }

  changeObject() {
    this.obj.name = 'can';
    console.log('changeObject', this.obj);
  }

  changeObject2() {
    this.obj.name = 'can';
    this.obj = { ...this.obj };
  }

  removeSpreadArray() {
    this.arr = [...this.arr.filter((x) => x.id != 2)];
    console.log('removeSpreadArray', this.arr);
  }

  removeArray() {
    this.arr.splice(0, 1);
    console.log('removeArray', this.arr);
  }

  changeValue() {
    this.val = 1;
  }

  changeTitleValue() {
    this.randomSubject.next(Math.round(Math.random() * 1000));
    this.SetInterval();
  }

  SetInterval() {
    const interval1 = interval(1000)
      .pipe(delay(5000))
      .subscribe((val) => {
        console.log('interval', val);
      });
  }
}
