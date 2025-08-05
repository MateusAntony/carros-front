import { Component, inject, Input, Output,EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { CarroService } from '../../../services/carro.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Marca } from '../../../models/marca';
import { MarcasslistComponent } from '../../marcas/marcasslist/marcasslist.component';


@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [FormsModule,MarcasslistComponent ],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input("carro") carro: Carro = new Carro(0,'');
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2= inject(Router);

  modalService = inject(MdbModalService);
  @ViewChild("modalMarcas") modalMarcas!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarroService);
  

  constructor() {

    let id = this.router.snapshot.params['id'];
    if(id >0){
      this.findById(id);
    }

  }

  findById(id: number){
   
    this.carroService.findById(id).subscribe({
      next: retorno => {
        this.carro = retorno;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao buscar o carro",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });

  }



  salvar(){
    if(this.carro.id > 0){

      this.carroService.update(this.carro,this.carro.id).subscribe({
      next: mensagem => {
        Swal.fire({
          title: mensagem,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.router2.navigate(['admin/carros'], {state: {carroEditado: this.carro } })
        this.retorno.emit(this.carro);

      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro ao buscar o carro",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
      
      });


    }else{

      this.carroService.save(this.carro).subscribe({
      next: mensagem => {
          Swal.fire({
          title: mensagem,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      this.router2.navigate(['admin/carros'], {state: {carroNovo: this.carro } });
      this.retorno.emit(this.carro);

      },
      error: erro => {

        console.error("[ERRO] - Detalhes do erro:", erro);
        console.error("[ERRO] - Error completo:", JSON.stringify(erro));
        Swal.fire({
          title: "Ocorreu um erro",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
      });

    }


  }

  buscarMarca(){

    this.modalRef = this.modalService.open(this.modalMarcas, {modalClass: 'modal-lg'});

  }

  retornoMarca(marca: Marca){
    this.carro.marca = marca;
    this.modalRef.close();
  }

}

