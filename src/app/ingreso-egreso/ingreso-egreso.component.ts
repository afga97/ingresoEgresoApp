import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso'
  loading: boolean = false;
  subscribeUi: Subscription

  constructor(private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) {
    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      monto: ['', Validators.required],
    })
    this.subscribeUi = new Subscription();
  }

  ngOnInit(): void {
    this.subscribeUi = this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading
    })
  }

  ngOnDestroy(): void {
    this.subscribeUi.unsubscribe();
  }

  guardar() {
    if (this.ingresoForm.valid) {
      const { description, monto } = this.ingresoForm.value;
      const ingresoEgresoInstance = new IngresoEgreso(description, monto, this.tipo)
      this.store.dispatch( uiActions.isLoading() )
      this.ingresoEgresoService.crearIngresoEgreso(ingresoEgresoInstance)
        .then( () => {
          Swal.fire(
            'Registro creado',
            description,
            'success'
          )
          this.ingresoForm.reset();
          this.store.dispatch( uiActions.stopLoading() )
        })
        .catch( err => { 
          this.store.dispatch( uiActions.stopLoading() )
          Swal.fire('Error', err.message, 'error') 
        }) 
    }
  }

}
