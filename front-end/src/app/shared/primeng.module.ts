import { NgModule } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

const modules = [
  ButtonModule,
  TableModule,
  ToastModule,
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
