import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';
@Component({
  selector: 'app-marcasdetails',
  imports: [FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

  @Input("marca") marca: Marca = new Marca(0, "");
  @Output("retorno") retorno = new EventEmitter<any>();

  private router = inject(ActivatedRoute);
  private router2 = inject(Router);
  private marcaService = inject(MarcaService);

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.marcaService.findById(id).subscribe({
      next: retorno => {
        this.marca = retorno;
      },
      error: erro => {
        Swal.fire({
          title: "Erro ao buscar marca",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  salvar() {
    if (this.marca.id > 0) {
      this.marcaService.update(this.marca, this.marca.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/marcas'], { state: { marcaEditada: this.marca } });
          this.retorno.emit(this.marca);
        },
        error: erro => {
          Swal.fire({
            title: "Erro ao editar marca",
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else {
      this.marcaService.save(this.marca).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/marcas'], { state: { marcaNova: this.marca } });
          this.retorno.emit(this.marca);
        },
        error: erro => {
          Swal.fire({
            title: "Erro ao salvar marca",
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }

}