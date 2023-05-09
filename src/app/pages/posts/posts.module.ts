import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ApiService } from '../../services/api/api.service';
// import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    // HttpClientModule
  ],
  // providers: [ApiService],
})
export class PostsModule { }
