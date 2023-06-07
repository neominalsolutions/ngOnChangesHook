import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveButtonComponent {
  text: string = 'Save';
  @Input() bgColor!: string;
  @Input() color!: string;
  @Input() disabled: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  // ngDoCheck(): void {
  //   this.cd.markForCheck();
  // }

  @Output() onClick = new EventEmitter<void>();

  Click() {
    this.onClick.emit();
  }

  setDisabled(disabled: boolean) {
    this.cd.markForCheck();
    this.disabled = disabled;
  }
}
