import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

// const apiKey: string = process.env.GMaps_API_Key;

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss']
})
export class MyMapComponent implements AfterViewInit {
  marker: google.maps.Marker;
  map: google.maps.Map;
  lat = 32.06244076;
  lng = 34.7707653;
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    const loader = new Loader({ apiKey: "AIzaSyBnChFKtfer3IJQndl1miHj1C_BSlX9Dpw" }).load().then(() => {
      this.coordinates = new google.maps.LatLng(this.lat, this.lng);
      this.mapOptions = {
        center: this.coordinates,
        zoom: 15,
      };
      this.marker = new google.maps.Marker({
        position: this.coordinates,
      });
      this.mapInitializer();
      this.initAutocomplete();
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

  initAutocomplete() {
    const input = document.getElementById('autocomplete') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    autocomplete.bindTo('bounds', this.map);
    autocomplete.setFields(['address_components', 'geometry', 'name']);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      this.marker.setPosition(place.geometry.location);

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      this.map.fitBounds(bounds);
    });
  }
}
