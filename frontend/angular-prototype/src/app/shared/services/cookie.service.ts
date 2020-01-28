import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
    createCookie(name:string,value:any,expireTime:number, type=null) {
        let expires = "";
        if (true) {
            let date = new Date();
            date.setTime(Date.now()+(expireTime*86400000));//86400000 is equal to one day
            expires = "; expires="+date.toUTCString();
            
        // console.log("expires........",expires);
        }
        if(type){  
            let cookie = JSON.parse(this.readCookie(name));
            value = Object.assign(value,cookie);
        }
        // console.log("expires........",expires);
        document.cookie = name+"="+JSON.stringify(value)+expires+"; path=/";
    }

    readCookie(name:string) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    addCookie(name:string,obj:any, expireTime:number, replaceKey=null){
        let expires = "";
		let cookie = JSON.parse(this.readCookie(name));
		
		if(replaceKey && cookie[replaceKey]) cookie[replaceKey] = obj[replaceKey];
		
		let newVal = Object.assign(obj, cookie);
        if (expireTime) {
            let date = new Date();
            date.setTime(date.getTime()+expireTime*1000);
            expires = "; expires="+date.toUTCString();
        }
        
        document.cookie = name+ "=" +JSON.stringify(newVal)+expires+"; path=/"
    }

    eraseCookie(cookies:string[]) {
        cookies.forEach(name => this.createCookie(name,"",-1));
    }
}
