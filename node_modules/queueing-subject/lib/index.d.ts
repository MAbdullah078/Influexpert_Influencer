import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
export declare class QueueingSubject<T> extends Subject<T> {
    private _queuedValues;
    next(value: T): void;
    _subscribe(subscriber: Subscriber<T>): Subscription;
}
