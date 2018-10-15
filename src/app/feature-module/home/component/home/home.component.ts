import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input()
  public householdId: string;

  @Input()
  public contactId: string;

  constructor() { }

  ngOnInit() {}

}
