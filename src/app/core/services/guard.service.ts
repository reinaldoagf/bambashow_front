import { Injectable } from '@angular/core';

@Injectable()
export class GuardService {
    constructor() {
    }
   	isLoggedIn() {
	    return !!this.getJwtToken();
	}
	getJwtToken() {
	    return localStorage.getItem("access_token");
	}
}

