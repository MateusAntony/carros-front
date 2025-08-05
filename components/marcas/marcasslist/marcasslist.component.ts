import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Marca } from '../../../models/marca';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-marcasslist',
  imports: [RouterLink, MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcasslist.component.html',
  styleUrl: './marcasslist.component.scss'
})
export class MarcasslistComponent {
lista: Marca[] = [];
  marcaEdit: Marca = new Marca(0, '');
  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();
  

  modalService = inject(MdbModalService);
  @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  marcaService = inject(MarcaService);

  constructor() {
    this.findAll();

    let marcaNova = history.state.marcaNova;
    let marcaEditada = history.state.marcaEditada;

    if (marcaNova) {
      marcaNova.id = this.lista.length + 1;
      this.lista.push(marcaNova);
    }

    if (marcaEditada) {
      let indice = this.lista.findIndex(x => x.id === marcaEditada.id);
      this.lista[indice] = marcaEditada;
    }
  }

  findAll() {
    this.marcaService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  deleteById(marca: Marca) {

    console.log('Tentando deletar:', marca);
    Swal.fire({
      title: 'Deseja realmente excluir a marca ' + marca.nome + '?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.delete(marca.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.findAll();
          },
          error: erro => {
            Swal.fire({
              title: "Ocorreu um erro",
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }

  new() {
    this.marcaEdit = new Marca(0, '');
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca) {
    this.marcaEdit = Object.assign({}, marca);
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca) {
    this.findAll();
    this.modalRef.close();
  }

  selecionar(marca: Marca){
    this.retorno.emit(marca);
  }
}