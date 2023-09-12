import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, SecurityContext, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resaleDetailsResp } from 'src/app/models';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { MakeappointmentComponent } from '../makeappointment/makeappointment.component';

@Component({
  selector: 'app-showlistingdetail',
  templateUrl: './showlistingdetail.component.html',
  styleUrls: ['./showlistingdetail.component.css']
})
export class ShowlistingdetailComponent implements OnInit,AfterViewInit{
  autocomplete: google.maps.places.Autocomplete | undefined;
  
  map: google.maps.Map | undefined;

  @Input() placeholder = "";

  // @ViewChild('inputAutoComplete')
  // inputField!: ElementRef;

  // @ViewChild('mapElement')
  // mapElement!: ElementRef;

  @ViewChild('placeInput', { static: false }) placeInput!: ElementRef;
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  

  geocoder: google.maps.Geocoder|undefined;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Initialize the map
    this.initMap();

    // Initialize the autocomplete
    this.initAutocomplete();
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 12
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.geocoder = new google.maps.Geocoder();
  }

  initAutocomplete(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.placeInput.nativeElement,
      { types: ['geocode'] }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();

        if (!place?.geometry) {
          console.error('Place not found');
          return;
        }

        // Set the map center and marker at the selected place
        this.map?.setCenter(place.geometry.location);

        // Optionally, you can add a marker:
        const marker = new google.maps.Marker({
          map: this.map,
          position: place.geometry.location,
          title: place.name
        });

        // You can also do other things with the selected place data
        console.log(place);
      });
    });
  }
 
  

  

  aSvc=inject(AdminService)
  activatedRoute=inject(ActivatedRoute)
  router=inject(Router)
  storageSvc=inject(StorageService)
  matDialog = inject(MatDialog)
  
  userId!:string
  uploadId!:string
  listing!:resaleDetailsResp
  role!:string

  // autocomplete: google.maps.places.Autocomplete | undefined;
 
  
 
  // ngAfterViewInit(): void {
  //   if (typeof google !== 'undefined' && google.maps && google.maps.places) {
  //     // Convert the postal code to a string and create an input element
  //     const postalCodeInput = document.createElement('input');
  //     postalCodeInput.type = 'text';
  //     postalCodeInput.value = this.listing.postalCode.toString();

  //     // Create the Autocomplete instance
  //     this.autocomplete = new google.maps.places.Autocomplete(postalCodeInput);

  //     this.autocomplete.addListener('place_changed', () => {
  //       const place = this.autocomplete?.getPlace();
  //       console.log(place);
  //     });
  //   } else {
  //     console.error('Google Maps Places API is not available.');
  //   }
  // }
  
  
  
  ngOnInit(): void {
    
    this.userId = this.storageSvc.getUser();
    this.role=this.storageSvc.getRole();
    
    this.uploadId=this.activatedRoute.snapshot.params['uploadId'];
    this.aSvc.getListingById(this.uploadId).then(result=>{this.listing=result
    console.log(result)})
    this.aSvc.saveUploadId(this.uploadId)

    
  }

  next(){
    this.router.navigate(['user/', this.userId, 'appointment', this.uploadId]);

  }

  booking(){
    this.matDialog.open(MakeappointmentComponent)
  }



}
