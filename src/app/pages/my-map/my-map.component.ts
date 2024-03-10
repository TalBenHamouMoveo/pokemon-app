import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GooglemapService } from '../../service/googlemap.service';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss']
})
export class MyMapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef<HTMLInputElement>;

  constructor(private googleMapService: GooglemapService) {}

  ngAfterViewInit(): void {
    this.googleMapService.loadMapAPI().then(() => {
      this.googleMapService.initializeMap(this.gmap.nativeElement);
      const input = document.getElementById('autocomplete') as HTMLInputElement;
      this.googleMapService.initAutocomplete(input);
    });
  }
}
