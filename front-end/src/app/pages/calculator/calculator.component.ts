import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs/operators';
import { Operations } from 'src/app/core/models';
import { CalculatorService } from 'src/app/core/services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  equation: string[] = [];

  newOperation = '';

  templateEnums = {
    operations: Operations,
  };

  result = 0;

  constructor(
    private calculatorService: CalculatorService,
  ) { }

  ngOnInit() {
  }

  clear(): void {
    this.equation = [];
    this.newOperation = '';
    this.result = 0;
  }

  validateIfThereIsAnResult(): void {
    if (this.result !== 0) {
      this.clear();
    }
  }

  add(value: string): void {
    this.validateIfThereIsAnResult();

    const previousInput = this.newOperation.split('')[this.newOperation.length - 1];

    if (previousInput === ')') {
      alert('Selecione um operando');
      return;
    }

    this.newOperation += value;
  }

  remove(): void {
    this.newOperation = this.newOperation.slice(0, -1);
  }

  calculate(): void {
    this.validateIfThereIsAnResult();
    if (this.newOperation.includes('(') && !this.newOperation.includes(')')) {
      alert('Termine sua operação com um parenteses');
      return;
    }

    this.equation = [...this.equation, this.newOperation];
    this.calculatorService.calculate({
      operation: this.equation.join(''),
      name: 'Leandro',
    })
      .pipe(finalize(() => console.log()))
      .subscribe((result) => {
        this.result = +result;
        this.equation = [...this.equation, '=', `${this.result}`];
      }, console.log);
  }

  addOperation(operation: Operations): void {
    this.validateIfThereIsAnResult();
    const previousInput = this.newOperation.split('')[this.newOperation.length - 1];

    if (previousInput === ')') {
      this.equation.push(this.newOperation);
      this.equation.push(operation);
      this.newOperation = '';
      return;
    }

    if (isNaN(parseInt(previousInput))) {
      alert('Você só pode realizar uma operação se o último valor for um número');
      return;
    }

    if (this.newOperation.includes('(')) {
      this.newOperation += operation;
      return;
    }

    this.equation.push(this.newOperation);
    this.equation.push(operation);
    this.newOperation = '';
  }

  addParentheses(value: '(' | ')'): void {
    this.validateIfThereIsAnResult();
    const previousInput = this.newOperation.split('')[this.newOperation.length - 1];
    if (!isNaN(parseInt(previousInput))
      && !this.newOperation.includes('(')
    ) {
      this.equation.push(this.newOperation);
      this.equation.push(Operations.Multiply);
      this.newOperation = value;
      return;
    }

    if (value === ')'
      && this.newOperation.includes('(')
      && !this.newOperation.includes(Operations.Multiply)
      && !this.newOperation.includes(Operations.Add)
      && !this.newOperation.includes(Operations.Divide)
      && !this.newOperation.includes(Operations.Subtract)
    ) {
      alert('Deve haver algum operando dentro do parentêses');
      return;
    }

    if (this.newOperation.includes('(') && value === '(') {
      alert('Você já possui um parenteses aberto');
      return;
    }

    if (this.newOperation.includes(')') && value === ')') {
      alert('Selecione um operando ou finalize a equação');
      return;
    }

    if (value === ')' && isNaN(parseInt(previousInput))) {
      alert('Você só pode fechar parenteses se o último valor for um número');
      return;
    }

    if (value === ')' && !this.newOperation.includes('(')) {
      alert('Abra parenteses antes de fechar');
      return;
    }

    this.newOperation += value;
  }

}
