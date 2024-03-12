import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GooglemapService } from '../../service/googlemap.service';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss']
})
export class MyMapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef<HTMLInputElement>;
  
  input: HTMLInputElement;
  map: google.maps.Map;
  loading: boolean = true;
  
  constructor(private googleMapService: GooglemapService) { }

  ngAfterViewInit(): void {
    this.input = document.getElementById('autocomplete') as HTMLInputElement;
    this.map = this.googleMapService.initializeMap(this.gmap.nativeElement, this.input);
    this.map.addListener('tilesloaded', () => {
      this.loading = false;
    });
  }

  nevigate(): void {
    this.googleMapService.setDirections();
    this.input.value = '';
    this.googleMapService.clearMarker();
  }

  backToOffice(): void {
    this.googleMapService.backToOffice();
    this.googleMapService.clearDirections();
  }

}
