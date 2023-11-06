import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { LocationListComponent } from './location-list/location-list.component';
import { DistancePipe } from './distance.pipe';
import { HttpClientModule } from "@angular/common/http";
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StarsComponent } from './stars/stars.component';

@NgModule({
  declarations: [
    //AppComponent,
    LocationListComponent,
    DistancePipe,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    HeaderComponent,
    SidebarComponent,
    StarsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: HomepageComponent},
      { path: "about", component: AboutComponent },
    ]),
    
  ],
  providers: [],
  bootstrap: [ FrameworkComponent ]
})
export class AppModule { }
