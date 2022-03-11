import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IHistory } from 'src/app/core/models/IHistory';
import { CalculatorService } from 'src/app/core/services/calculator.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  loading = false;

  history: IHistory[] = [];

  faArrowLeft = faArrowLeft;

  filtros: {
    aberto: boolean;
    username: string;
    date: Date | null;
    result: string;
    id: number | null;
  } = {
      aberto: false,
      username: '',
      date: null,
      result: '',
      id: null,
    };

  maxDate = new Date();

  toastKey = 'history-toast';

  constructor(
    private calculatorService: CalculatorService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.listHistory();
  }

  listHistory(): void {
    this.loading = true;
    this.calculatorService.getHistory()
      .pipe(finalize(() => this.loading = false))
      .subscribe((history) => {
        this.history = [...history];
      }, console.log);
  }

  navigateToCalculator(): void {
    this.router.navigate([ROUTES.CALCULATOR]);
  }

  alternarFiltrosAberto(): void {
    this.filtros.aberto = !this.filtros.aberto;
  }

  filtrar(): void {
    const {
      date,
      id,
      result,
      username
    } = this.filtros;
    this.calculatorService.getHistoryWithFilter({
      username,
      result,
      date: date?.toLocaleDateString('pt-BR') || '',
      id,
    }).subscribe((history) => {
      this.history = [...history];
      this.alternarFiltrosAberto();
    }, (error) => {
      console.log(error);
      this.messageService.add({
        key: this.toastKey,
        severity: 'error',
        summary: 'Erro ao filtrar',
        detail: error,
      });
    });
  }

}
