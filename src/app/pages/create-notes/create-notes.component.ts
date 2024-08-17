import { Component, inject, OnInit } from '@angular/core';

import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';
import { NotecreatorComponent } from '../../components/notecreator/notecreator.component';

@Component({
  selector: 'app-create-notes',
  standalone: true,
  imports: [NotecreatorComponent],
  templateUrl: './create-notes.component.html',
  styleUrl: './create-notes.component.scss',
})
export class CreateNotesComponent implements OnInit {
  noteService = inject(NoteService);

  items: Note[] = [];

  ngOnInit(): void {}
  save(value: Note) {
    this.noteService.post(value).subscribe((result) => {
      this.items.push(result);
    });
  }
}
