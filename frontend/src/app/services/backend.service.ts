import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    const url = 'http://localhost:1337/';
    return this.http.get(url + 'usuarios');
  }

  registrarUsuario(usuario: any): Observable<any> {
    console.log(usuario);
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'usuarios', usuario);
  }

  comprobarUsuario(usuario: any): Observable<any> {
   
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'usuarios/comprobarUsuario', usuario);
  }

  listarUno(id: any): Observable<any> {
    const url = 'http://localhost:1337/usuarios/' + id;
   
    return this.http.get(url);
  }

  registrarPublicacion(publicacion: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    console.log(publicacion);
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'publicaciones', publicacion,{headers});
  }
}

