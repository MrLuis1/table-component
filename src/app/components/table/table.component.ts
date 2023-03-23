import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { ConfigObject } from 'src/app/interfaces/table.interface';
import * as XLSX from 'xlsx';
import { ObservableComponentsService } from '../../services/observable-components.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('table') table !: ElementRef;
  @ViewChild('tHeader') thead!: ElementRef;
  @ViewChild('tBody') tbody!: ElementRef;

  @Input() dataTable!: ConfigObject;
  columns: any;
  datos: any;
  pageIndex: number = 1;
  firstPage: boolean = true;
  totalReg: string = '10'; // ! Esta propiedad es para determinar la cantidad de registros que solicitaremos a la BBDD

  constructor( private fs: FileSaverService, private obs: ObservableComponentsService ) { }

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

  hideColumns(e: any) {
    let columns = [...this.thead.nativeElement.children[0].children];
    let idColumn = e.srcElement.attributes['id'];

    columns.forEach((column:any) => {
      let id = column.getAttribute('id');
      if(e.target.checked) {
        if(id === idColumn.value){
          column.setAttribute('style', 'display:none;')
          document.querySelectorAll(`.${idColumn.value}`).forEach(celda => {
            celda.setAttribute('style', 'display:none;');
          })
        }
      }else{
        if(id === idColumn.value){
          column.removeAttribute('style')
          document.querySelectorAll(`.${idColumn.value}`).forEach(celda => {
            celda.removeAttribute('style');
          })
        }
      }
    });
  }

  next() {
    this.pageIndex++;
    this.firstPage = false;
    
    let objValues = {
      page: this.pageIndex,
      totalReg: this.totalReg
    }
    this.obs.nextObj.emit(objValues);
  }

  prev() {
    this.pageIndex--;
    if(this.pageIndex === 1) this.firstPage = true;
    
    let objValues = {
      page: this.pageIndex,
      totalReg: this.totalReg
    }
    this.obs.prevObj.emit(objValues);
  }

  modifyTotalReg() {
    this.pageIndex = 1;
    let objValues = {
      page: this.pageIndex,
      totalReg: this.totalReg
    }
    this.obs.modifyTotalReg.emit(objValues);
  }

  downloadData() {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const worksheet = XLSX.utils.json_to_sheet(this.datos);
    const workbook = {
      Sheets: {
        'testingSheet': worksheet
      },
      SheetNames: ['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx',type: 'array'})
    const blobData = new Blob([excelBuffer], {type:EXCEL_TYPE})
    this.fs.save(blobData,'data-table')
  }

  sortTable(col: number) {
    let table = this.table.nativeElement.tBodies[0];
    let tRow = [...table.children]

    tRow.sort((a: any,b: any): any => {
      let val_a = a.children[col].innerText.toLowerCase();
      let val_b = b.children[col].innerText.toLowerCase();

      if(val_a<val_b) return -1;
    })

    table.innerHTML = '';
    tRow.forEach((el: any) => {
      table.insertAdjacentHTML( 'beforeend', el.innerHTML );
    })
  }
}