import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts : any;

  constructor(
    private api : ApiService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    // const res : any = await this.api.get(this.api.sitelink + 'posts').toPromise(); // no longer use on latest angular version rxjsv7
    const res: any = await lastValueFrom(this.api.get(this.api.sitelink + 'posts'));
    this.posts = res;
    console.log(this.posts)
  }
}
