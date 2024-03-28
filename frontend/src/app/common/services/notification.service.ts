import { Injectable, inject } from '@angular/core'
import { MessageService } from 'primeng/api'
import { Notification } from '../models/notification.model'

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private readonly messageService = inject(MessageService)

    public add(notif: Notification) {
        this.messageService.add({
            severity: notif.level,
            detail: notif.message,
            key: 'footer',
            summary: notif.title,
            closable: true,
        })
    }
}
