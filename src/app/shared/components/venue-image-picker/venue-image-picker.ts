import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
  signal,
} from '@angular/core';

/** A selected image paired with its local object-URL for previewing. */
interface PickedImage {
  file: File;
  previewUrl: string;
}

/**
 * Presentational component for multi-image selection.
 * Manages local previews and ordering; knows nothing about HTTP.
 * The first image in the list is treated as the main (order 0) image.
 */
@Component({
  selector: 'app-venue-image-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './venue-image-picker.html',
  styleUrl: './venue-image-picker.css',
})
export class VenueImagePicker {
  /** Emits the current ordered File[] whenever the selection changes. */
  filesChanged = output<File[]>();

  readonly picked = signal<PickedImage[]>([]);
  readonly count = computed(() => this.picked().length);

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const incoming = Array.from(input.files ?? []).filter((f) =>
      f.type.startsWith('image/'),
    );
    if (!incoming.length) return;

    const next = [
      ...this.picked(),
      ...incoming.map((file) => ({ file, previewUrl: URL.createObjectURL(file) })),
    ];
    this.picked.set(next);
    this.filesChanged.emit(next.map((p) => p.file));
    // Reset so the same file can be re-selected after removal.
    input.value = '';
  }

  remove(index: number) {
    const next = this.picked().filter((_, i) => i !== index);
    URL.revokeObjectURL(this.picked()[index].previewUrl);
    this.picked.set(next);
    this.filesChanged.emit(next.map((p) => p.file));
  }
}
