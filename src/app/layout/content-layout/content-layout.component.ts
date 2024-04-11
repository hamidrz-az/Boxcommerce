import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
  selector: 'bxc-content-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss'
})
export class ContentLayoutComponent {

}
