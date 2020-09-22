import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'recovery',
        component: RecoveryComponent,
    },
];


@NgModule({
    imports: [
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,

    ],
    declarations: []
})
export class AuthenticationModule {
}
