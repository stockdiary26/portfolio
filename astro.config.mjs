import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
