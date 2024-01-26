import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  key!: string;
  description!: string;
  title!: string;
  authors!: string;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('id')!;
    this.apiService.getKey(this.key).subscribe((data: any) => {
      this.description = data.description.value || data.description;
      this.title = data.title;
    });
  }
}
