import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts : any;
  relatedPost : boolean = false;

  constructor(
    private api : ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    const params = this.route.snapshot.params['id'];
    if(params!=undefined){ this.relatedPost = true; }
    console.log(params);

    this.fetchData();
  }

  async fetchData() {
    // const res : any = await this.api.get(this.api.sitelink + 'posts').toPromise(); // no longer use on latest angular version rxjsv7
    const res: any = await lastValueFrom(this.api.get(this.api.sitelink + 'posts'));
    this.posts = res;
    console.log(this.posts);
  }
}
