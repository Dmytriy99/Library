import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  urlCategories: string =
    'https://api.teleport.org/api/urban_areas/slug:los-angeles/ ';
  constructor(private http: HttpClient) {}
  getData(type: string) {
    return this.http.get(`https://openlibrary.org/subjects/${type}.json`);
  }
  getKey(key: string) {
    return this.http.get(`https://openlibrary.org${key}`);
  }
}
