import { Injectable } from '@angular/core';
import { MapCoordinates } from '../constants/map.coordinates';

@Injectable({
  providedIn: 'root'
})
export class GooglemapService {

  private map: google.maps.Map;
  private marker: google.maps.Marker;
  private office: MapCoordinates = {
    lat: 32.06244076,
    lng: 34.7707653
  };
  private home: MapCoordinates = {
    lat: 32.0842364,
    lng: 34.7918308
  }
  private directionService = new google.maps.DirectionsService();
  private directionRenderer = new google.maps.DirectionsRenderer();
  private autocomplete: google.maps.places.Autocomplete;
  private place: google.maps.places.PlaceResult;
  private directionsDisplayed: boolean = false;

  constructor() { }

  initializeMap(element: HTMLElement): google.maps.Map {
    const coordinatesOffice = new google.maps.LatLng(this.office.lat, this.office.lng);
    const mapOptions: google.maps.MapOptions = {
      center: coordinatesOffice,
      zoom: 15,
    };
    this.map = new google.maps.Map(element, mapOptions);
    this.marker = new google.maps.Marker({
      position: coordinatesOffice,
      map: this.map
    });
    this.directionRenderer.setMap(this.map);
    return this.map;
  }

  initAutocomplete(input: HTMLInputElement): void {
    this.autocomplete = new google.maps.places.Autocomplete(input);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    this.autocomplete.bindTo('bounds', this.map);
    this.autocomplete.setFields(['address_components', 'geometry', 'name']);
    this.acAddListener();
  }

  acAddListener() {
    this.autocomplete.addListener('place_changed', () => {
     this.place = this.autocomplete.getPlace();
      if (this.placeIsNotSet()) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      this.marker.setPosition(this.place.geometry.location);

      if (this.place.geometry.viewport) {
        bounds.union(this.place.geometry.viewport); 
      }
      this.map.fitBounds(bounds);
      this.clearDirections();
    });
  }

  clearDirections(): void {
    if (this.directionsDisplayed) {
      this.directionRenderer.setDirections({
        routes: [],
        request: undefined
      });
      this.directionsDisplayed = false;
    }
  }

  placeIsNotSet(): boolean{
    return !this.place.geometry || !this.place.geometry.location;
  }

  setDirections() {
    const coordinatesOffice = new google.maps.LatLng(this.office.lat, this.office.lng);
    const coordinatesHome = new google.maps.LatLng(this.home.lat, this.home.lng);
    const directionRequest : google.maps.DirectionsRequest = {
      origin: coordinatesHome,
      destination: coordinatesOffice,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: google.maps.TrafficModel.OPTIMISTIC
      }
    };
    this.directionService.route(directionRequest, (result, status) => {
      if (status == 'OK') {
        this.directionRenderer.setDirections(result);
        this.directionsDisplayed = true;
      }      
    });
  }

  clearMarker(): void {
    this.marker.setPosition();
  }

  backToOffice(): void {
    this.marker.setPosition(this.office);
    this.map.setCenter(this.office);
  }
}


