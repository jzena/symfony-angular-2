import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './../services/login.service';
import { VideoService } from './../services/video.service';

@Component({
    selector: 'channel',
    templateUrl: 'app/view/channel.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, VideoService]
})
export class ChannelComponent implements OnInit {
    public titulo = "Canal";
    public identity;
    public videos;
    public errorMessage;
    public status;
    public urlvideoImage;
    public loading;
    public pages;
    public pagePrev = 1;
    public pageNext = 1;
    public userChannel;
    public userImage: string = "";

    constructor(
        private _loginService: LoginService,
        private _videoService: VideoService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.loading = 'show';
        this.identity = this._loginService.getIdentity();
        this.urlvideoImage = this._videoService.urlvideoimage;
        if (this.identity) {
            this.userImage = this._loginService.urlImage + this.identity.image;
        }
        this.getChannelVideos();
    }

    getChannelVideos() {

        this._route.params.subscribe(params => {
            let user: any = params["user"];

            if (!user) {
                user = this.identity.sub;
            }

            let page: any = +params["page"];
            if (!page) {
                page = 1;
            }

            this.loading = 'show';
            this._videoService.getChannel(user, page).subscribe(
                response => {
                    this.status = response.status;
                    if (this.status != "success") {
                        this.status = "error";
                    }
                    else {
                        this.videos = response.data.videos;
                        this.userChannel = response.data.user
                        this.loading = 'hide';

                        this.pages = [];
                        for (let i = 0; i < response.total_pages; i++) {
                            this.pages.push(i);
                        }

                        if (page >= 2) {
                            this.pagePrev = (page - 1);
                        }
                        else {
                            this.pagePrev = page;
                        }

                        if (page < response.total_pages || page == 1) {
                            this.pageNext = (page + 1);
                        }
                        else {
                            this.pageNext = page;
                        }
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
    }

}