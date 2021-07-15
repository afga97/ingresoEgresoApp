import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import * as uiActions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  uiSubscription: Subscription;
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscription = new Subscription();
  }

  ngOnInit() {
    this.uiSubscription = this.store.select('ui')
      .subscribe( (ui) => {
        this.cargando = ui.isLoading;
      }) 
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {

    if (this.registroForm.invalid) { return; }
    this.store.dispatch( uiActions.isLoading() )
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        // Swal.close();
        this.store.dispatch( uiActions.stopLoading() )

        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch( uiActions.stopLoading() )
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
