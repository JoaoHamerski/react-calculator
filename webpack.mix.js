let mix = require('laravel-mix')

mix.js('src/js/app.js', 'dist/js').react()
  .sass('src/css/app.scss', 'dist/css')
  .setPublicPath('public')
  .options({
    processCssUrls: false
  })

mix.copy(
  'node_modules/@fortawesome/fontawesome-free/webfonts/', 
  'public/dist/fonts/fontawesome'
)
