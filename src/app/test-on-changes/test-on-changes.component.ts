import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-test-on-changes',
  templateUrl: './test-on-changes.component.html',
  styleUrls: ['./test-on-changes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestOnChangesComponent implements OnChanges, DoCheck {
  constructor(private cd: ChangeDetectorRef) {}

  ngDoCheck(): void {
    this.cd.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  @Input() objInput: any;
  @Input() arrayInput!: any[];
  @Input() valueInput!: number;
}
