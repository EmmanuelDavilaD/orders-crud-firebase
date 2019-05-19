import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { ServicesService } from 'src/app/shared/services.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Table with sorting
 */

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private orderService: ServicesService) { }
  displayedColumns: string[] = ['orderNumber', 'customerName', 'order', 'completed', 'total', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // Get all orders 
    this.getAllOrders();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllOrders() {
    this.orderService.getOrders().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  onDelete(id: string) {
    this.orderService.deleteOrder(id);
  }
  onChangeStatus(order: any) {
    order.completed = true;
    this.orderService.updateOrder(order);
  }
}