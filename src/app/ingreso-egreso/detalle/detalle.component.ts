import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = [];
  subscribeIngresoEgreso: Subscription = new Subscription();

  constructor(private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.subscribeIngresoEgreso = this.store.select('ingresoEgresos')
      .subscribe( ingresoEgresoState => this.items = (ingresoEgresoState.items) as IngresoEgreso[])
  }

  ngOnDestroy() {
    this.subscribeIngresoEgreso.unsubscribe()
  }

  borrar(uid: string) {
    console.log(uid)
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then( () => {
        Swal.fire(
          'Registro eliminado',
          '',
          'success'
        )
      })
      .catch( err => {
        Swal.fire(
          'Error al eliminar',
          err.message,
          'error'
        )
      })
  }

}
