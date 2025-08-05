import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import { CarroService } from '../../../services/carro.service';
import { Marca } from '../../../models/marca';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0,"");

  //Elementos da modal
  modalService = inject(MdbModalService);
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarroService);

  constructor(){

    this.findAll();

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if(carroNovo){
      carroNovo.id = this.lista.length + 1; 
      this.lista.push(carroNovo);
    }
    if(carroEditado){
      let indice = this.lista.findIndex( x => {return x.id == carroEditado.id});
      this.lista[indice] = carroEditado;
    }

  }

  findAll(){
    this.carroService.findAll().subscribe({
      next: lista => { //retornar o que espera

      this.lista= lista;


      },
      error: erro =>{  //quando ocorrer erro
        Swal.fire({
                title: "Ocorreu um erro",
                icon: 'error',
                confirmButtonText: 'Ok'
              })
      }
    })
  }

  deleteById(carro: Carro){

    Swal.fire({
          title: 'Deseja realmente excluir o carro ' + carro.nome + '?',
          icon: 'warning',
          showConfirmButton: true,
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {


          this.carroService.delete(carro.id).subscribe({
          next: mensagem => { //retornar o que espera

          Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          this.findAll();
            
          },
          error: erro =>{  //quando ocorrer erro
            Swal.fire({
                title: "Ocorreu um erro",
                icon: 'error',
                confirmButtonText: 'Ok'
              })
          }
          });}

  }
);

  
}

  new(){
    this.carroEdit = new Carro(0, "");
    this.modalRef= this.modalService.open(this.modalCarroDetalhe);
}

  edit(carro: Carro){
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){

    this.findAll();
    this.modalRef.close();

  }

}

