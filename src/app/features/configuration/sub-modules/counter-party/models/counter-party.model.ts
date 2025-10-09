export interface CounterPartyModel {
  orgCounterPartyID: number;
  counterPartyName: string;
  counterPartyType: number;
  address: string;
  stateID: number;
  cityID: number;
  countryID: number;
  personName: string;
  contactNo: string;
}

// Represents an Address object
export interface Address {
  address: string;
  stateID: number;
  cityID: number;
  countryID: number;
  defultPrimary: number;
}

// Represents a Contact object
export interface Contact {
  personName: string;
  email: string;
  contactNo: string;
  designation: string;
}

// Main CounterParty Interface
export interface ViewCounterParty {
  counterPartyName: string;
  webSiteUrl: string;
  counterPartyType: number;
  newAddressList: Address[];
  newContactList: Contact[];
}

export interface CounterPartyType {
  counterPartyTypeId: number;
  counterPartyTypeName: string;
}

export interface NewContact extends Contact {
  primaryContact: number;
}



export interface AddCounterParty {
  counterPartyName: string;
  orgID: number;
  counterPartyType: number;
  webSiteUrl: string | null;
  createdBy: number;
  createdDate: string;
  newAddressList: Address[];
  newContactsList: NewContact[];

}
