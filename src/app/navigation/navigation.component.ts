import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  
  constructor(
    public authService: AuthService, 
    private breakpointObserver: BreakpointObserver, 
    private router: Router // Inyecta Router aquí
  ) {}

  ngOnInit() {
    // ...
  }

  // Este método comprueba si el usuario tiene un rol específico
  userHasRole(role: string): boolean {
    return this.authService.getUserRoles().includes(role);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


    redirect(pagename: string) {
      this.router.navigate(['/'+pagename]);
    };
}
