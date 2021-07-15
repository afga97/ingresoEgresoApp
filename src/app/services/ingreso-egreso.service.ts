import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
    private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    let uidUser = this.authService.user.uid.toString();
    const { uid, ...dataIngresoEgreso } = ingresoEgreso;
    return this.firestore.doc(`${uidUser}/ingresos-egresos`)
      .collection('items')
      .add({ ...dataIngresoEgreso })
  }

  initIngresoEgresosListener(uid: string) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            })
          )
        )
      )
  }

}
