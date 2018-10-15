import { Observable } from 'rxjs';
import { DataContextService } from './../../services/data-context/data-context.service';
import { getHouseholdId, getContactId } from './../../store/context/context.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppContext } from '../../store/context/context.model';

@Component({
  selector: 'wf-home-page',
  templateUrl: './home.routing.component.html',
  styleUrls: ['./home.routing.component.css'],
})
export class HomeRoutingComponent implements OnInit {

  private householdId: Observable<string>;
  private contactId: Observable<string>;

  @ViewChild('hhidInput')
  private hhIdInputChild: ElementRef;
  @ViewChild('contactInput')
  private contactInput: ElementRef;

  constructor(private store: Store<any>, private dataContextService: DataContextService) {}

  ngOnInit() {
    this.householdId = this.store.select(getHouseholdId);
    this.contactId = this.store.select(getContactId);
  }

  dispatchHHChange(event) {
    const newAppContext = new AppContext({
      contactId: undefined,
      accountId: undefined,
      householdId: this.hhIdInputChild.nativeElement.value,
    });

    this.dataContextService.SetFull(newAppContext);
  }

  dispatchContactChange(event) {
    this.dataContextService.Set('contactId', this.contactInput.nativeElement.value);
  }
}
