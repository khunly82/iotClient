import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThermostatService } from '../../services/thermostat.service';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-thermostat',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgxSliderModule],
  templateUrl: './thermostat.component.html',
  styleUrl: './thermostat.component.scss'
})
export class ThermostatComponent {

  form: FormGroup;

  options: Options = {
    floor: 16,
    ceil: 30,
    step: 0.5,
  }

  constructor(
    private readonly thermostatService: ThermostatService,
    private readonly fb: FormBuilder,
    private readonly toastrService: ToastrService,
  ) {
    this.form = this.fb.group({ 
      // caractéristiques du formulaire
      degree: [20, [Validators.required]],
      date: [new Date().toISOString(), [Validators.required]],
    });
  }

  envoyer() {
    if(this.form.valid) {
      this.thermostatService.changeTemperature(this.form.value).subscribe({
        // en cas de success
        next: () => { this.toastrService.success('OK') },
        // en cas d'erreur
        error: (err) => { this.toastrService.error('PAS OK', JSON.stringify(err.error) ) }
      })
    }
  }
}
