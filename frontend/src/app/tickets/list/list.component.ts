import { Component, OnInit, Input } from '@angular/core';
import { TicketsService } from '../tickets.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
    public ticketList: any;
    public role: any;
    filterForm: FormGroup;
    TicketForm: FormGroup;
    constructor(public http:HttpClient,public fb: FormBuilder, public dialog: MatDialog, public ticketService: TicketsService) {
        this.role = localStorage.getItem("role");
        this.filterForm = this.fb.group({
            email: '',
            title: ''
        })
        this.TicketForm = this.fb.group({
            title: ['', Validators.required],
            text: ['', Validators.required],
            files:[null]
        })
    }

    ngOnInit(): void {
        this.ticketService.TicketList(this.role).then(result => {
            console.log(result);
            this.ticketList = result;
        })
    }

    openDialog(content) {
        const dialogRef = this.dialog.open(content, { width: "40%" });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    filter() {
        console.log(this.filterForm.value);
        this.ticketService.filter(this.filterForm.value).then(result => {
            console.log(result);
            this.ticketList = result;
        }).catch(err => {
            alert(err);
        })

    }

    addNewTicket() {
        var formData: any = new FormData();
        formData.append("files", this.TicketForm.get('files').value);
        formData.append("title", this.TicketForm.get('title').value);
        formData.append("text", this.TicketForm.get('text').value);
        this.ticketService.addNewTicket(formData).then(result=>{
            if(result){
                this.ticketService.TicketList(this.role).then(result => {
                    this.ticketList = result;
                })
            }else{
                alert("error")
            }
        }).catch(err=>{
            console.log(err);
        })
		
    }

    filterWithStatus(status) {
        if (status == 999) {
            this.ticketService.TicketList(this.role).then(result => {
                console.log(result);
                this.ticketList = result;
            })
        } else {
            this.ticketService.filterWithStatus(status).then(result => {
                this.ticketList = result;
            }).catch(err => {
                alert(err);
            })
        }

    }

    uploadFile() {
        const file = (event.target as HTMLInputElement).files[0];
        this.TicketForm.patchValue({
            files: file
        });

    }
}