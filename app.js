import { range, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

const observable = new Observable();

observable.subscribe(x=> console.log(x));

range(1, 200).pipe(
  filter(x => x % 2 === 1),
  map(x => x + x)
).subscribe(x => console.log(x));