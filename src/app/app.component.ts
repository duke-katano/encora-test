import { Component } from '@angular/core';
import { fromEvent, map } from 'rxjs';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private servicio: DataServiceService) {}
  title = 'encora-test';
  items: any;
  total_results: number = 0;
  resultMessage: string = '';
  loading$ = this.servicio.loading$;

  ngOnInit(): void {
    const source = fromEvent(document, 'keyup');
    const keyDetect = source.pipe(
      map((event) => {
        this.onKeyDown(event);
      })
    );
    const subscribe = keyDetect.subscribe();
  }

  buscar(value: string): void {
    this.items = [];
    this.servicio.showLoader();

    this.servicio.getUrl(value).subscribe({
      next: (v: any) => {
        this.total_results = v.total_count;
        if (this.total_results === 0) {
          this.resultMessage = 'No results found';
        }
        if (this.total_results === 1) {
          this.resultMessage = '1 Result found';
        }
        if (this.total_results > 1) {
          this.resultMessage = this.total_results.toString() + ' Results found';
        }
        this.items = v.items;
      },
      error: (e) => {
        console.error(e);
        this.resultMessage = 'There was an error trying to search';
      },
      complete: () => this.servicio.hideLoader(),
    });
  }

  goTo(url: string): void {
    window.open(url);
  }
  onKeyDown(event: any): void {
    if (event.key === 'ArrowUp') {
      this.moveFocusUp();
    }
    if (event.key === 'ArrowDown') {
      this.moveFocusDown();
    }
  }

  moveFocusDown(): void {
    var elements = document.querySelectorAll('input, div');
    var list = Array.prototype.filter.call(elements, function (item) {
      return item.tabIndex >= '0';
    });
    let index = list.indexOf(document.activeElement);
    if (index + 1 < this.total_results + 1) {
      index = index + 1;
      let n = 'issue' + index.toString();
      document.getElementById(n)!.focus();
    }
  }
  moveFocusUp(): void {
    var elements = document.querySelectorAll('input, div');
    var list = Array.prototype.filter.call(elements, function (item) {
      return item.tabIndex >= 0;
    });
    let index = list.indexOf(document.activeElement);
    if (index - 1 > 0) {
      index = index - 1;
    } else {
      index = 0;
    }
    let n = 'issue' + index.toString();
    document.getElementById(n)!.focus();
  }

  ngOnDestroy() {}
}
