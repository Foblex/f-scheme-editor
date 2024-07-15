import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DefaultErrorStateMatcher, PLUGIN_TOKEN } from '@core';
import { DirectoryPlugin } from '@directory';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { EDITOR_ROUTES } from '../../projects/plugins/editor-routes';
import { SchemePlugin } from '../../projects/plugins/scheme/src/scheme.plugin';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(EDITOR_ROUTES),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: PLUGIN_TOKEN, useClass: DirectoryPlugin, multi: true },
    // { provide: PLUGIN_TOKEN, useClass: PalettePlugin, multi: true },
    { provide: PLUGIN_TOKEN, useClass: SchemePlugin, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        autoFocus: false,
      }
    },
    { provide: ErrorStateMatcher, useClass: DefaultErrorStateMatcher }
  ]
};
