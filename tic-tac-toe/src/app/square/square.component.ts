import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button *ngIf="!value">{{ value }}</button>
    <button class="X_button" *ngIf="value === 'X'">{{ value }}</button>
    <button class="O_button" *ngIf="value === 'O'">{{ value }}</button>
  `,
  styleUrls: ['./square.component.css'],
})
export class SquareComponent {
  @Input() value!: string | null;
}
