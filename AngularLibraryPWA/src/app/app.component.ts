import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { OktaAuthService } from '@okta/okta-angular';
import { BooksService } from './books/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularLibraryPWA';
  searchForm: FormGroup;
  isAuthenticated: boolean = false;

  constructor(public oktaAuth: OktaAuthService, private formBuilder: FormBuilder,
    private router: Router) {
      this.oktaAuth.$authenticationState.subscribe(
        (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
      );
  }

  async ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
    window.addEventListener('online', this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }
  login() {
    this.oktaAuth.signInWithRedirect({
      originalUri: '/profile'
    });
  }
  async logout() {
    // Terminates the session with Okta and removes current tokens.
    console.log('logout');
    this.router.navigateByUrl('');
    await this.oktaAuth.signOut();
    
  }

  onSearch() {
    if (!this.searchForm.valid) return;
    this.router.navigate(['search'], { queryParams: { query: this.searchForm.get('search')?.value } });
  }
  offline: boolean;

  onNetworkStatusChange() {
    this.offline = !navigator.onLine;
    console.log('offline ' + this.offline);
  }
}
