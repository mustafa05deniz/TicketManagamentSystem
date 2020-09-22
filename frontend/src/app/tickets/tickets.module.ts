import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TicketsService } from './tickets.service';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './layout/header/header.component';
import { SingleComponent } from './single/single.component';
import { ListComponent } from './list/list.component';
import { PanelComponent } from './layout/panel/panel.component';
import { AddTicketComponent } from './add/add.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
const routes: Routes = [
    {
        path: '',
        component: TicketsComponent,
        children:[
            {
                path:"list",
                component:ListComponent
            },
            {
                path:"panel",
                component:PanelComponent
            },
            {
                path:"addTicket",
                component:AddTicketComponent
            },
            {
                path:"review/:id",
                component:SingleComponent
            },
            
        ]
    },
    
];


@NgModule({
    declarations: [
        TicketsComponent,
        HeaderComponent,
        SingleComponent,
        ListComponent,
        PanelComponent,
        AddTicketComponent,
    ],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        CommonModule,
        MatSelectModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterModule.forChild(routes),

    ],
    providers: [
        TicketsService,

    ]

})
export class TicketsModule {
}