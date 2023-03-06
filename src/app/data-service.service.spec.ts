import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DataServiceService } from './data-service.service';

describe('DataServiceService', () => {
  let service: DataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DataServiceService],
    });
    service = TestBed.inject(DataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called', () => {
    let typed = 'bug';
    const http = TestBed.inject(HttpClient);
    const httpGetSpy = spyOn(http, 'get').and.returnValue(of('Test result.'));
    service.getUrl(typed).subscribe();
    expect(httpGetSpy).toHaveBeenCalledWith(
      'https://api.github.com/search/issues?q=repo:angular/angular+state:open+type:issue+' +
        typed +
        '+in:title'
    );
  });
});
