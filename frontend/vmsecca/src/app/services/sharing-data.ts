import { EventEmitter, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class SharingData {

  sender = signal<string>('nosender');


}
