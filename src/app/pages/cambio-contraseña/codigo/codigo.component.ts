import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.scss']
})
export class CodigoComponent implements OnInit, AfterViewInit {
  @ViewChild('digit1') digit1!: ElementRef;
  @ViewChild('digit2') digit2!: ElementRef;
  @ViewChild('digit3') digit3!: ElementRef;
  @ViewChild('digit4') digit4!: ElementRef;

  userEmail: string = ''
  userId: string = ''

  constructor( private router:Router,
    private notificationService:NotificationsService,
    private securityService: SecurityService) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userId = localStorage.getItem('userId') || '';
  }

  ngAfterViewInit(): void {
    // Enfoca el primer cuadro de entrada después de la inicialización
    this.digit1.nativeElement.focus();
  }

  onDigitInput(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;

    // Asegura que solo se ingresen números
    if (!/^\d*$/.test(inputValue)) {
      inputElement.value = '';
      return;
    }

    // Limita la longitud del valor a 1 para cada cuadro
    inputValue = inputValue.slice(0, 1);

    // Actualiza el valor actual y pasa al siguiente cuadro si hay un número ingresado
    inputElement.value = inputValue;

    if (inputValue !== '') {
      switch (index) {
        case 1:
          this.digit2.nativeElement.focus();
          break;
        case 2:
          this.digit3.nativeElement.focus();
          break;
        case 3:
          this.digit4.nativeElement.focus();
          break;
      }
    }
  }

  nuevo() {
    const code = this.digit1.nativeElement.value + this.digit2.nativeElement.value + 
                 this.digit3.nativeElement.value + this.digit4.nativeElement.value;
  
    this.securityService.verifyCode2(this.userEmail, code).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.router.navigate(["cambio-contraseña/cambio"])
        } else {
          Swal.fire({
            title: 'Código incorrecto',
            text: 'Verifica tu bandeja de correo el código que te enviamos',
            icon: 'error',
            timer: 5000 
          });
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error en la verificación',
          text: error,
          icon: 'error',
          timer: 5000 
        });
      }
    });
  }
}

