import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private toastrService: ToastrService
  ) {
    const builder = new HubConnectionBuilder()
      .withUrl("http://localhost:5137/ws/iot")
      .withAutomaticReconnect();

    const connection = builder.build();

    connection.start().then(() => {
      connection.on('test', payload => {
        const distance = parseInt(payload);
        this.toastrService.warning('Qqun s\'approche de votre maison', `Il se trouve à ${distance} cm`);
      });
    });
  }
}
