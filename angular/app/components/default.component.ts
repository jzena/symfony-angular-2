import { Component, OnInit } from '@angular/core';

@Component({    
    selector: 'default',
    template: '<h1>componente por defecto</h1>'    
})
export class DefaultComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}