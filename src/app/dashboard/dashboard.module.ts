import { Routes, RouterModule } from '@angular/router';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../services/auth.guard';

export const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '',
                component: EstadisticaComponent
            },
            {
                path: 'ingreso-egreso',
                component: IngresoEgresoComponent
            },
            { 
                path: 'detalle', 
                component: DetalleComponent 
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }