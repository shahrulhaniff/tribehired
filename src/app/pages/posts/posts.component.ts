import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
interface Option {
  id: string;
  value: string;
}
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {

  options: Option[] = [
    { id: '1', value: 'name' },
    { id: '2', value: 'email' },
    { id: '3', value: 'body' }
  ];

  posts : any;
  relatedPost : boolean = false;
  comments: any;
  searchText: any = '';
  selectedOption: string = 'name';
  secondPage: boolean = false;

  constructor(
    private api : ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params['id'];
    this.fetchData(params);

    console.log(this.options);
    console.log(this.selectedOption);
  }

  async fetchData( id: any) {
    var apiUrl = this.api.sitelink + 'posts';
    if(id!=undefined){
      this.secondPage = true;
      apiUrl = this.api.sitelink + 'posts/' + id;
      this.getComments(id);
    }
    const res: any = await lastValueFrom(this.api.get(apiUrl));
    console.log(Array.isArray(res));
    if (Array.isArray(res)) { this.posts = res; }
    else { this.posts = [res]; }
    console.log(this.posts);
  }

  async getComments(id:any){
    let commentApi = this.api.sitelink + 'comments?postId=' + id;
    this.comments = await lastValueFrom(this.api.get(commentApi));
    console.table(this.comments);
  }

  onOptionSelect(optionId: string, optionValue: string) {
    this.selectedOption = optionId;
    console.log(`Selected option is: ${this.selectedOption}`);
  }

  search(searchKey:any) {
    console.log(searchKey);
  }
}
