import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { User } from 'src/app/models/user.model';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  thePaymentmethod: PaymentMethod;
  creationMode: boolean;
  formGroupValidator: FormGroup;

  users: User[] = [];

  constructor(private paymentmethodsService:PaymentMethodService,
              private router:Router,
              private rutaActiva:ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    this.thePaymentmethod = {_id:"", type:"", cardNumber: "", cardCVV:"", expiryDate:"2023-05-02"}
    this.creationMode = true;
  }

  ngOnInit(): void {
    this.loadUsers();
    this.formBuilding();
    if (this.rutaActiva.snapshot.params.id){
      this.creationMode=false;
      this.show(this.rutaActiva.snapshot.params.id)
    } else {
      this.creationMode = true;
    }
  }

  loadUsers() {
    this.userService.list().subscribe(data => {
      this.users = data;
    });
  }

  formBuilding(){
    this.formGroupValidator=this.formBuilder.group({
      _id : [''],
      type : ['',[Validators.required]],
      cardNumber : ['',[Validators.required]],
      cardCVV : ['',[Validators.required]],
      expiryDate : ['',[Validators.required]],
      user: new FormControl('',[Validators.required])
    });
  }

  get formGroupValidatorData(){
    return this.formGroupValidator.controls;
  }

  paymentmethodData() : PaymentMethod{
    let thePaymentmethod= new PaymentMethod();
    thePaymentmethod.type=this.formGroupValidatorData.type.value;
    thePaymentmethod.cardNumber=this.formGroupValidatorData.cardNumber.value;
    thePaymentmethod.cardCVV=this.formGroupValidatorData.cardCVV.value;
    thePaymentmethod.expiryDate=this.formGroupValidatorData.expiryDate.value;
    // thePaymentmethod.user=this.formGroupValidatorData.user.value;
    return thePaymentmethod;
  }

  show(id:number){
    this.paymentmethodsService.show(id).subscribe((jsonResponse: any) => {
      this.thePaymentmethod=jsonResponse
      // this.thePaymentmethod.expiryDate=this.transformatDate(this.thePaymentmethod.expiryDate)

      this.formGroupValidator.patchValue({
        _id: this.thePaymentmethod._id,
        type: this.thePaymentmethod.type,
        cardNumber: this.thePaymentmethod.cardNumber,
        cardCVV: this.thePaymentmethod.cardCVV,
        expiryDate: this.thePaymentmethod.expiryDate
      });
    });
  }

  create(){
    
    if(this.formGroupValidator.invalid){
      Swal.fire({
        title: 'Formulario Incorrecto',
        icon: 'error',
        timer:3000
      });
      return false;
    }
    this.thePaymentmethod = this.paymentmethodData();
    
    console.log("Creando a " + JSON.stringify(this.thePaymentmethod))
    this.paymentmethodsService.create(this.thePaymentmethod).subscribe((jsonResponse: any) => {
      this.matchUserWithPaymentMethod(jsonResponse._id);
      Swal.fire({
        title: 'Creado', 
        icon: 'success',
      })
      this.router.navigate(["payment-methods/list"])
    });
  }

  update(){
    this.paymentmethodsService.update(this.formGroupValidator.value).subscribe((jsonResponse: any) => {
      this.matchUserWithPaymentMethod(jsonResponse._id);
      Swal.fire({
        title: 'Actualizando',
        icon: 'success',
      })
      this.router.navigate(["payment-methods/list"])
    });
  }

  private matchUserWithPaymentMethod(paymentMethodId: string) {
    const userId = this.formGroupValidatorData.user.value;
    this.paymentmethodsService.matchPaymentMethodUser(paymentMethodId, userId).subscribe(response => {
      // Manejar la respuesta aquí
    });
  }

  // transformatDate(theDate: string): string {
  //   const theDateObject = new Date(theDate);
  //   return `${theDateObject.getFullYear()}-${theDateObject.getMonth() + 1}-${theDateObject.getDate()}`;
  // }

  

}
