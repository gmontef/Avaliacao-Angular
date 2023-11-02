import { Component, OnInit } from '@angular/core';
import { IProdutos } from 'src/app/interfaces/produtos';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit {
  produtos: IProdutos[] = [];

  constructor(private produtosService: ProdutosService) {}

  ngOnInit() {
    this.produtosService.buscarTodos().subscribe(
      (produtos) => {
        this.produtos = produtos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletarItem(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtosService.deletarItem(id).subscribe(
          response => {
            this.produtosService.buscarTodos().subscribe(
              produtos => { 
                this.produtos = produtos; 
              }
            );
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  editarItem(produto: IProdutos) {
    Swal.fire({
      title: 'Editar Produto',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nome do Produto">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Código de Barras">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Preço">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let updatedProduto = {...produto};
        updatedProduto.nome = result.value[0];
        updatedProduto.codigoBarras = result.value[1];
        updatedProduto.preco = parseFloat(result.value[2].replace(',', '.')).toFixed(2);
  
        this.produtosService.editarItem(produto.id, updatedProduto).subscribe(
          response => {
            this.produtosService.buscarTodos().subscribe(
              produtos => { 
                this.produtos = produtos; 
              }
            );
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }  
  
}
