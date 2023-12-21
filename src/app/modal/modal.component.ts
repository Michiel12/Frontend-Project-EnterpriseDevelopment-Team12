import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() showModal!: boolean;
  @Output() showModalChange = new EventEmitter<boolean>();
  @ViewChild('modalDiv') modalDiv!: ElementRef;

  faClose = faXmark;

  toggleModal() {
    this.showModal = !this.showModal;
    this.showModalChange.emit(this.showModal);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.toggleModal();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      const focusableModalElements =
        this.modalDiv.nativeElement.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

      const firstElement = focusableModalElements[0];
      const lastElement =
        focusableModalElements[focusableModalElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  }
}
