import { Component, OnInit } from '@angular/core';
import { IProdutos } from 'src/app/interfaces/produtos';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

}