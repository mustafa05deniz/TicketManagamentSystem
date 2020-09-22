import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-ticket-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    public userInformation: any;
    public role = localStorage.getItem("role");
    constructor() {
        this.userInformation = JSON.parse(localStorage.getItem("user"))
        console.log(this.userInformation)
    }
    ngOnInit(): void {

    }

}