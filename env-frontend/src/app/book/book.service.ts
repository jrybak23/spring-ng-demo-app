import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Book} from './book.model';
import {Observable} from "rxjs/Observable";
import {SERVER_API_URL} from "../app.constants";
import {Subject} from "rxjs/Subject";

@Injectable()
export class BookService {
  public booksPage = new Subject<any>();

  constructor(private http: Http) {
  }

  getAllBooks(): Observable<any> {
    const observable = this.http.get(`${SERVER_API_URL}/api/v1/books`)
      .map((response: Response) => response.json())
      .share();

    observable.subscribe((booksPage) => this.booksPage.next(booksPage));

    return observable;
  }

  addBook(book: Book): Observable<any> {
    console.log("add book");
    const observable = this.http.post(`${SERVER_API_URL}/api/v1/books`, book)
      .map((response: Response) => response.json())
      .share();

    observable.subscribe(() => this.getAllBooks());

    return observable;
  }

  editBook(book: Book) {
    const observable = this.http.put(`${SERVER_API_URL}/api/v1/books/${book.id}`, book)
      .map((response: Response) => response.json())
      .share();

    observable.subscribe(() => this.getAllBooks());

    return observable;
  }

  deleteBook(bookId: number): Observable<any> {
    const observable = this.http.delete(`${SERVER_API_URL}/api/v1/books/${bookId}`)
      .map((response: Response) => response.json())
      .share();

    observable.subscribe(() => this.getAllBooks());

    return observable;
  }
}
