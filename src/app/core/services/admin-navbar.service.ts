import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AdminNavbarService {
  constructor() { }

  @Output() change: EventEmitter<any> = new EventEmitter(); // Emitter when some value changed

  changePage(page: any) {
    this.change.emit(page);
  }
}
