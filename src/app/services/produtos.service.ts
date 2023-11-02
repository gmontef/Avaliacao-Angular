import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProdutos } from 'src/app/interfaces/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  produtos: IProdutos[] = [];
  private apiUrl = 'http://localhost:8080/api/produtos'; 

  constructor(private http: HttpClient) { }

  buscarTodos(): Observable<IProdutos[]> {
    return this.http.get<IProdutos[]>(this.apiUrl);
  }

  cadastrarProdutos(produto: IProdutos): Observable<IProdutos> {
    return this.http.post<IProdutos>(this.apiUrl, produto);
  }

  deletarItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  editarItem(id: number, produto: IProdutos): Observable<IProdutos> {
    return this.http.put<IProdutos>(`${this.apiUrl}/${id}`, produto);
  }
}
