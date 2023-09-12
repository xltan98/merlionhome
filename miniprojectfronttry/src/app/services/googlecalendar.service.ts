// google-calendar.service.ts

import { Injectable } from '@angular/core';

declare const gapi: any; // Declare gapi as a global variable

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private initialized = false;

  constructor() {}

  initialize(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.initialized) {
        resolve();
      } else {
        gapi.load('client:auth2', () => {
          gapi.client
            .init({
              apiKey: 'IzaSyCCP6epAYMIGC-bkC-LyLOfHsORTi2msiE',
              clientId: '914156425856-22gc1ctq4cah7i6qnlhf1s9cfqj46auv.apps.googleusercontent.com',
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
              scope: 'https://www.googleapis.com/auth/calendar',
            })
            .then(() => {
              // Add the plugins you want to use here
              gapi.client.load('merlion home', 'v1', () => {
                // Your plugin is loaded and ready to use
                this.initialized = true;
                resolve();
              });
            })
            .catch((error: any) => {
              reject(error);
            });
        });
      }
    });
  }
  // initClient(apiKey: string, clientId: string): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     gapi.load('client:auth2', () => {
  //       gapi.client
  //         .init({
  //           apiKey: apiKey,
  //           clientId: clientId,
  //           discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  //           scope: 'https://www.googleapis.com/auth/calendar',
  //         })
  //         .then(() => {
  //           resolve();
  //         })
  //         .catch((error: any) => {
  //           reject(error);
  //         });
  //     });
  //   });
  // }


  createEvent(event: any): Promise<any> {
    return gapi.client.calendar.events
      .insert({
        calendarId: 'primary',
        resource: event,
      })
      .then((response: any) => {
        return response.result;
      })
      .catch((error: any) => {
        throw error;
      });
  }
}
