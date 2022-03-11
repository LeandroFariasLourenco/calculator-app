import { NgModule } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';

const modules = [
  ButtonModule,
  TableModule,
  ToastModule,
  InputTextModule,
  SkeletonModule,
  SidebarModule,
  CalendarModule,
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
