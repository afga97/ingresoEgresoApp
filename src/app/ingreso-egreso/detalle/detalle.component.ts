import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = [];
  subscribeIngresoEgreso: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscribeIngresoEgreso = this.store.select('ingresoEgresos')
      .subscribe( ingresoEgresoState => this.items = (ingresoEgresoState.items) as IngresoEgreso[])
  }

  ngOnDestroy() {
    this.subscribeIngresoEgreso.unsubscribe()
  }

  borrar(uid: string) {
    console.log(uid)
  }

}
