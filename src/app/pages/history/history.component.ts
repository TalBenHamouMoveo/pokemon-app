import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{
  recentSearch: string[];
  historyMessage: string;

  ngOnInit(): void {
    this.recentSearch = JSON.parse(localStorage.getItem('recentSearch'));
    if (!this.recentSearch || this.recentSearch.length === 0) {
      this.historyMessage = "History Log Is Empty !";
    }
    console.log('this.recentSearch :>> ', this.recentSearch);
  }

  constructor() {
    
  }



}
