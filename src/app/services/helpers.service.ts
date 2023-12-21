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

  getFormattedDate(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

isClose(x: number, y: number, tolerance: number = 0.004): boolean {
  console.log(Math.abs(x - y), tolerance, 'aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
  return Math.abs(x - y) <= tolerance;
}

}
