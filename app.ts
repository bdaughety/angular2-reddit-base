/// <reference path="typings/angular2/angular2.d.ts"/>

import {
  Component,
  NgFor,
  View,
  bootstrap,
} from "angular2/angular2";

@Component({
  selector: 'hello-world'
})
@View({
  directives: [NgFor],
  template: `
  <ul>
    <li *ng-for="#name of names">Hello {{name}}</li>
  </ul>`
})
class HelloWorld {
  names: Array<string>;

  constructor() {
    this.names = ["Homer", "Marge", "Bart", "Lisa", "Maggie"];
  }
}

@Component({
  selector: 'reddit'
})
@View({
  template: `
    <section class="new-link">
      <div class="control-group">
        <div><label for="title">Title:</label></div>
        <div><input type="text" name="title" #newtitle/></div>
      </div>
      <div class="control-group">
        <div><label for="link">Link:</label></div>
        <div><input type="text" name="link" #newlink/></div>
      </div>

      <button (click)="addArticle(newtitle, newlink)">Submit Link</button>
    </section>
  `,
  directive: [NgFor]
})
class RedditApp {
  addArticle(title, link) {
    console.log("Adding article with title", title.value, "and link", link.value);
  }
}


@Component({
  selector: 'reddit-article',
  properties: {
    'article': 'article'
  }
})
@View({
  template: `
    <article>
      <div class="votes">{{article.votes}}</div>
      <div class="main">
        <h2>
          <a href="{{article.link}}">{{article.title}}</a>
          <span>({{article.domain()}})</span>
        </h2>
        <ul>
          <li><a href (click)="voteUp()">upvote</a></li>
          <li><a href (click)="voteDown()">downvote</a></li>
        </ul>
      </div>
    </article>
  `
})
class RedditArticle {
  votes: number;
  title: string;
  link: string;

  constructor() {
    this.votes = 10;
    this.title = 'Angular 2';
    this.link = 'http://angular.io';
  }

  voteUp() {
    this.votes += 1;
    return false;
  }

  voteDown() {
    this.votes -= 1;
    return false;
  }
}

bootstrap(RedditApp);
