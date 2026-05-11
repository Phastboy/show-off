import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MediaAsset, getMediaType } from '../../../core/models/media-asset.model';

export interface PickedMedia {
  asset: MediaAsset;
  preview: string;
  caption: string;
}

@Component({
  selector: 'app-media-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  templateUrl: './media-picker.html',
  styleUrl: './media-picker.css',
})
export class MediaPicker {
  accept = input<string>('image/*');
  multiple = input<boolean>(true);

  changed = output<PickedMedia[]>();

  readonly items = signal<PickedMedia[]>([]);

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.items.update((l) => [
          ...l,
          { asset: { file, type: getMediaType(file) }, preview: e.target?.result as string, caption: '' },
        ]);
        this.changed.emit(this.items());
      };
      reader.readAsDataURL(file);
    });
  }

  onCaptionChange(index: number) {
    this.changed.emit(this.items());
  }

  remove(index: number) {
    this.items.update((l) => l.filter((_, i) => i !== index));
    this.changed.emit(this.items());
  }
}
