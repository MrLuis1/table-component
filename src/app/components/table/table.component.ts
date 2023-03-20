import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('table') table !: ElementRef;
  @Input() dataTable: any;
  columns: any;
  datos: any;
  page: number = 1;

  ngOnInit(): void {
    this.columns = this.dataTable.config
    this.datos = this.dataTable.data
  }

  showOptions() {
    if(this.dropdown.nativeElement.classList.contains('active')) {
      this.dropdown.nativeElement.classList.remove('active')
    }else{
      this.dropdown.nativeElement.classList.add('active')
    }
  }

  filterTable(e: any) {
    let table = this.table.nativeElement.tBodies[0];
      let r=0;
      let row;
      while(row = table.rows[r++]) {
        
        if ( row.innerText.toLowerCase().indexOf(e.target.value) !== -1 ){
          row.style.display = null;
        }else{
          row.style.display = 'none';
        }
      }
    
  }
}