import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { ROUTES } from 'src/app/core/constants';
import { Operations } from 'src/app/core/models';
import { CalculatorService } from 'src/app/core/services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, AfterViewInit {

  @ViewChild('calculator') calculatorRef: ElementRef<HTMLDivElement>;

  faArrowLeft = faArrowLeft;

  equation: string[] = [];

  newOperation = '';

  templateEnums = {
    operations: Operations,
  };

  result = 0;

  toastKey = 'calculator-toast';

  username = '';

  constructor(
    private calculatorService: CalculatorService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.checkStoredUsername();
  }

  ngAfterViewInit(): void {
    this.listenToHoverEvents();
  }

  checkStoredUsername(): void {
    this.username = localStorage.getItem('username');
  }

  listenToHoverEvents(): void {
    this.calculatorRef.nativeElement.onmouseover = () => {
      if (!this.username) {
        this.notify('Você precisa preencher seu nome para utilizar a calculadora.');
      }
    };
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
      this.notify('Selecione um operando');
      return;
    }

    this.newOperation += value;
  }

  remove(): void {
    this.newOperation = this.newOperation.slice(0, -1);
  }

  notify(message: string): void {
    this.messageService.clear();
    this.messageService.add({
      key: this.toastKey,
      severity: 'warn',
      detail: message,
      summary: 'Aviso',
      life: 4000,
    });
  }

  updateUsername(username: string): void {
    this.username = username;

    localStorage.setItem('username', username);
  }

  calculate(): void {
    this.validateIfThereIsAnResult();
    if (this.newOperation.includes('(') && !this.newOperation.includes(')')) {
      this.notify('Termine sua operação com um parenteses');
      return;
    }

    this.equation = [...this.equation, this.newOperation];
    this.calculatorService.calculate({
      operation: this.equation.join(''),
      name: this.username,
    })
      .pipe(finalize(() => console.log()))
      .subscribe(({ equationResult }) => {
        this.result = +equationResult;
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
      this.notify('Você só pode realizar uma operação se o último valor for um número');
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
      this.notify('Deve haver algum operando dentro do parentêses');
      return;
    }

    if (this.newOperation.includes('(') && value === '(') {
      this.notify('Você já possui um parenteses aberto');
      return;
    }

    if (this.newOperation.includes(')') && value === ')') {
      this.notify('Selecione um operando ou finalize a equação');
      return;
    }

    if (value === ')' && isNaN(parseInt(previousInput))) {
      this.notify('Você só pode fechar parenteses se o último valor for um número');
      return;
    }

    if (value === ')' && !this.newOperation.includes('(')) {
      this.notify('Abra parenteses antes de fechar');
      return;
    }

    this.newOperation += value;
  }

  navigateToHistory(): void {
    this.router.navigate([ROUTES.HISTORY]);
  }

}
