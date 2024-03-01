import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment";

export type RequestStatus = 'inprogress' | 'success' | 'error' | undefined

export class ApiService {
    protected readonly http = inject(HttpClient);

    protected readonly host = environment.apiHost;
}