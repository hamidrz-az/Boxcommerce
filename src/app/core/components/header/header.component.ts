import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { NavLinksService } from '../../services/nav-links.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'bxc-header',
  standalone: true,
  imports: [NgFor, RouterModule, MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  nav = this.navLinkService.setLinks();
  constructor(
    private navLinkService: NavLinksService,
    private matIconRegistery: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistery.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/images/bxc-logo.svg'
      )
    );
  }
}
