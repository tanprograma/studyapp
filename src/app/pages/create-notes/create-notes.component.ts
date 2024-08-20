import { Component, inject, OnInit } from '@angular/core';

import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';
import { NotecreatorComponent } from '../../components/notecreator/notecreator.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-create-notes',
  standalone: true,
  imports: [NotecreatorComponent, LoaderComponent],
  templateUrl: './create-notes.component.html',
  styleUrl: './create-notes.component.scss',
})
export class CreateNotesComponent implements OnInit {
  noteService = inject(NoteService);
  items: Note[] = [];
  loading = false;
  ngOnInit(): void {}
  save(value: Note) {
    this.loading = true;
    this.noteService.post(value).subscribe((result) => {
      if (result != undefined) {
        this.items.push(result);
      }
      this.loading = false;
    });
  }
}
