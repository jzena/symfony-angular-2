import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PaisesService {
    constructor(
        private _http: Http
    ) { }

    getPosts() {
        return this._http.get("https://jsonplaceholder.typicode.com/posts")
            .map(res => res.json());
    }
}