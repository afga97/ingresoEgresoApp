import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuario: any;
  constructor( private authService: AuthService,
    private router: Router, private store: Store<AppState>) { }


  ngOnInit(): void {
    this.store.select('auth')
      .subscribe( auth => this.usuario = auth.user)
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    })
  }

}
