import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './core/constants';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  { path: ROUTES.CALCULATOR, component: CalculatorComponent },
  { path: ROUTES.HISTORY, component: HistoryComponent },
  { path: '**', redirectTo: 'calculator' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
