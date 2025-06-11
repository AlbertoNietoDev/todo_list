# 🚀 Proyecto Full Stack TO DO LIST – Guía de Instalación y uso Paso a Paso

Este proyecto contiene un **frontend** y un **backend** que deben ejecutarse por separado. A continuación, se explican los pasos para que puedas correrlo correctamente en tu entorno local.

---

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- 🟦 **Git** → [https://git-scm.com](https://git-scm.com)
- 🟩 **Node.js** (incluye npm) → [https://nodejs.org](https://nodejs.org)

---

## 🧩 1. Instalar Node.js

🔹 Ve al sitio oficial: [https://nodejs.org](https://nodejs.org)  
🔹 Descarga la versión **LTS (Long-Term Support)**  
🔹 Instala siguiendo las instrucciones del asistente
🔹 Verifica en la terminal:

```bash
node -v
npm -v
```

---

***Para clonar el repositorio es necesario tener Git instalado (si ya lo tienes instalado puedes brincarte esta parte):

### ✅ 1. Instalar Git

Windows:

🔹 Ve a: https://git-scm.com .

🔹 Haz clic en Download for Windows.

🔹 Ejecuta el instalador y deja la configuración por defecto (usa Git Bash como terminal).

🔹 Una vez instalado, abre Git Bash o CMD/PowerShell.


macOS:

Puedes instalar Git de varias formas:

Opción 1: Instalar Xcode Command Line Tools (más fácil):

```bash
xcode-select --install
```

Opción 2: Usar Homebrew (si lo tienes):

```bash
brew install git
```

🔹 Linux (Debian, Ubuntu, etc.)

```bash
sudo apt update
sudo apt install git
```

### ✅ 2. Verificar que Git está instalado

Abre una terminal y ejecuta:
```bash
git --version
```
✅ Si ves algo como:
```bash
git version 2.42.0
```
Entonces ya tienes Git instalado correctamente.

### ✅ 3. Configurar tu nombre y correo
Antes de usar Git, configura tu identidad (esto aparecerá en los commits):
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```
Para verificarlo:
```bash
git config --global --list
```
---

## 📦 2. Clonar el repositorio

Usa Git para clonar el repositorio en tu máquina local:
```bash
git clone https://github.com/AlbertoNietoDev/todo_list.git
```
Luego entra en la carpeta del proyecto:
```bash
cd todo_list
```

## 🔧 5. Correr el Backend
Ve a la carpeta del backend:
```bash
cd backend
```
instala dependencias:
```bash
npm install
```
y ejecuta el servidor:
```bash
npm run dev
```
Esto iniciará el servidor backend, corriendo en el puerto 500 y te debe salir un mensaje en la consola como:
```bash
Server is running on http://localhost:5000
```

## 🌐 6. Correr el Frontend
En otra terminal, ve a la carpeta del frontend (si no estas en la carpeta "todo_list"):
```bash
cd todo_list
```
instala las dependencias:
```bash
npm install
```
y corre el proyecto:
```bash 
npm run start-front
```
debe aparecer un mensaje como este:
```bash
webpack compiled successfully
```

