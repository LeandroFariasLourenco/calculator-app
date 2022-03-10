import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  { path: 'calculator', component: CalculatorComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: 'calculator' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
