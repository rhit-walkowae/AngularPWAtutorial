# Build your first PWA with Angular and OKTA services

by Andrew Walkowski


## Welcome
One of the hottest trends in web development right now is the practice of Progressive web applications (PWA). Browser requests are handled by a javascript file known as the service worker. This service worker works to get the most recent updates of resources and caches the resources in the browser session so that way the application can operate normally online or offline. 

**NOTE:** This post follows a previous tutorial from Holger Schmitz Use Angular to build your first PWA. Holger’s 2019 tutorial is a good tutorial but is outdated when it comes to OKTA authentication, and angular PWA features. I ran into a lot of bugs running working through the tutorial which probably stems from the tutorial being almost being 3 years old at this time. This tutorial is in many ways a duplicate to Holger’s previous tutorial with modifications to work with more current updates.

## Install Node
Visit this link: https://nodejs.org/en/download/ to download Node.js for your respective os. Download the installer from your browser and follow the instructions. 

## Create a single page application
After node is installed get started on creating the single page application by first installing the angular command line tool. Open a shell and run 
```
npm install -g @angular/cli@latests
```
you may need to run this command with sudo, but this will install the ng command on your OS. Once finished you can create your application 
```
ng new [NameOfDirectory]
```
replace NameOfDirectory with the name of the directory you want to hold the angular application. You will be asked two questions “Would you like to add Angular routing?” reply Yes. Then you will be asked “which stylesheet format would you like to use?” select CSS for that is all you will need for this tutorial. 

# Add angular material

Navigate into the newly made project directory and run the following command
```
Ng add @angular/material
```
Now move to src/app/app.module.ts open this file and change it to match the following:
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatToolbarModule,
         MatMenuModule,
         MatIconModule,
         MatCardModule,
         MatButtonModule,
         MatTableModule,
         MatDividerModule,
         MatProgressSpinnerModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

The html template should also be changed. Navigate to src/app/app.component.html and replace the existing code with the following:
```

<mat-toolbar color="primary" class="expanded-toolbar">
    <span>
      <button mat-button routerLink="/">{{title}}</button>
      <button mat-button routerLink="/"><mat-icon>home</mat-icon></button>
    </span>
    <div fxLayout="row" fxShow="false" fxShow.gt-sm>
        <form [formGroup]="searchForm" (ngSubmit)="onSearch()">
          <div class="input-group">
            <input class="input-group-field" type="search" value="" placeholder="Search" formControlName="search">
            <div class="input-group-button"><button mat-flat-button color="accent"><mat-icon>search</mat-icon></button></div>
          </div>
        </form>
    </div>
    <button mat-button [mat-menu-trigger-for]="menu" fxHide="false" fxHide.gt-sm>
     <mat-icon>menu</mat-icon>
    </button>
</mat-toolbar>
<mat-menu x-position="before" #menu="matMenu">
    <button mat-menu-item routerLink="/"><mat-icon>home</mat-icon> Home</button>

    <form [formGroup]="searchForm" (ngSubmit)="onSearch()">
      <div class="input-group">
        <input class="input-group-field" type="search" value="" placeholder="Search" formControlName="search">
        <div class="input-group-button"><button mat-button routerLink="/"><mat-icon>magnify</mat-icon></button></div>
      </div>
    </form>
</mat-menu>
<router-outlet></router-outlet>
```
Next change src/style.css to the contain the following:
```
@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";

body {
  margin: 0;
  font-family: sans-serif;
}

h1, h2 {
  text-align: center;
}

.input-group {
  display: flex;
  align-items: stretch;
}

.input-group-field {
  margin-right: 0;
}

.input-group .input-group-button {
  margin-left: 0;
  border: none;
}

.input-group .mat-flat-button {
  border-radius: 0;
}
```

Next add the following to src/app/app.component.css:
```
.expanded-toolbar {
  justify-content: space-between;
  align-items: center;
}
```






 
![LibraryHomeImage](ReadMeScreenshots/LibraryHomeImage.png)
