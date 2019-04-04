import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  inputValue: any;
  consonantValue: any;
  wordValue: number;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private router: Router) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  // getInputValue(){
  //   console.log(this.inputValue);
  // }
  // getConsonantValue(){
  //   console.log(this.consonantValue);
  // }

  submitStuff(){
    const datavalues: any = <any>{};
    datavalues.number = this.inputValue;
    datavalues.consonants = this.consonantValue;
    this.router.navigate(['/training', {number: this.inputValue, consonant: this.consonantValue, word: this.wordValue}])
  }
}
