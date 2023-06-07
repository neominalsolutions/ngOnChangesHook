import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  Subject,
  Subscription,
  catchError,
  delay,
  delayWhen,
  filter,
  interval,
  map,
  tap,
  timer,
} from 'rxjs';
import { SaveButtonComponent } from './components/save-button/save-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  btnClick() {}

  title = 'OnChangesApp';
  subscription!: Subscription;
  subs: Subscription[] = [];

  // üzerinde takip edeceğimiz veriler için subject tipi kullanıyoruz.
  randomSubject = new Subject<number>();
  randomObservable = this.randomSubject.asObservable();
  // subject gözlemlenebilir yapıyoruz

  constructor(private cd: ChangeDetectorRef) {
    this.subs.push(
      this.randomObservable.subscribe((val) => {
        console.log('val', val);
      })
    );

    this.subscription = this.randomObservable
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    this.subs.forEach((sb) => {
      sb.unsubscribe();
    });
  }

  ngAfterViewInit(): void {}

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
    this.arr = [...this.arr, { id: 5, name: 'hakan' }];
    this.arr = [{ id: 4, name: 'tansu' }, ...this.arr];
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

  @ViewChild('save1') save1!: SaveButtonComponent;

  changeValue() {
    this.val = 1;
    this.save1.setDisabled(true);
  }

  generateRandom() {
    // subject içerisine değer set etmek için next methodu kullanılır.
    this.randomSubject.next(Math.round(Math.random() * 1000));
    this.SetInterval();
  }

  SetInterval() {
    // const interval1 = interval(1000)
    //   .pipe(delay(5000))
    //   .subscribe((val) => {
    //     console.log('interval', val);
    //   });
  }
}
