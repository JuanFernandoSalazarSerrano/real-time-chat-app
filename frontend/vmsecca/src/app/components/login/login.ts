import { SharingData } from './../../services/sharing-data';
import { Component, signal } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { Router, RouterOutlet } from '@angular/router';

@Component({

  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html'

})
export class Login {

    sender = signal<string>('');

    constructor(private SharingDataService: SharingData, private readonly router: Router){}

onSubmit() {
  this.SharingDataService.sender.set(this.sender());
  this.router.navigate(['/chat']);
}


}
