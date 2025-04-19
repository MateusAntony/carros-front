import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Carro } from '../../../models/carro';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  carro: Carro = new Carro(0,"");


  salvar(){
    alert('Carro salvo com sucesso!');
  }

}
