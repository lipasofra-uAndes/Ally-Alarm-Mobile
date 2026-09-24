# Ally Alarm

Aplicación móvil para crear y gestionar alarmas personalizadas según distintas
categorías: medicamentos, entrenamiento, estudio o trabajo, reuniones, viajes y
otras actividades.

La aplicación fue construida con **React Native**, **Expo** y **TypeScript**.
Incluye el flujo de inicio de sesión, creación de alarmas, sugerencias
inteligentes e integración con calendarios.

## Descargar la aplicación

![Código QR para descargar Ally Alarm](assets/images/qr-apk.png)

**Enlace de descarga del APK:**

https://expo.dev/accounts/lipasofra/projects/ally-alarm/builds/d045b4ec-851c-4ed7-98fc-e051f05cabed

## Diseño y adaptación

Los diseños originales de Figma fueron creados para una pantalla de **375 × 812
dp**, tomando como referencia un iPhone y el espacio inferior de la “rayita” de
navegación de iOS.

Durante la implementación en el dispositivo Android, la barra de navegación del
sistema ocupa su propio espacio inferior. Por eso la tab bar se ajustó para usar
el área segura real del dispositivo en lugar de depender del
espacio fijo reservado por el diseño de iOS. También se adaptaron las posiciones
del botón flotante y de los botones inferiores para evitar superposiciones en
distintas alturas de pantalla.

*Se hicieron estos cambios aunque no se solicitaban ya que esto afectaba de manera considerable la navegación y la experiencia de usuario.*

## Ejecutar el proyecto localmente

### Requisitos

- Node.js 20 o superior.
- npm, pnpm o yarn.
- Android Studio y un emulador Android, o un dispositivo físico con Expo Go.
- Para iOS: Xcode y un simulador, o un dispositivo con Expo Go.

### Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd ally-alarm-native
```

Instala las dependencias:

```bash
npm install
```

### Iniciar la aplicación

Inicia el servidor de Expo:

```bash
npm start
```

Después puedes abrir la aplicación con una de estas opciones:

```bash
# Android conectado o emulador abierto
npm run android

# iOS Simulator, solo en macOS con Xcode
npm run ios

# Navegador web
npm run web
```

También puedes escanear el código QR mostrado por Expo Go desde un dispositivo
físico conectado a la misma red.

## Estructura principal

```text
src/
├── components/     Componentes reutilizables como la tab bar
├── navigation/     Tipos y configuración de navegación
├── screens/        Pantallas de la aplicación
└── state/          Estado global de las alarmas
assets/
├── fonts/          Fuentes utilizadas por la interfaz
└── images/         Imágenes e iconos de la aplicación
```

## Pantallas incluidas

| Pantalla | Archivo |
| --- | --- |
| Inicio / login | `src/screens/InicioScreen.tsx` |
| Mis alarmas | `src/screens/HomeAlarmas.tsx` |
| Categorías de alarma | `src/screens/CrearAlarmaCategoria.tsx` |
| Plantilla de entrenamiento | `src/screens/ModalPlantilla.tsx` |
| Formulario de alarma | `src/screens/CrearAlarmaForm.tsx` |
| Configuración | `src/screens/Configuracion.tsx` |
| Integración de calendario | `src/screens/IntegracionCalendario.tsx` |
| Selección de proveedor | `src/screens/SeleccionProveedor.tsx` |
| Integración exitosa | `src/screens/IntegracionExitosa.tsx` |
| Confirmación de sugerencia | `src/screens/SugerenciaConfirm.tsx` |

## Tecnologías

- React Native 0.86
- Expo 57
- TypeScript
- React Navigation
- React Native Paper
- React Native SVG
