import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ListingAppointmentRes } from 'src/app/models';
import { AdminService } from 'src/app/services/admin.service';
import { GoogleCalendarService } from 'src/app/services/googlecalendar.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-myappointment',
  templateUrl: './myappointment.component.html',
  styleUrls: ['./myappointment.component.css']
})
export class MyappointmentComponent implements OnInit{
  storageSvc=inject(StorageService)
  aSvc=inject(AdminService)
  googleCalendarService=inject(GoogleCalendarService)
  userId!:string;
  apps!:ListingAppointmentRes[]
  appointmentId!:number;

  
  
  ngOnInit(): void {
    this.userId=this.storageSvc.getUser();
    this.aSvc.getAppointment(this.userId).then(result=>{console.log(result)
    this.apps=result})

    this.googleCalendarService
      .initialize()
      .then(() => {
        // The gapi library is now initialized, and you can use your service's methods
      })
      .catch((error) => {
        console.error('Error initializing Google Calendar service:', error);
      });
  
    
    // this.googleCalendarService
    // .initClient('AIzaSyCCP6epAYMIGC-bkC-LyLOfHsORTi2msiE', '914156425856-22gc1ctq4cah7i6qnlhf1s9cfqj46auv.apps.googleusercontent.com')
    // .then(() => {
    //   // Service is initialized and ready to use
    // })
    // .catch((error) => {
    //   console.error('Error initializing Google Calendar service:', error);
    // });
  }
  

  createGoogleCalendarEvent(): void {
    const event = {
      summary: 'Sample Event',
      description: 'This is a sample event created from an Angular app.',
      start: {
        dateTime: '2023-09-12T10:00:00',
        timeZone: 'YOUR_TIMEZONE',
      },
      end: {
        dateTime: '2023-09-12T11:00:00',
        timeZone: 'YOUR_TIMEZONE',
      },
    };

    this.googleCalendarService
      .createEvent(event)
      .then((response) => {
        console.log('Event created:', response);
        alert('Event created successfully!');
      })
      .catch((error) => {
        console.error('Error creating event:', error);
        alert('Error creating event. Please check the console for details.');
      });
  }

  cancelAppointment(index:number){
    if (index >= 0 && index < this.apps.length) {
      // Remove the property at the specified index
      this.appointmentId=this.apps[index].appointmentId;
      this.aSvc.deleteAppointment(this.appointmentId).then(result=>{console.log(result.deletedId)
      this.apps.splice(index, 1);}
      )
      
    }
  }



 
}
// const { google } = require('googleapis')

// // Require oAuth2 from our google instance.
// const { OAuth2 } = google.auth

// // Create a new instance of oAuth and set our Client ID & Client Secret.
// const oAuth2Client = new OAuth2(
//   '549968769327-2ajcih0efvu23fp7hhebohrkt2r0mdpv.apps.googleusercontent.com',
//   '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'
// )

// // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
// oAuth2Client.setCredentials({
//   refresh_token: '549968769327-2ajcih0efvu23fp7hhebohrkt2r0mdpv.apps.googleusercontent.com',
// })

// // Create a new calender instance.
// const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

// // Create a new event start date instance for temp uses in our calendar.
// const eventStartTime = new Date()
// eventStartTime.setDate(eventStartTime.getDay() + 2)

// // Create a new event end date instance for temp uses in our calendar.
// const eventEndTime = new Date()
// eventEndTime.setDate(eventEndTime.getDay() + 4)
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// // Create a dummy event for temp uses in our calendar
// const event = {
//   summary: `Meeting with David`,
//   location: `3595 California St, San Francisco, CA 94118`,
//   description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
//   colorId: 1,
//   start: {
//     dateTime: eventStartTime,
//     timeZone: 'America/Denver',
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: 'America/Denver',
//   },
// }

// // Check if we a busy and have an event on our calendar for the same time.
// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: 'America/Denver',
//       items: [{ id: 'primary' }],
//     },
//   }

//     // If event array is not empty log that we are busy.
// )
//   clientId:string="549968769327-2ajcih0efvu23fp7hhebohrkt2r0mdpv.apps.googleusercontent.com"

//   googleLogin(clientId:string,){


// const { google } = require('googleapis')

// // Require oAuth2 from our google instance.
// const { OAuth2 } = google.auth

// // Create a new instance of oAuth and set our Client ID & Client Secret.
// const oAuth2Client = new OAuth2(
//   '549968769327-lagsfqtumav12dl2itvaond3trb3orpv.apps.googleusercontent.com',
//   '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'
// )

// // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
// oAuth2Client.setCredentials({
//   refresh_token: '1//04YSdYjjjct5nCgYIARAAGAQSNwF-L9IrvUOR3dnuNFbEVGozfN3jcnAahvIE8JvYRCss3hSaHOKV9MryepwEccV0Pxwwqe_k9u4',
// })

// // Create a new calender instance.
// const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

// // Create a new event start date instance for temp uses in our calendar.
// const eventStartTime = new Date()
// eventStartTime.setDate(eventStartTime.getDay() + 2)

// // Create a new event end date instance for temp uses in our calendar.
// const eventEndTime = new Date()
// eventEndTime.setDate(eventEndTime.getDay() + 4)
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// // Create a dummy event for temp uses in our calendar
// const event = {
//   summary: `Meeting with David`,
//   location: `3595 California St, San Francisco, CA 94118`,
//   description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
//   colorId: 1,
//   start: {
//     dateTime: eventStartTime,
//     timeZone: 'America/Denver',
//   },
//   end: {
//     dateTime: eventEndTime,
//     timeZone: 'America/Denver',
//   },
// }

// // Check if we a busy and have an event on our calendar for the same time.
// calendar.freebusy.query(
//   {
//     resource: {
//       timeMin: eventStartTime,
//       timeMax: eventEndTime,
//       timeZone: 'America/Denver',
//       items: [{ id: 'primary' }],
//     },
//   }
// )}
