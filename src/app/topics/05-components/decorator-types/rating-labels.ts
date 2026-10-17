import { InjectionToken } from '@angular/core';

/** Optional labels for each star. Both ratings ask DI for it; the demo provides one. */
export const RATING_LABELS = new InjectionToken<string[]>('RATING_LABELS');

export const DEFAULT_LABELS = ['Bad', 'Meh', 'Okay', 'Good', 'Great'];
