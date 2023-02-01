import { Component, OnInit } from '@angular/core';
import packageInfo from '../../../package.json';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {
  changes: string[] = packageInfo.changelog;
  
  changelog:any[] = []
  constructor() {
    for (const change of this.changes) {
      let c = change.split(";");
      this.changelog.push({
        version: c[0],
        changes: c.slice(1)
      })
    }
  }
  ngOnInit(): void {
  }

}
