import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calc-button',
  templateUrl: './calc-button.component.html',
  styleUrls: ['./calc-button.component.scss'],
  standalone: true,
})
export class CalcButtonComponent {
  @Input() task: string = '';
  @Input() color: string = '#2D2D2D';
  @Input() isZeroButton: boolean = false;
  @Output() onClick = new EventEmitter<string>();
}
