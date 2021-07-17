import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('ingresoEgresos', ingresoEgresoReducer),
        ReactiveFormsModule,
        ChartsModule,
        SharedModule,
        DashboardRoutingModule,
        RouterModule,
    ],
    declarations: [
        DashboardComponent,
        IngresoEgresoComponent,
        EstadisticaComponent,
        DetalleComponent,
        OrdenIngresoPipe
    ]
})
export class IngresoEgresoModule {}