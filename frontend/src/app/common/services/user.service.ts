import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ApiService } from './api.service'

@Injectable()
export class UserService extends ApiService {
    private readonly path = this.host + '/auth/user'

    public validateEmailUnique(email: string): Observable<{ unique: boolean }> {
        return this.http.get<{ unique: boolean }>(this.path + '/is-email-unique/', {
            params: { email: email },
        })
    }

    public validateUsernameUnique(
        username: string,
        excludeId: number
    ): Observable<{ unique: boolean }> {
        return this.http.get<{ unique: boolean }>(this.path + '/is-username-unique/', {
            params: { username: username, excludeId: excludeId },
        })
    }
}
