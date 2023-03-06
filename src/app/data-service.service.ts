import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private http: HttpClient) {}

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  getUrl(bug: string) {
    return this.http.get(
      'https://api.github.com/search/issues?q=repo:angular/angular+state:open+type:issue+' +
        bug +
        '+in:title'
    );
  }
  showLoader() {
    this._loading.next(true);
  }

  hideLoader() {
    this._loading.next(false);
  }
}
