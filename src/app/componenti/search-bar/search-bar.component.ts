import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  error: string = '';
  typeBooks!: string;
  constructor(private apiService: ApiService) {}
  book: any;
  title!: string;
  selectedTerm: string = localStorage.getItem('searchTerm')!;
  ngOnInit(): void {
    if (this.selectedTerm) {
      this.apiService.getData(this.selectedTerm).subscribe((data: any) => {
        this.book = data.works;
      });
    }
  }
  onSearch(form: NgForm) {
    const book = form.value.book;
    this.typeBooks = book;
    localStorage.setItem('searchTerm', this.typeBooks);
    this.apiService.getData(this.typeBooks).subscribe(
      (data: any) => {
        this.book = data.works;
        this.error = '';
      },
      (error) => {
        if ((error.status = 404)) {
          this.error = 'You must input a type of book or this type is invalid';
        }
      }
    );
  }
}
