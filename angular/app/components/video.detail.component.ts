import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './../services/login.service';
import { VideoService } from './../services/video.service';
import { Video } from './../model/video';
import { User } from './../model/user';
import { GenerateDatePipe } from './../pipes/generate.date.pipe';

@Component({
    selector: 'video-detail',
    templateUrl: 'app/view/video.detail.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, VideoService],
    pipes: [GenerateDatePipe]
})
export class VideoDetailComponent implements OnInit {
    private sub: any;
    public errorMessage;
    public status;
    public video;
    public loading = 'show';
    public urlVideo = '';
    public urlVideoimage = '';
    public lastsVideos;
    public statusLastsVideos;

    constructor(
        private _loginService: LoginService,
        private _videoService: VideoService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {

        this.sub = this._route.params.subscribe(params => {
            this.loading = 'show';
            let id = +params["id"];
            this._videoService.getVideo(id).subscribe(
                response => {
                    this.status = response.status;
                    this.video = response.data;

                    if (this.status != "success") {
                        this._router.navigate(["/index"]);
                    }

                    this.urlVideo = this._videoService.urlvideo + id.toString() + "/" + this.video.videoPath;
                    this.urlVideoimage = this._videoService.urlvideoimage;
                    this.loading = 'hide';
                },
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            );

            // GET LAST videos
            this._videoService.getLastVideos().subscribe(
                response => {
                    this.lastsVideos = response.data;
                    this.statusLastsVideos = response.status;

                    if (this.statusLastsVideos != 'success') {
                        this._router.navigate(["/index"]);
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            );
        });

        console.log("Hola desde el componente de video detail");
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
        console.log("exit to componenet video detail");
    }
}