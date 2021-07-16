import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: any;
  userSubscription: Subscription;
  constructor(private store: Store<AppState>) { 
    this.userSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .subscribe( auth => {
        this.usuario = auth.user
        console.log(auth)
      })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
