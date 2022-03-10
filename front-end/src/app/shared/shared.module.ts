import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsoleLogPipe } from './pipes/console-log.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

const modules = [
  ReactiveFormsModule,
  FormsModule,
  CommonModule,
  FontAwesomeModule,
  HttpClientModule,
];

const declarations = [
  ConsoleLogPipe
];

@NgModule({
  declarations,
  exports: [
    ...modules,
    ...declarations
  ],
  imports: [...modules],
})
export class SharedModule { }
