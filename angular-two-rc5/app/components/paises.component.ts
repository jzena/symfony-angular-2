import { Component, OnInit } from '@angular/core';
import { PaisesService } from './../services/paises.service';

@Component({
    selector: 'paises',
    template: `
      <h2>Paises</h2>
      <ul>
           <li>España</li>
           <li>Mexico</li>
           <li>Colombia</li>
      </ul>
      <h2>Listado de Post</h2>
      <ol *ngIf="posts">
        <li *ngFor="let post of posts">
           {{post.title}}
        </li>
      </ol>
          
    `,
    providers: [PaisesService]
})
export class PaisesComponent implements OnInit {
    public posts;

    constructor(
        private _paisesService: PaisesService
    ) {
        this._paisesService.getPosts().subscribe(
            result => {
                this.posts = result;
                if (this.posts.length >= 1) {
                    console.log(this.posts);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    ngOnInit() {

    }
}