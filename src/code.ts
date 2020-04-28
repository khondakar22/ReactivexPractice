import { interval, timer, combineLatest, fromEvent, concat, of, empty, forkJoin, from, throwError, merge, race, zip, iif, Observable, defer } from 'rxjs';
import { mapTo, startWith, scan, tap, map, delay, concatAll, take, endWith, finalize, mergeMap, catchError, mergeAll, pairwise, withLatestFrom, defaultIfEmpty, every, throttleTime, filter, switchMap, sequenceEqual, bufferCount, takeWhile } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
/**
 * RXJS Operator Lists for learning purpose
 */

//  /**********1-CombineALL()-Example Start*******************/
// // emit every 1s, take 2
// const source$ = interval(1000).pipe(take(2));
// // map each emitted value from source to interval observable that takes 5 values
// const example$ = source$.pipe(
//   map(val =>
//     interval(1000).pipe(
//       map(i => `Result (${val}): ${i}`),
//       take(5)
//     )
//   )
// );
// /*
//   2 values from source will map to 2 (inner) interval observables that emit every 1s.
//   combineAll uses combineLatest strategy, emitting the last value from each
//   whenever either observable emits a value
// */
// example$
//   .pipe(combineAll())
//   /*
//   output:
//   ["Result (0): 0", "Result (1): 0"]
//   ["Result (0): 1", "Result (1): 0"]
//   ["Result (0): 1", "Result (1): 1"]
//   ["Result (0): 2", "Result (1): 1"]
//   ["Result (0): 2", "Result (1): 2"]
//   ["Result (0): 3", "Result (1): 2"]
//   ["Result (0): 3", "Result (1): 3"]
//   ["Result (0): 4", "Result (1): 3"]
//   ["Result (0): 4", "Result (1): 4"]
// */
//   .subscribe(console.log);
//   /**********1-CombineALL()-Example End*******************/

/**********2-CombineLatest()-Example(1) Start*******************/
// // timerOne emits first value at 1s, then once every 4s
// const timerOne$ = timer(1000, 4000);
// // timerTwo emits first value at 2s, then once every 4s
// const timerTwo$ = timer(2000, 4000);
// // timerThree emits first value at 3s, then once every 4s
// const timerThree$ = timer(3000, 4000);

// // when one timer emits, emit the latest values from each timer as an array
// combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
//   ([timerValOne, timerValTwo, timerValThree]) => {
//     /*
//       Example:
//     timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
//     timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
//     timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
//   */
//     console.log(
//       `Timer One Latest: ${timerValOne},
//      Timer Two Latest: ${timerValTwo},
//      Timer Three Latest: ${timerValThree}`
//     );
//   }
// );

/**********2-CombineLatest()-Example(1) End*******************/





// /**********2-CombineLatest()-Example(2) Start*******************/
// // timerOne emits first value at 1s, then once every 4s
// const timerOne$ = timer(1000, 4000);
// // timerTwo emits first value at 2s, then once every 4s
// const timerTwo$ = timer(2000, 4000);
// // timerThree emits first value at 3s, then once every 4s
// const timerThree$ = timer(3000, 4000);

// combineLatest(timerOne$, timerTwo$, timerThree$, (one, two, three)=> {
//   return `Timer One Latest: ${one},
//          Timer Two Latest: ${two},
//          Timer Three Latest: ${three}`
// }).subscribe(console.log);

// /**********2-CombineLatest()-Example(2) End*******************/

// /**********2-CombineLatest()-Example(3) Start*******************/
// //elem refs
// const redTotal = document.getElementById('red-total');
// const blackTotal = document.getElementById('black-total');
// const total = document.getElementById('total');

// const addOnClick$ = (id: string) => {
//   return fromEvent(document.getElementById(id), 'click').pipe(
//     // Map every click to 1
//     mapTo(1),
//     // Keep a running total
//     scan((acc, curr)=> acc+curr, 0),
//     startWith(0)
//   );
// }
// combineLatest(addOnClick$('red'), addOnClick$('black')).subscribe(
//   ([red, black]: any) => {
//     redTotal.innerHTML = red;
//     blackTotal.innerHTML = black; 
//     total.innerHTML = red + black;
//   }
// )

// /**********2-CombineLatest()-Example(3) End*******************/


/**********3-Concat()-Example(1) Start*******************/
// concat(of(1,2,3), of(4,5,6), of(7,8,9)).subscribe(console.log);
/**********3-Concat()-Example(1) End*******************/


/**********3-Concat()-Example(2) Start*******************/
// Display Message Using Concat with delayed observables

//elems
// const userMessage = document.getElementById('message');
// helper
// const delayedMessage = (message: any, delayedMessage = 1000) => {
//   return empty().pipe(
//     startWith(message),
//     delay(delayedMessage)
//   );
// }
//   concat(
//     delayedMessage('Get Ready!'),
//     delayedMessage(3),
//     delayedMessage(2),
//     delayedMessage(1),
//     delayedMessage('Go!'),
//     delayedMessage('', 2000)
//   ).subscribe((message: any) => (userMessage.innerHTML = message));

/**********3-Concat()-Example(2) End*******************/

/**********3-Concat()-Example(3) Start*******************/
// when source never completes, any subsequent observables never run
// concat(interval(1000), of('This', 'Never', 'Runs')).subscribe(console.log);
/**********3-Concat()-Example(3) End*******************/

/**********4-ConcatAll()-Example(1) Start*******************/
// // emit a value every 2 seconds
// const source = interval(2000);
// const example = source.pipe(
//   // for demonstration, add 10 to and return as observable
//   map(val => of(val + 10)),
//   //merge values from inner observable
//   concatAll()
// )
// // output: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
// const subscribe = example.subscribe(val => console.log('Example with basic Observable', val));
/**********4-ConcatAll()-Example(1) End*******************/

// /**********4-ConcatAll()-Example(2) Start*******************/
// // ConcatAll with Promise 
// // Create and resolve basic promise
// const samplePromise = (val: any) => new Promise(resolve => resolve(val));
// //emit a value every 2 seconds
// const source = interval(2000);

// const example = source.pipe(
//   map(val => samplePromise(val)),
//   // Merge values from resolved promise
//   concatAll()
// );
// // Output: 'Example with Promise 0', 'Example with Promise 1'....
// const subscribe = example.subscribe(val => console.log('example with Promise:', val));
// /**********4-ConcatAll()-Example(2) End*******************/

/**********4-ConcatAll()-Example(3) Start*******************/
// ConcatAll with Promise 
// const obs1 = interval(1000).pipe(take(5));
// const obs2 = interval(500).pipe(take(2));
// const obs3 = interval(2000).pipe(take(1));

// //emit three observables
// const source = of(obs1, obs2, obs3);
// //subscribe to each inner observable in order when previous completes
// const example = source.pipe(concatAll());

// // Output
// const subscribe = example.subscribe(val => console.log(val));

/**********4-ConcatAll()-Example(3) End*******************/

/**********5-EndWith()-Example(1) Start*******************/
// const source$ = of('Hello', 'Friend', 'Goodby'); 

// source$.pipe(
//   // emit on completion
//   endWith('Friend')
// ).subscribe(val => console.log(val));
/**********5-ConcatAll()-Example(1) End*******************/


/**********5-EndWith()-Example(2) Start*******************/
// const source$ = of('Hello', 'Friend'); 

// source$.pipe(
//   // emit on completion
//   endWith('GoodBye', 'Friend')
// ).subscribe(val => console.log(val));
/**********5-ConcatAll()-Example(2) End*******************/

/**********5-EndWith()-Example(2) Start*******************/
// const source$ = of('Hello', 'Friend'); 

// source$.pipe(
//   // emit on completion
//   endWith('GoodBye', 'Friend')
// ).subscribe(val => console.log(val));
/**********5-ConcatAll()-Example(2) End*******************/

/**********5-EndWith()-Example(3) Start*******************/
// Comparison To Finalize
// const source$ = of('Hello', 'Friend'); 

// source$.pipe(
//   // emit on completion
//   endWith('GoodBye', 'Friend'),
//   // This function is invoked when unsubscribe methods are called
//   finalize(()=> console.log('Finally'))
// ).subscribe(val => console.log(val));
/**********5-EndWith()-Example(3) End*******************/

/**********6- ForkJoin()-Example(1) Start*******************/
/**
 * When all observables complete, provide the last emitted value
 * from each as dictionary
 */
// forkJoin(
//   // as of RxJs 6.5+ we can use a dictionary of sources
//   {
//     google: ajax.getJSON('https://api.github.com/users/google'),
//     microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
//     users: ajax.getJSON('https://api.github.com/users')
//   }
// ).subscribe(console.log);

/**********6- ForkJoin()-Example(1) End*******************/

/**********6- ForkJoin()-Example(2) Start*******************/
/**
 * Observables completing after different durations
 */
// const myPromise = (val: any) => new Promise(resolve => setTimeout(()=> resolve(`Promise Resolved: ${val}`), 5000) );
/*
  when all observables complete, give the last
  emitted value from each as an array
*/
// const example = forkJoin(
//   // emit 'Hello' immediately
//   of('Hello'),
//   // emit 'World' after 1 second
//   of('World').pipe(delay(1000)),
//   // emit 0 after 1 second
//   interval(1000).pipe(take(1)),
//   // emit 0...1 in 1 second interval
//   interval(1000).pipe(take(2)),
//   // promise that resolves to 'Promise.Resolved' after 5 seconds
//   myPromise('RESULT')
// )
// const subscribe = example.subscribe(val => console.log(val));

/**********6- ForkJoin()-Example(2) End*******************/

/**********6- ForkJoin()-Example(3) Start*******************/
/**
 * Making a variable number of requests
 */
// const myPromise = (val: any) => new Promise(resolve => setTimeout(()=> resolve(`Promise Resolved: ${val}`), 5000));
// const source$ = of([1,2,3,4,5]);
// emit array of all 5 results
// const example = source$.pipe(mergeMap(q => forkJoin(...q.map(myPromise))));
// Output
// const subscribe = example.subscribe(val => console.log(val)); 
/**********6- ForkJoin()-Example(3) End*******************/

/**********6- ForkJoin()-Example(4) Start*******************/
/**
 * Handling Errors on outside
 */
// When all observables complete, give the last emitted value from each as an array
// const example = forkJoin(
  // emit 'Hello' immediately
  // of('Hello'),
  // Emit 'World' after 1 second
  // of('World').pipe(delay(1000)),
  // Throw error
//   throwError('This will error').pipe(catchError(error => of(error)))
// );
// Output: 'This will error
// const subscribe = example.subscribe(val => console.log(val));

/**********6- ForkJoin()-Example(4) End*******************/


/**********7- Merge()-Example(1) Start*******************/
// Emit every 2.5 seconds
// const first = interval(2500); 
// // Emit every 2 seconds
// const second = interval(2000);
// // Emit every 1.5 seconds 
// const third = interval(1500);
// // Emit every 1 seconds
// const fourth = interval(1000);

// emit outputs from one observable
// const example = merge(
//   first.pipe(mapTo('First!')),
//   second.pipe(mapTo('Second!')),
//   third.pipe(mapTo('Third')),
//   fourth.pipe(mapTo('Fourth'))
// )
//Output:
// const subscribe = example.subscribe(val => console.log(val));
/**********7- Merge()-Example(1) End*******************/


/**********7- Merge()-Example(2) Start*******************/
//emit every 2.5 seconds
// const first = interval(2500);
// //emit every 1 second
// const second = interval(1000);
// //used as instance method
// const example = first.pipe(merge(second));
// //output: 0,1,0,2....
// const subscribe = example.subscribe(val => console.log(val));
/**********7- Merge()-Example(2) End*******************/

/**********8- MergeAll()-Example(1) Start*******************/
// MergeAll with promises
// const myPromise = (val : any) => new Promise(resolve => setTimeout(()=> resolve(`Result: ${val}`), 2000)); 
// emit 1,2,3
// const source = of(1,2,3); 

// const example = source.pipe(
//   //map each value to promise 
//   map(val => myPromise(val) ),
//   //emit result from source
//   mergeAll()
// );
// const subscribe = example.subscribe(val => console.log(val));
/**********8- MergeAll()-Example(1) End*******************/

/**********8- MergeAll()-Example(2) Start*******************/
// const source = interval(500).pipe(take(5));
// const example = source.pipe(map(val => source.pipe(delay(1000), take(3))), mergeAll(2)).subscribe(val => console.log(val));

/**********8- MergeAll()-Example(2) End*******************/

/**********9- PairWise ()-Example(1) Start*******************/
// const source = interval(1000).pipe(pairwise(), take(5)).subscribe(console.log);
/**********9- Pair Wise ()-Example(1) End*******************/

/**********10- RaceWith ()-Example(1) Start*******************/
// const example = race(
  // emit every 1.5s
  // interval(1500),
  // emit every 1s
  // interval(1000).pipe(mapTo('1s won!')),
  // emit every 2s
  // interval(2000),
  // emit every 2.5s
//   interval(2500)
// );
// const subscribe = example.subscribe(val => console.log(val)); 
/**********10- RaceWith ()-Example(1) End*******************/


/**********10- RaceWith ()-Example(2) Start*******************/
// Throws an error and ignores the other observables
// const first = of('first').pipe(
//   delay(100),
//   map(_ => {
//     throwError('Error');
//   })
// )
// const second = of('second').pipe(delay(200));
// const third = of('third').pipe(delay(300));
// nothing logged
// race(first, second, third).subscribe(val => console.log(val));
/**********10- RaceWith ()-Example(2) End*******************/

/**********11- StartWith()-Example(1) Start*******************/
// emit(1,2,3)
// const source = of(1,2,3);
// const example = source.pipe(startWith(0));
// const subscribe = example.subscribe(console.log);
/**********11- StartWith()-Example(1) End*******************/

/**********11- StartWith()-Example(2) Start*******************/
//StartWith for initial scan value
// const source = of('World!', 'Goodbye', 'World!');
// // start with 'Hello', concat current string to previous
// const example = source.pipe(
//   startWith('Hello'),
//   scan((acc, curr)=> `${acc} ${curr}`)
// );
// const subscribe = example.subscribe(val => console.log(val));
/**********11- StartWith()-Example(2) End*******************/

/**********11- StartWith()-Example(3) Start*******************/
// const source = interval(1000);
//start with -3, -2, -1
// const example = source.pipe(startWith(-3,-2,-1)).subscribe(val => console.log(val));
/**********11- StartWith()-Example(3) End*******************/

/**********12- WithLatestForm()-Example(1) Start*******************/
// const source = interval(5000);
// const secondSource = interval(1000);
// const example = source.pipe(withLatestFrom(secondSource), map(([first, second]) => {return `First source (5s); ${first} Second Source (1s): ${second}`}));
// const subscribe = example.subscribe(val => console.log(val));
/**********12- WithLatestForm()-Example(1) End*******************/

/**********12- WithLatestForm()-Example(2) Start*******************/
// const source = interval(5000);
// const secondSource = interval(1000);
// const example = secondSource.pipe(
//   withLatestFrom(source),
//   map(([first, second])=>{return `First source (1s); ${first} Second Source (5s): ${second}`} )
// )
// const subscribe = example.subscribe(console.log);
/**********12- WithLatestForm()-Example(1) End*******************/

/**********13- Zip()-Example(1) Start*******************/
// Zip Multiple Observables Emitting at alternate intervals
// const sourceOne = of('Hello');
// const sourceTwo = of('World!');
// const sourceThree = of('Goodbye');
// const sourceFour = of('World');
// // Wait until all observables have emitted a value then emit all as an array
// const example = zip(
//   sourceOne,
//   sourceTwo.pipe(delay(1000)),
//   sourceThree.pipe(delay(2000)),
//   sourceFour.pipe(delay(3000))
// );
// const subscribe = example.subscribe(val => console.log(val)); 
/**********13- Zip()-Example(1) End*******************/

/**********13- Zip()-Example(2) Start*******************/
// const source = interval(1000);
// const example = zip(source, source.pipe(take(2)));
// const subscribe = example.subscribe(val => console.log(val));

/**********13- Zip()-Example(2) End*******************/

/**********13- Zip()-Example(3) Start*******************/
// Get X/Y Coordinates Of Drag Start/Finish (Mouse Down/UP)
// const documentEvent = (eventName: any) => fromEvent(document, eventName).pipe(
//   map((e: MouseEvent) => ({x: e.clientX, y: e.clientY}))
// );
// zip(documentEvent('mousedown'), documentEvent('mouseup')).subscribe(e => console.log(JSON.stringify(e)));
/**********13- Zip()-Example(3) End*******************/

/**********13- Zip()-Example(3) Start*******************/
//  Mouse Click Duration 
// const eventTime = (eventName: any) => fromEvent(document, eventName).pipe(map(()=> new Date()));

// const mouseClickDuration = zip(eventTime('mousedown'), eventTime('mouseup')).pipe(map(([start, end])=> Math.abs(start.getTime() - end.getTime())));
// mouseClickDuration.subscribe(console.log);
/**********13- Zip()-Example(3) End*******************/

/**********14- defaultEmpty()-Example(1) Start*******************/
// const exampleOne = of().pipe(defaultIfEmpty('Observable.Of() Empty!')); 
// const subscribe = exampleOne.subscribe(val=> console.log(val));
/**********14- defaultEmpty()-Example(1) Start*******************/

/**********15- every()-Example(1) Start*******************/
// emit 5 values
// const source = of(2,4,6);
// const example = source.pipe(
//   // is every value even?
//   every(val => val % 2 === 0 )
// );
// // Output: false
// const subscribe = example.subscribe(val => console.log(val));
/**********15- every()-Example(1) Start*******************/

/**********15- every()-Example(2) Start*******************/
// console.clear();
// const log = console.log;
// const returnCode = (request: any) => (Number.isInteger(request) ? 200 : 400);
// const fakeRequest = (request: any) => of({code: returnCode(request)}).pipe(
//   tap(_ => log(request)),
//   delay(1000)
// );

// const apiCalls$ = concat(fakeRequest(1), fakeRequest("lll"), fakeRequest(2) ).pipe(
//   every(e => e.code === 200),
//   tap(e => log(`all request successful: ${e}`))
// );

// apiCalls$.subscribe();
/**********15- every()-Example(2) Start*******************/

/**********16- iif()-Example(1) Start*******************/
// const r$ = of('R');
// const x$ = of('R');

// interval(1000).pipe(mergeMap(v => iif(()=> v%4 === 0, r$, x$))).subscribe(console.log);
/**********16- iif()-Example(1) Start*******************/

/**********16- iif()-Example(2) Start*******************/
// const r$ = of(`I'm saying R!!`);
// const x$ = of(`X's always win!!`);

// fromEvent(document, 'mousemove').pipe(
//   throttleTime(50),
//   filter((move: MouseEvent) => move.clientY < 200),
//   map((move: MouseEvent) => move.clientY),
//   mergeMap(yCord => iif(()=> yCord < 110, r$, x$))
// ).subscribe(console.log);
/**********16- iif()-Example(2) Start*******************/


/**********16- iif()-Example(3) Start*******************/
// interval(1000).pipe(mergeMap(v => iif(()=> !!(v%2), of(v), of('Defaults')))).subscribe(console.log);
/**********16- iif()-Example(3) Start*******************/


/**********16- sequenceEqual()-Example(1) Start*******************/
// const expectedSequence = from([4,5,6]);
// of([1,2,3], [4,5,6], [7,8,9])
// .pipe(switchMap(arr => from(arr)
// .pipe(sequenceEqual(expectedSequence))))
// .subscribe(console.log);
/**********16- sequenceEqual()-Example(1) Start*******************/

/**********16- sequenceEqual()-Example(2) Start*******************/
const expectedSequence  = from(['q', 'w', 'e', 'r', 't', 'y']);
const setResult = (text: string) => (document.getElementById('result').innerText = text);
fromEvent(document, 'keydown').pipe(
  map((e: KeyboardEvent) => e.key),
  tap(v => setResult(v)),
  bufferCount(6),
  mergeMap(keyDowns => from(keyDowns)
  .pipe(
    sequenceEqual(expectedSequence), 
    tap(isItQwerty => setResult(isItQwerty ? 'Well Done' : 'Type Again!'))))
).subscribe(e => console.log(`did you say qwerty? ${e}`));
/**********16- sequenceEqual()-Example(2) Start*******************/


/**********17- create()-Example(1) Start*******************/

/**
 * Create an observable that emits 'Hello' and 'World' on subscription
 */

//  const hello = Observable.create(function(observer: any) {
//   observer.next('Hello');
//   observer.next('world');
//   observer.complete();
//  });

//  const subscriber = hello.subscribe((val: any) => console.table(val)); 

/**********17- create()-Example(1) End*******************/


/**
 * Create an observable that emits a numbers on timer
 */

//  const evenNumbers = Observable.create(function(observer: any){
//   let value = 0;
//   const interval = setInterval(() => {
//     if(value % 2 === 0) {
//       observer.next(value);
//     }
//     value++;
//   }, 1000);
//   return () => clearInterval(interval);
//  });

//  const subscriber = evenNumbers.subscribe((val: any) => console.log(val));

 //unsubscribe after 10 seconds
//  setTimeout(()=> { subscriber.unsubscribe()}, 1000);

/**********17- create()-Example(1) End*******************/

/**********18- defer()-Example(1) Start*******************/

/**
 * Create an observable with given subscription function
 */
// const s1 = of(new Date()); 
// const s2 = defer(()=> of(new Date())); // will capture date time at the moment of subscription 

// console.log(new Date());
// timer(2000).pipe(switchMap(_ => merge(s1, s2))).subscribe(console.log);


 /**********17- defer()-Example(1) End*******************/


 /**********19- empty()-Example(1) Start*******************/
// const subscribe = empty().subscribe({
//   next:() => console.log('Next'),
//   complete:() =>console.log('Complete!')
// });

 /**********19- empty()-Example(1) End*******************/

 
 /**********19- empty()-Example(2) Start*******************/
//  const countdownSeconds = 10;
//  const setHTML = (id: any) => (val: any) => (document.getElementById(id).innerHTML = val);
//  const pauseButton = document.getElementById('pause');
//  const resumeButton = document.getElementById('resume');
//  const interval$ = interval(1000).pipe(mapTo(-1));
 
//  const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
//  const resume$ = fromEvent(resumeButton, 'click').pipe(mapTo(true));
 
//  const timer$ = merge(pause$, resume$)
//    .pipe(
//      startWith(true),
//      // if timer is paused return empty observable
//      switchMap(val => (val ? interval$ : empty())),
//      scan((acc, curr) => (curr ? curr + acc : acc), countdownSeconds),
//      takeWhile(v => v >= 0)
//    )
//    .subscribe(setHTML('remaining'));
 /**********19- empty()-Example(2) End*******************/

 /**********20- from()-Example(1) Start*******************/

/**********20- from()-Example(1) End*******************/
 