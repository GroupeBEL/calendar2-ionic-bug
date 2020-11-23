import { ModalController, NavParams } from '@ionic/angular';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements AfterViewInit {
  markDisabled = null;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    events: []
  };
  viewTitle: string;
  modalReady = false;
  dateDelivery = null;
  selectedDay = null;
  oldfilterDays = false;
  @ViewChild(CalendarComponent, null) myCalendar: CalendarComponent;

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    this.getAllNavParams(navParams);
  }

  getAllNavParams(navParams: NavParams) {
    if (navParams.get('events') !== undefined && navParams.get('events') !== null) {
      console.log('events', navParams.get('events'));
      this.calendar.events = navParams.get('events');
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }

  save() {
    this.modalCtrl.dismiss({ event: this.dateDelivery });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = moment(new Date(ev.selectedTime)).format('DD/MM/YYYY');
  }

  close() {
    this.modalCtrl.dismiss();
  }

  next() {
    this.myCalendar.slideNext();
    this.myCalendar.update();
  }

  back() {
    this.myCalendar.slidePrev();
    this.myCalendar.update();
  }


}
