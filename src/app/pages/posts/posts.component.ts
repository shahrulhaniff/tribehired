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
  comments: any;

  constructor(
    private api : ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    const params = this.route.snapshot.params['id'];
    this.fetchData(params);
  }

  async fetchData( id: any) {
    console.log(id)

    var apiUrl = this.api.sitelink + 'posts';

    if(id!=undefined){
      apiUrl = this.api.sitelink + 'posts/' + id;
      console.log(apiUrl);

      this.getComments(id);
    }


    const res: any = await lastValueFrom(this.api.get(apiUrl));
    console.log(Array.isArray(res));
    if (Array.isArray(res)) { this.posts = res; }
    else { this.posts = [res]; }
    console.log(this.posts);
  }

  async getComments(cid:any){
    let commentApi = this.api.sitelink + 'comments?postId=' + cid;
    const comments: any = await lastValueFrom(this.api.get(commentApi));
    this.comments = comments;
    console.log(comments);
  }
}



/*
Side Note Update
// const res : any = await this.api.get(this.api.sitelink + 'posts').toPromise(); // no longer use on latest angular version rxjsv7
*/
