import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddTicketComponent implements OnInit {
  role: string;
  TicketForm: FormGroup;
  constructor(public fb: FormBuilder, public dialog: MatDialog, ) {
    this.role = localStorage.getItem("role");
    this.TicketForm = this.fb.group({
      title: ['',Validators.required],
      text:  ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  openDialog(content) {
    const dialogRef = this.dialog.open(content, { width: "40%" });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addNewTicket(){
    console.log(this.TicketForm.value);
  }
}