import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  convertDate(date: string) {
    // Parsear la fecha y hora original
    const fechaHoraLuxon = DateTime.fromISO(date);
    // Formatear la fecha y hora en un nuevo formato
    const fechaFormateada = fechaHoraLuxon.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ');
    return fechaFormateada
  }
}
