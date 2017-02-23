import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './../services/login.service';
import { CommentService } from './../services/comment.service';
import { GenerateDatePipe } from './../pipes/generate.date.pipe';
import { Video } from './../model/video';
import { User } from './../model/user';

@Component({
    selector: 'comments',
    templateUrl: 'app/view/comments.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, CommentService],
    pipes: [GenerateDatePipe]
})
export class CommentsComponent implements OnInit {
    public titulo: string = "Comentarios";
    public comment;
    public identity;
    public errorMessage;
    public status;
    public statusComments;
    public commentList;
    public loading = 'show';

    constructor(
        private _loginService: LoginService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _commentService: CommentService
    ) { }

    ngOnInit() {
        this.identity = this._loginService.getIdentity();

        this._route.params.subscribe(
            params => {
                let id = +params["id"];
                this.comment = {
                    "video_id": id,
                    "body": ""
                }

                // Conseguir comentarios
                this.getComments(id);
            }
        );
    }

    onSubmit() {
        this.loading = 'show';
        console.log(this.comment);

        let token = this._loginService.getToken();
        this._commentService.create(token, this.comment).subscribe(
            response => {
                this.statusComments = response.status;
                if (this.statusComments != "success") {
                    this.statusComments = "error";
                }
                else {
                    this.comment.body = "";

                    // Recargar los comentarios
                    this.getComments(this.comment.video_id);
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
    }

    getComments(video_id) {
        this.loading = 'show';
        this._commentService.getCommentsOFVideo(video_id).subscribe(
            response => {
                this.status = response.status;
                if (this.status != "success") {
                    this.status = "error";
                }
                else {
                    this.commentList = response.data;
                    console.log(this.commentList);
                    this.loading = 'hide';
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
    }

    deleteComment(id){

    }
}