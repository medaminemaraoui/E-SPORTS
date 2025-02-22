import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from '../services/reservation-service.service'; // Import the service

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: false
})
export class CalendarComponent {
  showWeekends = true;
  calendarOptions: CalendarOptions;
  reservationForm: FormGroup;
  isReservationModalOpen = false;

  @ViewChild('reservationModal') reservationModal: any; // Reference the modal template

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private reservationService: ReservationService // Inject the service
  ) {
    this.reservationForm = this.fb.group({
      terrainId: [''],
      customerId: [''],
      reservDate: ['']
    });

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      weekends: this.showWeekends,
      editable: true,
      selectable: true,
      eventClick: (eventInfo) => this.handleEventClick(eventInfo),
      select: (selectInfo) => this.handleDateSelect(selectInfo), // Handle date selection
      events: []
    };
  }

  toggleWeekends() {
    this.showWeekends = !this.showWeekends;
    this.calendarOptions = { ...this.calendarOptions, weekends: this.showWeekends };
  }

  handleEventClick(eventInfo: any) {
    alert(`Event: ${eventInfo.event.title}`);
  }

  handleDateSelect(selectInfo: any) { // Handle date selection
    this.isReservationModalOpen = true;
    this.reservationForm.patchValue({
      reservDate: selectInfo.startStr // Set the selected date in the form
    });

    // Open the modal using the template reference
    this.modalService.open(this.reservationModal);
  }

  onSubmitReservation() {
    const reservationData = this.reservationForm.value;

    // Use the service to create a reservation
    this.reservationService.createReservation(reservationData).subscribe({
      next: (response: any) => {
        console.log('Reservation created:', response);

        // Add the new event to the calendar
        const newEvent: EventInput = {
          title: `Reservation for Terrain ${reservationData.terrainId}`,
          start: reservationData.reservDate,
          color: '#007bff'
        };
        this.calendarOptions.events = [...this.calendarOptions.events as EventInput[], newEvent];

        // Close the modal and reset the form
        this.modalService.dismissAll();
        this.reservationForm.reset();
      },
      error: (error) => {
        console.error('Error creating reservation:', error);
      }
    });
  }
}