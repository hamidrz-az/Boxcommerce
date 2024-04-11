import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavLinksService {
  constructor() {}

  //Set routes based on the user role
  setLinks() {
    const links = [
      {
        title: 'currency',
        routerLink: '/',
      },
      {
        title: 'length',
        routerLink: 'length',
      },
    ];

    return links;
  }
}
