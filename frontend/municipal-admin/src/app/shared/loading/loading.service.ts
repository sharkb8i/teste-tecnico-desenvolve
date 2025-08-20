import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  loading$ = this._loading$.asObservable();
  private count = 0;

  show() { if (++this.count === 1) this._loading$.next(true); }
  hide() { if (this.count > 0 && --this.count === 0) this._loading$.next(false); }
  reset() { this.count = 0; this._loading$.next(false); }
}