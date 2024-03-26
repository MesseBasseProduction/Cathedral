import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LOCAL_STORAGE_ID_TOKEN_KEY } from './constants/auth.constants'

export const AuthInterceptor: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: HttpRequest<any>,
    next: HttpHandlerFn
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Observable<HttpEvent<any>> = (req, next) => {
    const token = localStorage.getItem(LOCAL_STORAGE_ID_TOKEN_KEY)

    if (token) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        })
        return next(authReq)
    }

    return next(req)
}
