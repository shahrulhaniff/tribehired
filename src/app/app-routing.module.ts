import { PostsComponent } from './pages/posts/posts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "posts",
    // canActivate: [AuthenticationService],
    loadChildren: () =>
    import("./pages/posts/posts.module").then((m) => m.PostsModule),
  },
  {
    path: 'posts-parent',
    component: PostsComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: "posts-child",
        // canActivate: [GuardService],
        loadChildren: () =>
          import("./pages/posts/posts.module").then((m) => m.PostsModule),
      },
	    {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'test', redirectTo: 'posts' },
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
