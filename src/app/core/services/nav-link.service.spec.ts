import { TestBed } from '@angular/core/testing';
import { NavLinksService } from './nav-links.service';

describe('NavLinksService', () => {
  let service: NavLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavLinksService]
    });
    service = TestBed.inject(NavLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setLinks', () => {
    it('should return an array of links with titles and router links', () => {
      const links = service.setLinks();

      // Ensure links is an array
      expect(Array.isArray(links)).toBeTruthy();

      // Ensure each link has title and routerLink properties
      links.forEach(link => {
        expect(link.title).toBeDefined();
        expect(link.routerLink).toBeDefined();
      });
    });

    it('should return an array containing expected links', () => {
      const expectedLinks = [
        { title: 'currency', routerLink: '/' },
        { title: 'length', routerLink: 'length' }
      ];
      const links = service.setLinks();

      expect(links).toEqual(expectedLinks);
    });
  });
});
