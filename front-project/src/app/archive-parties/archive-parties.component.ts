import { Component } from '@angular/core';

@Component({
  selector: 'app-archive-parties',
  templateUrl: './archive-parties.component.html',
  styleUrls: ['./archive-parties.component.css']
})
export class ArchivePartiesComponent {
  
  protected archiveParties: any[] = [];

  constructor() { }
  
  ngOnInit(): void {
  
  }
}
