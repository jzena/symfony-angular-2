import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VideoService {

    //public url = "http://localhost:8080/curso-fullstack/symfony/web/app_dev.php";
    //public urlImage = "http://localhost:8080/curso-fullstack/symfony/web/uploads/users/";
    public url = "http://localhost/curso-fullstack/symfony/web/app_dev.php";
    public urlImage = "http://localhost/curso-fullstack/symfony/web/uploads/users/";

    public identity;
    public token;

    constructor(private _http: Http) { }

    create(token, video) {
        let json = JSON.stringify(video);
        let params = "json=" + json + "&authorization=" + token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.url + "/video/new", params, { headers: headers })
            .map(res => res.json());
    }

}