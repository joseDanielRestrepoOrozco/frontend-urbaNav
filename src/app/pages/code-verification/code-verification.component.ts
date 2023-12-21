import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.scss']
})
export class CodeVerificationComponent implements OnInit {
  @ViewChild('digit1') digit1!: ElementRef;
  @ViewChild('digit2') digit2!: ElementRef;
  @ViewChild('digit3') digit3!: ElementRef;
  @ViewChild('digit4') digit4!: ElementRef;

  userEmail: string = ''

  constructor(private router: Router,
    private securityService: SecurityService) { }

  ngOnInit(): void {
    // Recupera el correo electrónico del local storage
    this.userEmail = localStorage.getItem('userEmail') || '';
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

  verifyCode() {
    const code = this.digit1.nativeElement.value + this.digit2.nativeElement.value +
      this.digit3.nativeElement.value + this.digit4.nativeElement.value;

    this.securityService.verifyCode(this.userEmail, parseInt(code)).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.login2(); // Si el código es correcto, inicia sesión y redirige al dashboard
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

  login2() {
    const userEmail = localStorage.getItem('userEmail') || '';
    const userPassword = localStorage.getItem('userPassword') || '';

    if (!userEmail || !userPassword) {
      console.error('No se encontró ningún usuario ni contraseña');
      return;
    }

    let theUser = new User();
    theUser.email = userEmail;
    theUser.password = userPassword;

    this.securityService.login2(theUser).subscribe({
      next: (token) => {
        this.getUserFromToken(token); // Obtener detalles del usuario y guardar en el local storage
      },
      error: (error) => {
        Swal.fire({
          title: 'Error al crear el token en el login2',
          text: error,
          icon: 'error',
          timer: 5000
        });
      }
    });
  }

  getUserFromToken(token: string) {
    this.securityService.getUserFromToken(token).subscribe({
      next: dataUser => {
        let theUser: User = {
          "_id": dataUser["_id"],
          "name": dataUser["name"],
          "surname": dataUser["surname"],
          "email": dataUser["email"],
          "birthdate": dataUser["birthdate"],
          "phone": dataUser["phone"],
          "token": token,
          "role": dataUser["role"],
        }
        this.securityService.saveSessionData(theUser);
        this.router.navigate(['pages/dashboard']); // Redirigir al dashboard después de guardar los datos
      },
      error: error => {
        console.error('Error al obtener datos del usuario: ', error);
        // manejo de errores
      }
    });
  }


}
