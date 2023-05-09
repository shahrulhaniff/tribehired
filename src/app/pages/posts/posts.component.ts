/** copyright - this is shahrulhaniff codes: i'll try to make it as simple as possible */
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

  debugparam : any;

  constructor(
    private api : ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params['id'];
    // debugger
    this.debugparam = params;
    this.fetchData(params); // note : there are various ways to fetch api like .subscribe, .toPromise, firstVal, etc.. i choose lastValueFrom
    // console.log(this.options);
    // console.log(this.selectedOption);
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

  async search(searchKey:any) {
    // debugger
    // console.log(this.debugparam);
    // console.table(this.comments);
    // this.getComments(this.debugparam);
    let commentApi = this.api.sitelink + 'comments?postId=' + this.debugparam;
    this.comments = await lastValueFrom(this.api.get(commentApi));
    // if(this.selectedOption=='name') { this.comments =  this.comments.filter((item: { name: any; }) => item.name == searchKey ); }
    if(this.selectedOption=='name') { this.comments = await this.comments.filter((item: { name: any; }) => item.name.includes(searchKey) ); }
    if(this.selectedOption=='email') { this.comments = await  this.comments.filter((item: { email: any; }) => item.email == searchKey ); }
    if(this.selectedOption=='body') { this.comments = await this.comments.filter((item: { body: any; }) => item.body.includes(searchKey) ); }

    // debugger
    // console.log(searchKey);
    console.log(this.comments);
    // console.log(this.selectedOption);
  }
}
