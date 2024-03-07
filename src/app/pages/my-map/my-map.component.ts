import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrl: './my-map.component.scss'
})
  
export class MyMapComponent implements AfterViewInit{

  map: google.maps.Map = undefined;
  lat = 32.06244076;
  lng = 34.7707653;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 15,
  };
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map
  });

  ngAfterViewInit(): void {
    this.mapInitializer();
  }
  
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      this.marker.setMap(this.map);
  }
}
