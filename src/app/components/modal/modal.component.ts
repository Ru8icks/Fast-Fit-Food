import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() show = false;
  @Input() name;
  @Input() closeCallback = () => (false);

  constructor() { }

  ngOnInit() {
  }

}
