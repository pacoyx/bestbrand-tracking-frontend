import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DeviceDetectionService {

  isMobile$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  isDesktop$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(map(result => result.matches));
      
    this.isTablet$ = this.breakpointObserver.observe([Breakpoints.Tablet])
      .pipe(map(result => result.matches));
      
    this.isDesktop$ = this.breakpointObserver.observe([Breakpoints.Web])
      .pipe(map(result => result.matches));
  }
}