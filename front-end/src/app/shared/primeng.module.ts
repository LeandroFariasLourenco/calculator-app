import { NgModule } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

const modules = [
  ButtonModule,
  TableModule,
  ToastModule,
  InputTextModule,
];

@NgModule({
  declarations: [],
  exports: [...modules],
  imports: [...modules],
  providers: [
    MessageService,
  ]
})
export class PrimengModule { }
