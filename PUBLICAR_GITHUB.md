# 🚀 Guía para Publicar en GitHub Pages

## 📋 Pasos para Publicar la Web

### 1. Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz click en el botón **"+"** arriba a la derecha
3. Selecciona **"New repository"**
4. Configura el repositorio:
   - **Repository name**: `empresa-25-26` (o el nombre que prefieras)
   - **Description**: "Sitio web oficial del proyecto Empresa 25-26 - Intercambio Scout en Francia"
   - **Public** (para que sea accesible)
   - ✅ **Add a README file** (ya lo tenemos, así que puedes dejarlo sin marcar)
   - **Add .gitignore**: None (ya lo tenemos)
   - **Choose a license**: MIT License (opcional)
5. Click en **"Create repository"**

### 2. Subir el Proyecto a GitHub

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
# Inicializar Git
git init

# Añadir todos los archivos
git add .

# Hacer el primer commit
git commit -m "🎉 Initial commit - Web Empresa 25-26 con tienda 3D"

# Conectar con GitHub (reemplaza TU_USUARIO y TU_REPOSITORIO)
git branch -M main
git remote add origin https://github.com/TU_USUARIO/empresa-25-26.git

# Subir los archivos
git push -u origin main
```

### 3. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **"Settings"** (Configuración)
3. En el menú lateral, click en **"Pages"**
4. En **"Source"**, selecciona:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click en **"Save"**
6. Espera 1-2 minutos

¡Tu web estará disponible en: `https://TU_USUARIO.github.io/empresa-25-26/`!

## 🔄 Actualizar la Web

Cuando hagas cambios:

```powershell
# Añadir cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir a GitHub
git push
```

GitHub Pages se actualizará automáticamente en 1-2 minutos.

## 🎨 Personalización del README

Antes de publicar, actualiza el `README.md`:

1. Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub
2. Añade tus enlaces de redes sociales
3. Actualiza el email de contacto si es necesario

## 🔒 Configuración de Seguridad (Opcional)

### Añadir Dominio Personalizado

Si tienes un dominio propio:

1. En **Settings > Pages**
2. En **"Custom domain"**, escribe tu dominio
3. Configura los DNS de tu dominio:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```
4. Espera a que se propague (puede tardar hasta 48 horas)

### Forzar HTTPS

1. En **Settings > Pages**
2. Marca ✅ **"Enforce HTTPS"**

## 📊 Analytics (Opcional)

Para añadir Google Analytics:

1. Crea una cuenta en [Google Analytics](https://analytics.google.com)
2. Obtén tu ID de medición (G-XXXXXXXXXX)
3. Añade el código en `<head>` de `index.html` y `tienda.html`:

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

## 🐛 Solución de Problemas

### La página no se ve
- Espera 2-3 minutos después de activar GitHub Pages
- Verifica que el repositorio sea público
- Comprueba que la rama sea `main` y la carpeta `/ (root)`

### Las imágenes no cargan
- Verifica que todas las imágenes estén en el repositorio
- Comprueba que los nombres de archivo coincidan exactamente (mayúsculas/minúsculas)
- Asegúrate de que las rutas sean relativas (sin `/` al inicio)

### Los estilos no se aplican
- Verifica que todos los archivos CSS estén en el repositorio
- Comprueba la consola del navegador (F12) para errores
- Limpia la caché del navegador (Ctrl + Shift + R)

## 📱 Compartir la Web

Una vez publicada, comparte tu web:

- **URL directa**: `https://TU_USUARIO.github.io/empresa-25-26/`
- **Código QR**: Genera uno en [qr-code-generator.com](https://www.qr-code-generator.com/)
- **Redes sociales**: Comparte el enlace en Instagram, TikTok, etc.

## 🎯 Próximos Pasos

1. ✅ Publicar en GitHub Pages
2. ⚡ Optimizar imágenes para carga más rápida
3. 📊 Añadir Google Analytics
4. 🔗 Conectar formularios de compra reales
5. 📱 Promocionar en redes sociales

## 💡 Consejos

- **Haz commits frecuentes** con mensajes descriptivos
- **Prueba localmente** antes de subir cambios
- **Usa branches** para cambios grandes
- **Documenta** los cambios importantes
- **Optimiza imágenes** antes de subirlas

## 📞 Ayuda

Si tienes problemas:
- Consulta la [documentación de GitHub Pages](https://docs.github.com/es/pages)
- Revisa la consola del navegador (F12) para errores
- Verifica que todos los archivos estén en el repositorio

---

**¡Buena suerte con la publicación!** 🚀

Una vez publicada, tu web estará disponible 24/7 para que cualquiera pueda verla y apoyar vuestro proyecto.
