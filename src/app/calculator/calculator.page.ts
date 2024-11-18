import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CalcButtonComponent } from './calc-button/calc-button.component';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    CalcButtonComponent,
  ],
})
export class CalculatorPage implements OnInit {
  operation: string = '0';
  recordOperation: string = '0';

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.calculatorService.operation$.subscribe(
      (operation) => (this.operation = operation)
    );
    this.calculatorService.recordOperation$.subscribe(
      (recordOperation) => (this.recordOperation = recordOperation)
    );
  }

  // Methods connected to the service
  resetOperation() {
    this.calculatorService.resetOperation();
  }

  simpleClear() {
    this.calculatorService.simpleClear();
  }

  setUpOperation(value: string) {
    this.calculatorService.setUpOperation(value);
  }

  changeTypeNumber() {
    this.calculatorService.changeTypeNumber();
  }

  btnSplit() {
    this.calculatorService.btnSplit();
  }

  btnMultiply() {
    this.calculatorService.btnMultiply();
  }

  btnSubtract() {
    this.calculatorService.btnSubtract();
  }

  btnSum() {
    this.calculatorService.btnSum();
  }

  executeCalc() {
    this.calculatorService.executeCalc();
  }
}
