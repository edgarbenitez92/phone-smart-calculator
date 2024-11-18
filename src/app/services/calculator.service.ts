import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum MathematicalOperations {
  sum = 'SUM',
  subtract = 'SUBTRACT',
  multiply = 'MULTIPLY',
  split = 'SPLIT',
}

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private operationSubject = new BehaviorSubject<string>('0');
  private recordOperationSubject = new BehaviorSubject<string>('0');
  private lastOperation: MathematicalOperations | null = null;

  operation$ = this.operationSubject.asObservable();
  recordOperation$ = this.recordOperationSubject.asObservable();

  get operation() {
    return this.operationSubject.value;
  }

  set operation(value: string) {
    this.operationSubject.next(value);
  }

  get recordOperation() {
    return this.recordOperationSubject.value;
  }

  set recordOperation(value: string) {
    this.recordOperationSubject.next(value);
  }

  // Clear and clear functions
  resetOperation() {
    this.operation = '0';
    this.recordOperation = '0';
  }

  simpleClear() {
    let isNegative = '';
    let numberTemp = this.operation;

    if (this.operation.includes('-')) {
      isNegative = '-';
      numberTemp = this.operation.substring(1);
    }

    if (numberTemp.length > 1) {
      this.operation = isNegative + numberTemp.slice(0, -1);
    } else {
      this.operation = '0';
    }
  }

  // Validations functions
  setUpOperation(pressedNumber: string) {
    // Validation: Only 1 dot
    if (this.operation.includes('.') && pressedNumber === '.') return;

    // Validation: Start with 0?
    if (this.operation.startsWith('0') || this.operation.startsWith('-0')) {
      // Validation: decimal + dot
      if (pressedNumber === '.') {
        this.operation += pressedNumber;

        // Validation: press 0 existing dot
      } else if (pressedNumber === '0' && this.operation.includes('.')) {
        this.operation += pressedNumber;

        // Validation: is different to zero? has a dot?
      } else if (pressedNumber !== '0' && !this.operation.includes('.')) {
        this.operation = pressedNumber;

        // Validation: evade 0000000
      } else if (pressedNumber === '0' && !this.operation.includes('.')) {
        this.operation = this.operation;
      } else {
        this.operation += pressedNumber;
      }
    } else {
      this.operation += pressedNumber;
    }
  }

  changeOpByRecordOp() {
    if (this.operation.endsWith('.')) {
      this.recordOperation = this.operation.slice(0, -1);
    } else {
      this.recordOperation = this.operation;
    }
    this.operation = '0';
  }

  changeTypeNumber() {
    if (this.operation.includes('-')) {
      this.operation = this.operation.replace('-', '');
    } else {
      this.operation = '-' + this.operation;
    }
  }

  // Operations mathematical functions
  btnSplit() {
    this.changeOpByRecordOp();
    this.lastOperation = MathematicalOperations.split;
  }

  btnMultiply() {
    this.changeOpByRecordOp();
    this.lastOperation = MathematicalOperations.multiply;
  }

  btnSubtract() {
    this.changeOpByRecordOp();
    this.lastOperation = MathematicalOperations.subtract;
  }

  btnSum() {
    this.changeOpByRecordOp();
    this.lastOperation = MathematicalOperations.sum;
  }

  // Calc operation function
  executeCalc() {
    const firstNumber = Number(this.operation);
    const secondNumber = Number(this.recordOperation);

    if (firstNumber === 0) return;

    switch (this.lastOperation) {
      case MathematicalOperations.sum:
        this.operation = `${firstNumber + secondNumber}`;
        break;

      case MathematicalOperations.subtract:
        this.operation = `${secondNumber - firstNumber}`;
        break;

      case MathematicalOperations.multiply:
        this.operation = `${firstNumber * secondNumber}`;
        break;

      case MathematicalOperations.split:
        this.operation = `${secondNumber / firstNumber}`;
        break;
    }

    this.recordOperation = '0';
  }
}
