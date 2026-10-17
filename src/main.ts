import { bootstrapApplication } from '@angular/platform-browser';
import { markBoot } from '@core/boot/boot-marks';
import { appConfig } from './app/app.config';
import { App } from './app/app';

markBoot('main');

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
