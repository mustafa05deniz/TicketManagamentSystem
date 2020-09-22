import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../tickets.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ticket-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.sass']
})
export class SingleComponent implements OnInit {
  public TicketResponse: any;
  public messageForm: FormGroup;
  public id: any;
  public role: any;


  constructor(private _snackBar: MatSnackBar, public fb: FormBuilder, public dialog: MatDialog, public activatedRoute: ActivatedRoute, public ticketService: TicketsService) {
    this.role = localStorage.getItem("role");
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.GetTicket();
    });


    this.messageForm = this.fb.group({
      text: ['', Validators.required],
      files: [null]
    })
  }

  GetTicket() {
    this.ticketService.geTwithId(this.id).then(result => {
      console.log(result);
      this.TicketResponse = result[0]
    }).catch(err => {
      alert(err);
    })
  }

  openDialog(content) {
    const dialogRef = this.dialog.open(content, { width: "40%" });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {

  }

  addNewMessage() {
    console.log(this.messageForm.value);
    var formData: any = new FormData();
    formData.append("ticketId",this.id);
    formData.append("message", this.messageForm.get('text').value);
    formData.append("files", this.messageForm.get('files').value);
    this.ticketService.addNewMessage(formData).then(result => {
      this.openSnackBar("message added succesfuly");
      this.GetTicket();
    }).catch(err => {
      alert("message add error" + err);
    })
  }

  changeStatusFunction(event) {
    const data = {
      "ticketId": this.id,
      "status": event
    }
    console.log(data);
    this.ticketService.changeTicketStatus(data).then(result => {
      this.openSnackBar("ticket status changed succesfuly");
      this.GetTicket();
    }).catch(err => {
      alert("ticket status changes  error" + err);
    })

  }

  openSnackBar(message) {
    this._snackBar.open(message, 'End now', {
      duration: 500,
      horizontalPosition: "center",
      verticalPosition: "top"
    });

  }

  uploadFile() {
    const file = (event.target as HTMLInputElement).files[0];
    this.messageForm.patchValue({
      files: file
    });

  }


}