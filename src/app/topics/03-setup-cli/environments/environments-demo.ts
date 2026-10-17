import { Component, computed, signal } from '@angular/core';
import { CodeBlock } from '@shared/ui/code-block/code-block';

type Command = 'serve' | 'build';

interface Environment {
  production: boolean;
  apiUrl: string;
  apiKey?: string;
}

// THE TWO FILES `ng generate environments` CREATES (with our values)
const FILES: Record<Command, { file: string; env: Environment }> = {
  serve: {
    file: 'environment.development.ts',
    env: { production: false, apiUrl: 'http://localhost:3000' },
  },
  build: {
    file: 'environment.ts',
    env: { production: true, apiUrl: 'https://api.myshop.com' },
  },
};

const FAKE_KEY = 'sk_live_DEMO_4f9a2c'; // made up, never put a real one in the frontend

/** fileReplacements in action: the code always imports environment.ts, the CLI picks the file. */
@Component({
  imports: [CodeBlock],
  selector: 'app-environments-demo',
  styleUrl: './environments-demo.scss',
  templateUrl: './environments-demo.html',
})
export default class EnvironmentsDemo {
  protected readonly command = signal<Command>('serve');
  protected readonly withSecret = signal(false);

  protected readonly active = computed(() => FILES[this.command()]);
  protected readonly isDev = computed(() => this.command() === 'serve');

  // WHAT environment LOOKS LIKE AFTER THE SWAP
  protected readonly environment = computed<Environment>(() => ({
    ...this.active().env,
    ...(this.withSecret() ? { apiKey: FAKE_KEY } : {}),
  }));

  // Printed the way the real file looks: unquoted keys, single-quoted strings
  protected readonly environmentCode = computed(() => {
    const lines = Object.entries(this.environment()).map(
      ([key, value]) => `  ${key}: ${typeof value === 'string' ? `'${value}'` : value},`,
    );
    return `export const environment = {\n${lines.join('\n')}\n};`;
  });

  // A SERVICE USING IT
  protected readonly request = computed(() => `GET ${this.environment().apiUrl}/products`);

  // WHAT ANYONE CAN READ IN THE BROWSER (DevTools → Sources → main-*.js)
  protected readonly bundleLine = computed(() => {
    const env = this.environment();
    const key = env.apiKey ? `,apiKey:"${env.apiKey}"` : '';
    return `const e={production:${env.production ? '!0' : '!1'},apiUrl:"${env.apiUrl}"${key}};`;
  });
}
