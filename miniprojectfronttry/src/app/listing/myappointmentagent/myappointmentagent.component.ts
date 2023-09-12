import { Component, OnInit, inject } from '@angular/core';
import { ListingAppointmentRes } from 'src/app/models';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-myappointmentagent',
  templateUrl: './myappointmentagent.component.html',
  styleUrls: ['./myappointmentagent.component.css']
})
export class MyappointmentagentComponent implements OnInit{

  aSvc=inject(AdminService)
  storageSvc=inject(StorageService)
  agentId!:string
  apps!:ListingAppointmentRes[]
  appointmentId!:number
  ngOnInit(): void {
    this.agentId=this.storageSvc.getUser();
    this.aSvc.getAppointmentAgent(this.agentId).then(result=>{console.log(result)
    this.apps=result})

    console.log(new Date())
    this.autoUpdateStatus();
  }

  updateStatusConfirmed(index:number){
    if (index >= 0 && index < this.apps.length) {
      this.appointmentId=this.apps[index].appointmentId;
      this.aSvc.updateAppointmentStatus(this.appointmentId,"confirmed")
    }
    window.location.reload()

  }

  updateStatusCancelled(index:number){
    if (index >= 0 && index < this.apps.length) {
      this.appointmentId=this.apps[index].appointmentId;
      this.aSvc.updateAppointmentStatus(this.appointmentId,"cancelled")
    }
    window.location.reload()

  }

  updateStatusCompleted(index:number){
    if (index >= 0 && index < this.apps.length) {
      this.appointmentId=this.apps[index].appointmentId;
      this.aSvc.updateAppointmentStatus(this.appointmentId,"completed")
    }
    window.location.reload()
  }

 
  
  autoUpdateStatus() {
    const currentDate = new Date(); 
  
    this.apps.forEach((appointment) => {
      const appointmentDate = parseDate(appointment.date);
  
      if (appointmentDate) {
        
        if (appointmentDate < currentDate) {
          this.aSvc.updateAppointmentStatus(appointment.appointmentId, "completed")
            .then(() => {
              console.log(`Appointment ${appointment.appointmentId} marked as completed.`);
            })
            .catch((error) => {
              console.error(`Error updating status for appointment ${appointment.appointmentId}:`, error);
            });
        } else {
          console.log(`Appointment ${appointment.appointmentId} date is in the future.`);
        }
      } else {
        console.error(`Invalid date format for appointment ${appointment.appointmentId}: ${appointment.date}`);
      }
    });
  }
}
function parseDate(dateString: string): Date | null {
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return null; 
}
