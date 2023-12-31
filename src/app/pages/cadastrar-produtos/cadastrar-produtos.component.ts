import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProdutos } from 'src/app/interfaces/produtos';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css'],
})
export class CadastrarProdutosComponent {
  produtoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    codigoBarras: new FormControl('', Validators.required),
    preco: new FormControl('', [Validators.required]),
  });

  public mask = {
    mask: 'separator.2',
    thousandSeparator: '.',
    decimalMarker: ','
  };

  constructor(private produtosService: ProdutosService) {}

  validarPreco(control: FormControl) {
    const valor = control.value.replace(/[^\d]/g, '');
    if (valor && valor.length > 0) {
      return null;
    } else {
      return { precoInvalido: true }; 
    }
  }

  enviar() {
    const produtoData = this.produtoForm.value;
  
    if (produtoData.nome && produtoData.codigoBarras && produtoData.preco) {

      const produto: IProdutos = {
        id: 0,
        nome: produtoData.nome,
        codigoBarras: produtoData.codigoBarras,
        preco: produtoData.preco, 
      };
  
      this.produtosService.cadastrarProdutos(produto).subscribe(
        (result) => {
          Swal.fire(
            'FEITO!!',
            'Produto cadastrado com sucesso!',
            'success'
          );
        },
        (error) => {
          const { message } = error;
          Swal.fire('ERRO', message, 'error');
        }
      );
    } else {
      Swal.fire('Campos obrigatórios', 'Preencha todos os campos obrigatórios', 'warning');
    }
  }
  
  
}