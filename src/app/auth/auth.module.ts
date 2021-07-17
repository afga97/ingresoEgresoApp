import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AngularFireAuthModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
    ]
})
export class AuthModule {}