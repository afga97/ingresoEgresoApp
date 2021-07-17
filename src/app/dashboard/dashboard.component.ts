import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: any;
  subscribeAuth: Subscription;
  subscribeItems: Subscription;
  constructor(private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) {
    this.subscribeAuth = new Subscription();
    this.subscribeItems = new Subscription();

  }

  ngOnInit(): void {
    this.subscribeAuth = this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== undefined)
      )
      .subscribe(auth => {
        this.user = auth.user
        this.subscribeItems = this.ingresoEgresoService.initIngresoEgresosListener(this.user.uid)
          .subscribe( items => {
            this.store.dispatch( ingresoEgresoActions.setItems({ items }) )
          })
      })
  }

  ngOnDestroy(): void {
    this.subscribeAuth?.unsubscribe();
    this.subscribeItems?.unsubscribe();
  }

}
