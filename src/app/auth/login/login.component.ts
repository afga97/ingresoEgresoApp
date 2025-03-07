import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/shared/ui.actions';

import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscription = new Subscription()
  }

  ngOnInit() {
    this.uiSubscription = this.store.select('ui')
      .subscribe( ui => { 
        this.cargando = ui.isLoading
      })
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  login() {

    if (this.loginForm.invalid) { return; }
    this.store.dispatch( uiActions.isLoading() )
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario(email, password)
      .then(credenciales => {
        console.log(credenciales);
        // Swal.close();}
        this.store.dispatch( uiActions.stopLoading() )
        this.router.navigate(['/dashboard']);
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
