export class AppContext {
  public householdId: string;
  public contactId: string;
  public accountId: number;

  constructor({householdId, contactId, accountId}) {
    this.householdId = householdId;
    this.contactId = contactId;
    this.accountId = accountId;
  }
}
