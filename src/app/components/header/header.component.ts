import { Component, Input } from '@angular/core';

@Component({
  selector: 'treinamento-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() nome: string = 'Digite o nome do produto';

  ngOnInit() {
    if (this.nome === 'NomedoProduto') {
      console.log('teste');
    }
  }

  cadastroValido(): boolean {
    return this.nome === 'Ativado';
  }

}