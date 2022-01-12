import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
  state:any=null;
  constructor(private router:Router) {
     
    const navigation =this.router.getCurrentNavigation();
    this.state=navigation?.extras?.state;


   }

  ngOnInit(): void {
  }

}
