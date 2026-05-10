import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const BASE = 'https://distinguished-dolorita-campusuniverse-5925f056.koyeb.app/api';

/** Allowed folder scopes for the media upload endpoint. */
export type MediaFolderType = 'AVATAR' | 'VENUE_GALLERY';

/** Shape returned by POST /api/media/upload. */
export interface UploadedMedia {
  url: string;
  id: string;
}

/**
 * Low-level transport for a single file upload.
 * One responsibility: talk to POST /api/media/upload.
 * Callers decide parallelism (forkJoin, mergeMap, etc.).
 */
@Injectable({ providedIn: 'root' })
export class MediaService {
  private readonly http = inject(HttpClient);

  /**
   * Uploads a single file to the given folder bucket.
   * Returns the CDN url and management id on success.
   */
  uploadMedia(file: File, folderType: MediaFolderType) {
    const form = new FormData();
    form.append('file', file);
    form.append('folderType', folderType);
    return this.http.post<UploadedMedia>(`${BASE}/media/upload`, form);
  }
}
