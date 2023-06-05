import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  isDisabled: boolean = true;
  id: any;
  usuario: any;
  contenido: string = '';
  imagen: File | undefined;
  publicaciones: any[] = [];
  usuarioSeguidos: any[] = [];

  constructor(private route: ActivatedRoute, private backandService: BackendService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          this.obtenerUsuariosSeguidos(this.id);
          this.listarPublicaciones(this.id);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  checkInput() {
    if (this.contenido.trim() !== '') {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0].name;
    this.imagen = file;
    console.log(this.imagen);
  }

  onSubmit() {
    const publicacion = {
      contenido: {
        mensaje: this.contenido,
        imagen: this.imagen ? this.imagen : ''
      },
      fecha_publicacion: new Date().toISOString(),
      num_mg: 0,
      num_comentarios: 0,
      id_usuario: this.usuario.id
    };

    this.backandService.registrarPublicacion(publicacion).subscribe(
      response => {
        console.log(response);
        this.listarPublicaciones(this.id);
      },
      error => {
        console.error(error);
      }
    );
  }

  obtenerUsuariosSeguidos(userId: any) {
    this.backandService.obtenerUsuariosSeguidos(userId).subscribe(
      response => {
        this.usuarioSeguidos = response;
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }

  listarPublicaciones(userId: any) {
    this.backandService.obtenerUsuariosSeguidos(userId).subscribe(
      (response) => {
        const usuariosSeguidos = response.map((seguido: any) => seguido.seguido_id.id);
        usuariosSeguidos.push(userId); // Agregar el ID del usuario logueado
  
        this.backandService.listarPublicaciones().subscribe(
          (response) => {
            this.publicaciones = response.filter((publicacion) => {
              return usuariosSeguidos.includes(publicacion.id_usuario);
            });
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  recargarPublicaciones() {
    this.listarPublicaciones(this.id);
  }

  getTimeElapsed(fechaPublicacion: string): string {
    const fechaActual = new Date();
    const fecha = new Date(fechaPublicacion);
  
    return formatDistanceToNow(fecha, { addSuffix: true });
  }
  
  
  
  
}
