# Script para subir el proyecto a GitHub
# Ejecuta este script en PowerShell

Write-Host "🚀 Preparando proyecto para GitHub..." -ForegroundColor Cyan

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git detectado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git no está instalado. Por favor instala Git desde: https://git-scm.com/download/win" -ForegroundColor Red
    Write-Host "Presiona cualquier tecla para salir..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Inicializar repositorio Git
Write-Host "`n📦 Inicializando repositorio Git..." -ForegroundColor Yellow
git init

# Configurar usuario (si no está configurado)
$userName = git config user.name
if (-not $userName) {
    Write-Host "`n⚙️ Configurando Git..." -ForegroundColor Yellow
    $name = Read-Host "Introduce tu nombre para Git"
    $email = Read-Host "Introduce tu email para Git"
    git config user.name "$name"
    git config user.email "$email"
}

# Añadir todos los archivos
Write-Host "`n📁 Añadiendo archivos al repositorio..." -ForegroundColor Yellow
git add .

# Hacer commit
Write-Host "`n💾 Creando commit inicial..." -ForegroundColor Yellow
git commit -m "🎉 Initial commit - Empresa 25-26 Web Premium

✨ Características:
- Diseño premium con efectos glassmorphism
- Tienda 3D interactiva con rotación fluida
- Lazy loading optimizado
- Animaciones sutiles y elegantes
- Progress bar de scroll
- Efectos parallax
- 100% responsive
- Optimizado para rendimiento
- Headers de seguridad implementados

📱 Redes Sociales:
- Instagram: @bitacoescultas_2526
- TikTok: @bitacoescultas_2526"

# Crear rama main
Write-Host "`n🌿 Creando rama main..." -ForegroundColor Yellow
git branch -M main

# Instrucciones para conectar con GitHub
Write-Host "`n" -NoNewline
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📋 SIGUIENTE PASO: Conectar con GitHub" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Ve a GitHub.com e inicia sesión" -ForegroundColor Yellow
Write-Host "2️⃣  Haz click en '+' > 'New repository'" -ForegroundColor Yellow
Write-Host "3️⃣  Nombre del repositorio: " -NoNewline -ForegroundColor Yellow
Write-Host "empresa-25-26" -ForegroundColor Green
Write-Host "4️⃣  Descripción: " -NoNewline -ForegroundColor Yellow
Write-Host "Sitio web oficial del proyecto Empresa 25-26" -ForegroundColor Green
Write-Host "5️⃣  Selecciona: " -NoNewline -ForegroundColor Yellow
Write-Host "Public" -ForegroundColor Green
Write-Host "6️⃣  NO marques ninguna opción adicional" -ForegroundColor Yellow
Write-Host "7️⃣  Click en " -NoNewline -ForegroundColor Yellow
Write-Host "'Create repository'" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Pedir URL del repositorio
Write-Host "Una vez creado el repositorio, copia la URL que aparece" -ForegroundColor White
Write-Host "Ejemplo: " -NoNewline
Write-Host "https://github.com/TU_USUARIO/empresa-25-26.git" -ForegroundColor Gray
Write-Host ""
$repoUrl = Read-Host "Pega aquí la URL de tu repositorio de GitHub"

if ($repoUrl) {
    Write-Host "`n🔗 Conectando con GitHub..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    
    Write-Host "`n⬆️  Subiendo archivos a GitHub..." -ForegroundColor Yellow
    Write-Host "Esto puede tardar un momento..." -ForegroundColor Gray
    
    try {
        git push -u origin main
        
        Write-Host "`n" -NoNewline
        Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host "  ✅ ¡PROYECTO SUBIDO EXITOSAMENTE!" -ForegroundColor White
        Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 Tu proyecto está ahora en GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
        Write-Host "  📋 ACTIVAR GITHUB PAGES" -ForegroundColor White
        Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1️⃣  Ve a tu repositorio en GitHub" -ForegroundColor Yellow
        Write-Host "2️⃣  Click en " -NoNewline -ForegroundColor Yellow
        Write-Host "'Settings'" -ForegroundColor Green
        Write-Host "3️⃣  En el menú lateral, click en " -NoNewline -ForegroundColor Yellow
        Write-Host "'Pages'" -ForegroundColor Green
        Write-Host "4️⃣  En 'Source', selecciona:" -ForegroundColor Yellow
        Write-Host "    • Branch: " -NoNewline -ForegroundColor Yellow
        Write-Host "main" -ForegroundColor Green
        Write-Host "    • Folder: " -NoNewline -ForegroundColor Yellow
        Write-Host "/ (root)" -ForegroundColor Green
        Write-Host "5️⃣  Click en " -NoNewline -ForegroundColor Yellow
        Write-Host "'Save'" -ForegroundColor Green
        Write-Host "6️⃣  Espera 1-2 minutos" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🌐 Tu web estará en:" -ForegroundColor Cyan
        
        # Extraer usuario de la URL
        if ($repoUrl -match "github\.com[:/]([^/]+)/") {
            $usuario = $matches[1]
            Write-Host "   https://$usuario.github.io/empresa-25-26/" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
        
    } catch {
        Write-Host "`n❌ Error al subir a GitHub:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        Write-Host "`nPosibles soluciones:" -ForegroundColor Yellow
        Write-Host "1. Verifica que la URL del repositorio sea correcta" -ForegroundColor White
        Write-Host "2. Asegúrate de tener permisos en el repositorio" -ForegroundColor White
        Write-Host "3. Verifica tu conexión a internet" -ForegroundColor White
    }
} else {
    Write-Host "`n⚠️  No se proporcionó URL del repositorio" -ForegroundColor Yellow
    Write-Host "Puedes conectar manualmente más tarde con:" -ForegroundColor White
    Write-Host "git remote add origin TU_URL_AQUI" -ForegroundColor Gray
    Write-Host "git push -u origin main" -ForegroundColor Gray
}

Write-Host "`n✨ Script completado" -ForegroundColor Cyan
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
