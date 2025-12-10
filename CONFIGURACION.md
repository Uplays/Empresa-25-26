# ⚙️ Configuración y Optimización Recomendada

## 🎯 Optimización de Imágenes

Para mejorar el rendimiento de la web, se recomienda optimizar las imágenes:

### Herramientas Recomendadas:
1. **TinyPNG** (https://tinypng.com/) - Para PNG
2. **JPEGmini** (https://www.jpegmini.com/) - Para JPEG
3. **Squoosh** (https://squoosh.app/) - Herramienta web gratuita

### Tamaños Recomendados:
- **Productos**: Máximo 800x800px, 80% calidad
- **Modelos**: Máximo 1200x1200px, 85% calidad
- **Hero/Banner**: Máximo 1920x1080px, 85% calidad

### Comandos (si tienes ImageMagick):
```bash
# Optimizar JPEG
magick Camiseta.jpeg -quality 80 -resize 800x800 Camiseta_opt.jpeg

# Optimizar PNG
magick pulsera.png -quality 80 -resize 800x800 pulsera_opt.png
```

## 🚀 Hosting Recomendado

### Opciones Gratuitas:
1. **GitHub Pages**
   - Gratis
   - HTTPS automático
   - Fácil de configurar
   - Ideal para sitios estáticos

2. **Netlify**
   - Gratis
   - Deploy automático
   - CDN global
   - Formularios integrados

3. **Vercel**
   - Gratis
   - Muy rápido
   - Optimización automática
   - Analytics incluido

### Configuración GitHub Pages:
```bash
# 1. Crear repositorio en GitHub
# 2. Subir todos los archivos
git init
git add .
git commit -m "Initial commit - Tienda 3D"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/empresa-25-26.git
git push -u origin main

# 3. Activar GitHub Pages en Settings > Pages
# 4. Tu web estará en: https://TU_USUARIO.github.io/empresa-25-26/
```

## 🔒 Seguridad

### Headers Recomendados (.htaccess):
```apache
# Prevenir clickjacking
Header always set X-Frame-Options "SAMEORIGIN"

# Prevenir XSS
Header always set X-XSS-Protection "1; mode=block"

# Prevenir MIME sniffing
Header always set X-Content-Type-Options "nosniff"

# HSTS (solo si tienes HTTPS)
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

## 📊 Analytics

### Google Analytics 4:
Añade antes de `</head>` en index.html y tienda.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🎨 Personalización Avanzada

### Cambiar Fuentes:
En `styles.css` y `tienda.html`, cambia:
```css
@import url('https://fonts.googleapis.com/css2?family=TU_FUENTE:wght@300;400;600;800&display=swap');

body {
  font-family: 'TU_FUENTE', sans-serif;
}
```

### Añadir Favicon:
1. Crea un favicon en https://favicon.io/
2. Añade en `<head>`:
```html
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
```

## 📱 PWA (Progressive Web App)

### manifest.json:
```json
{
  "name": "Empresa 25-26",
  "short_name": "E25-26",
  "description": "Tienda oficial del proyecto Empresa 25-26",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Añade en `<head>`:
```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#667eea">
```

## 🔍 SEO Avanzado

### Meta Tags Adicionales:
```html
<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="Empresa 25-26 - Tienda Oficial">
<meta property="og:description" content="Descubre nuestra colección exclusiva de productos scouts">
<meta property="og:image" content="https://tu-dominio.com/preview.jpg">
<meta property="og:url" content="https://tu-dominio.com">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Empresa 25-26 - Tienda Oficial">
<meta name="twitter:description" content="Descubre nuestra colección exclusiva de productos scouts">
<meta name="twitter:image" content="https://tu-dominio.com/preview.jpg">
```

### robots.txt:
```
User-agent: *
Allow: /

Sitemap: https://tu-dominio.com/sitemap.xml
```

### sitemap.xml:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tu-dominio.com/</loc>
    <lastmod>2025-12-09</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tu-dominio.com/tienda.html</loc>
    <lastmod>2025-12-09</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

## 🎯 Formularios de Compra

### Google Forms:
1. Crea un formulario en https://forms.google.com
2. Añade campos: Nombre, Email, Producto, Talla, Cantidad
3. Copia el enlace del formulario
4. Reemplaza en tienda.html:
```html
<button class="buy-btn btn-primary" data-url="TU_ENLACE_AQUI">Comprar ahora</button>
```

### Alternativa: Formspree
```html
<form action="https://formspree.io/f/TU_ID" method="POST">
  <input type="text" name="nombre" required>
  <input type="email" name="email" required>
  <select name="producto">
    <option>Camiseta</option>
    <option>Gorro</option>
    <!-- ... -->
  </select>
  <button type="submit">Enviar</button>
</form>
```

## 📈 Monitoreo de Rendimiento

### Google PageSpeed Insights:
https://pagespeed.web.dev/

### Lighthouse (Chrome DevTools):
1. F12 > Lighthouse
2. Generar reporte
3. Seguir recomendaciones

### Métricas Objetivo:
- **Performance**: >90
- **Accessibility**: >95
- **Best Practices**: >95
- **SEO**: >95

## 🔄 Actualizaciones Futuras

### Funcionalidades Sugeridas:
1. **Carrito de Compras**
   - LocalStorage para persistencia
   - Contador en el nav
   - Página de checkout

2. **Búsqueda de Productos**
   - Filtros por categoría
   - Búsqueda por nombre
   - Ordenar por precio

3. **Galería Mejorada**
   - Lightbox para imágenes
   - Zoom avanzado
   - Múltiples vistas del producto

4. **Sistema de Reseñas**
   - Estrellas de valoración
   - Comentarios de usuarios
   - Fotos de clientes

5. **Newsletter**
   - Suscripción por email
   - Notificaciones de nuevos productos
   - Ofertas exclusivas

## 🛠️ Mantenimiento

### Checklist Mensual:
- [ ] Verificar todos los enlaces
- [ ] Actualizar precios si es necesario
- [ ] Revisar analytics
- [ ] Optimizar nuevas imágenes
- [ ] Backup de la web
- [ ] Actualizar contenido

### Backup Recomendado:
```bash
# Crear backup
zip -r backup_$(date +%Y%m%d).zip *.html *.css *.js *.jpeg *.png *.md

# O usar Git
git add .
git commit -m "Backup $(date +%Y-%m-%d)"
git push
```

## 📞 Soporte

Para problemas técnicos:
1. Revisa la consola del navegador (F12)
2. Verifica que todos los archivos están presentes
3. Comprueba la compatibilidad del navegador
4. Consulta la documentación en los archivos .md

---

**Última actualización**: 9 de diciembre de 2025
