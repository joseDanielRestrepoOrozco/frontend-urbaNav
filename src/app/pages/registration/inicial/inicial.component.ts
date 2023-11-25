import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.scss']
})
export class InicialComponent implements OnInit {

  constructor(private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
  }

  registrocliente(){
    this.router.navigate(["registration/create-customer"])
  }

}
