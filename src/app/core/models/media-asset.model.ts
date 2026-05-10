/**
 * Internal representation of a media asset during the selection and upload phase.
 * Separates the raw File from its backend-intended media type.
 */
export interface MediaAsset {
  file: File;
  type: 'IMAGE' | 'VIDEO';
}

/**
 * Utility to determine Media Type from a File object.
 */
export function getMediaType(file: File): 'IMAGE' | 'VIDEO' {
  return file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE';
}
