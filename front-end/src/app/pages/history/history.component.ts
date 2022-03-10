import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IHistory } from 'src/app/core/models/IHistory';
import { CalculatorService } from 'src/app/core/services/calculator.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  loading = false;

  history: IHistory[] = [];

  faArrowLeft = faArrowLeft;

  constructor(
    private calculatorService: CalculatorService
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

}
