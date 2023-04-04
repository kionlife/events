const mix = require('laravel-mix');

mix.vue({ version: 3 });

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        // ... any PostCSS plugins you are using, e.g. TailwindCSS or Autoprefixer
    ]);
