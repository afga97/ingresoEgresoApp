import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Usuario } from '../models/usuario.model';

import { map } from 'rxjs/operators';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions'
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: any;

  get user() {
    return { ...this._user }
  }

  constructor(public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) {
      this.userSubscription = new Subscription();
  }

  initAuthListener() {

    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((fireUser: any) => {
            const user = Usuario.fromFireBase(fireUser)
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }))
          })
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser())
        this.store.dispatch( ingresoEgresoActions.unSetItems())
      }
    })

  }



  crearUsuario(nombre: string, email: string, password: string) {

    // console.log({ nombre, email, password });
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        let usuario = (user as any)
        const newUser = new Usuario(usuario.uid, nombre, usuario.email);

        return this.firestore.doc(`${user?.uid}/usuario`).set({ ...newUser });

      });

  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}
