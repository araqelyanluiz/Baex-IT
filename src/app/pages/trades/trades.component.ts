import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TradeElement {
  position: number;
  entryDate: Date;
  entryPrice: number;
  exitDate: Date;
  exitPrice: number;
  profit: number;
}

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss'],
})
export class TradesComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'entryDate',
    'entryPrice',
    'exitDate',
    'exitPrice',
    'profit',
    'tools',
  ];
  dataSource: TradeElement[] = [];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTrades()
  }

  getTrades() {
    this.dataSource = JSON.parse(localStorage.getItem('trades') || '[]');
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddTradeDialog);
    dialogRef.afterClosed().subscribe((result) => {
      this.getTrades();
    });
  }

  editDialog(element:any){
    const dialogRef = this.dialog.open(AddTradeDialog,{
      data:element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getTrades();
    });
  }
}

@Component({
  selector: 'new-trades-dialog',
  templateUrl: 'new-trades-dialog.component.html',
})
export class AddTradeDialog {
  trades: any[] = JSON.parse(localStorage.getItem('trades') || '[]');
  tradeForm!: FormGroup;
  min: number = 0;
  today = new Date();
  minDate: any = null;
  maxDate: any = this.today;
  minPrice: any = 0;
  maxPrice: any = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTradeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.tradeForm = this.fb.group({
      id:this.trades.length+1,
      entryDate: null,
      entryPrice: [null, Validators.min(0)],
      exitDate: null,
      exitPrice: [null, Validators.min(0)],
      profit: null,
      createDate: null,
    });

    if(this.data){
      this.tradeForm = this.fb.group({
        id:this.data.id,
        entryDate: this.data.entryDate,
        entryPrice: [this.data.entryPrice, Validators.min(0)],
        exitDate: this.data.exitDate,
        exitPrice: [this.data.exitPrice, Validators.min(0)],
        profit: this.data.profit,
        createDate:null
      });
    }
  }

  selectEntryDate(event: any) {
    this.minDate = event.target.value;
  }

  selectExitDate(event: any) {
    this.maxDate = event.target.value;
  }

  calculateProfit() {
    if (
      this.tradeForm.controls.exitPrice.value &&
      this.tradeForm.controls.entryPrice.value
    ) {
      this.tradeForm.controls.profit.patchValue(
        this.tradeForm.controls.exitPrice.value -
          this.tradeForm.controls.entryPrice.value
      );
    }
  }

  addTrade() {
    if(!this.tradeForm.valid){
      return
    }
    this.tradeForm.value.createDate = new Date();
    if(this.data){
      let row = this.trades.find(x=>x.id===this.data.id);
      let index = this.trades.indexOf(row);
      this.trades[index] = this.tradeForm.value;
      localStorage.setItem('trades', JSON.stringify(this.trades));
    }else{
      this.trades.push(this.tradeForm.value);
      localStorage.setItem('trades', JSON.stringify(this.trades));
    }
    this.dialogRef.close();
  }
}
