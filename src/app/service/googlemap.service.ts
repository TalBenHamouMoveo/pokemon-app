import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Coordinates } from '../constants/coordinates';

@Injectable({
  providedIn: 'root'
})
export class GooglemapService {
  private loader: Loader;
  private map: google.maps.Map;
  private marker: google.maps.Marker;
  private office: Coordinates = {
    lat: 32.06244076,
    lng: 34.7707653
  };

  constructor() {
    this.loader = new Loader({ apiKey: "AIzaSyBnChFKtfer3IJQndl1miHj1C_BSlX9Dpw" });
  }

  loadMapAPI(): Promise<typeof google> {
    return this.loader.load();
  }

  initializeMap(element: HTMLElement): void {
    const coordinates = new google.maps.LatLng(this.office.lat, this.office.lng);
    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 15,
    };
    this.map = new google.maps.Map(element, mapOptions);
    this.marker = new google.maps.Marker({
      position: coordinates,
      map: this.map
    });
  }

  initAutocomplete(input: HTMLInputElement): void {
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
