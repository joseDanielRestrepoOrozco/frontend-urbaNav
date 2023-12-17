import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/models/session.model';
import { SecurityService } from 'src/app/services/security.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  sessions:Session[]

  constructor(private sessionsService:SessionService,  private securityService: SecurityService) { }

  ngOnInit(): void {
    this.sessionsService.list().subscribe((jsonResponse:any) => {
      this.sessions = jsonResponse; 
      console.log(jsonResponse)
    });
  }
}
