import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProdutos } from 'src/app/interfaces/produtos';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css'],
})
export class EditarProdutosComponent implements OnInit {
  produtoForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    codigoBarras: new FormControl('', Validators.required),
    preco: new FormControl('', [Validators.required]),
  });

  public mask = {
    mask: 'separator.2',
    thousandSeparator: '.',
    decimalMarker: ','
  };

  constructor(private route: ActivatedRoute, private produtosService: ProdutosService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.produtoForm.controls['id'].setValue(id);
  }  
  
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
  
    if (produtoData.nome && produtoData.codigoBarras && produtoData.preco && produtoData.id) {

      const produto: IProdutos = {
        id: Number(produtoData.id),
        nome: produtoData.nome,
        codigoBarras: produtoData.codigoBarras,
        preco: produtoData.preco, 
      };
  
      this.produtosService.editarItem(produto.id, produto).subscribe(
        (result) => {
          Swal.fire(
            'FEITO!!',
            'Produto atualizado com sucesso!',
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
