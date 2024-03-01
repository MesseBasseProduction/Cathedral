import { Injectable, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Subject } from 'rxjs'
import { Notification } from '../model/notification.model'

@Injectable()
export class NotificationService {
    // State
    private notifications = signal<Notification[]>([])

    // Source
    private add$ = new Subject<Notification>()

    constructor() {
        this.add$.pipe(takeUntilDestroyed()).subscribe(notif =>
            this.notifications.update(notifs => {
                notifs.push(notif)
                return notifs
            })
        )
    }

    public add(notif: Notification) {
        this.add$.next(notif)
    }
}
