import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getHouseholdId, getContactId } from '../../../store/context/context.selectors';

@Component({
  selector: 'wf-home-container',
  templateUrl: './home.container.component.html',
  styleUrls: ['./home.container.component.css']
})
export class HomeContainerComponent implements OnInit {

  public hhid: Observable<string>;
  public contactId: Observable<string>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.hhid = this.store.select(getHouseholdId);
    this.contactId = this.store.select(getContactId);
  }

}
