import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  template: `<h1>{{ data.message }}</h1>`,
  animations: [
    trigger('fade', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('5s')
      ]),
      transition(':leave',
        animate('5s', style({opacity: 0})))
    ])
  ]
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { }
  @ViewChild('dialogElement', { static: true }) dialogElement!: ElementRef;
}