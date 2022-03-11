import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('usernameInputRef') usernameInputRef: ElementRef<HTMLInputElement>;

  faArrowLeft = faArrowLeft;

  equation: string[] = [];

  newOperation = '';

  templateEnums = {
    operations: Operations,
  };

  loadingResult = false;

  result = 0;

  toastKey = 'calculator-toast';

  username = '';

  constructor(
    private calculatorService: CalculatorService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  @HostListener('document:keydown', ['$event'])
  listenToKeyboardInput(event: KeyboardEvent): void {
    const keysToListen = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '(', ')', '=',
      '.',
      'Backspace',
      'Enter',
    ];
    if (!keysToListen.includes(event.key)
      || document.activeElement === this.usernameInputRef.nativeElement) { return; }

    switch (event.key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        this.add(event.key);
        break;
      case 'Backspace':
        this.remove();
        break;
      case '.':
        this.addFloatingPoint();
        break;
      case '(':
      case ')':
        this.addParentheses(event.key);
        break;
      case '=':
      case 'Enter':
        this.calculate();
        break;
      default:
        this.addOperation(event.key as Operations);
    }
  }

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
      life: 6000,
    });
  }

  updateUsername(username: string): void {
    this.username = username;

    localStorage.setItem('username', username);
  }

  addFloatingPoint(): void {
    const previousInput = this.equation[this.equation.length - 1];

    if (!previousInput) {
      this.newOperation += '0.';
      return;
    }

    if (this.newOperation.includes('.')) {
      this.notify('A operação já possui um ponto flutuante.');
      return;
    }

    this.newOperation += '.';
  }

  calculate(): void {
    this.validateIfThereIsAnResult();
    if (!this.equation.length) {
      this.notify('Você precisa montar uma equação antes de calcular.');
      return;
    }

    if (isNaN(parseInt(this.equation[this.equation.length - 1])) && !this.newOperation) {
      this.notify('Termine a equação antes de calcular.');
      return;
    }

    if (this.newOperation.includes('(') && !this.newOperation.includes(')')) {
      this.notify('Termine sua operação com um parenteses.');
      return;
    }

    this.loadingResult = true;
    this.equation = [...this.equation, this.newOperation];
    this.calculatorService.calculate({
      operation: this.equation.join(''),
      name: this.username,
    })
      .pipe(finalize(() => this.loadingResult = false))
      .subscribe(({ equationResult }) => {
        this.result = +equationResult;
        this.equation = [...this.equation, '=', `${this.result}`];

        this.messageService.clear();
        this.messageService.add({
          key: this.toastKey,
          detail: 'A operação foi calculada com sucesso, você pode visualizar ela no histórico.',
          summary: 'Sucesso!',
          severity: 'success',
          life: 8000,
        });
      }, () => this.notify('Ocorreu um erro ao calcular a operação.'));
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

    if (!this.newOperation.includes('(') && value === ')') {
      this.notify('Você precisa de um parenteses antes de fechar.');
      return;
    }

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
