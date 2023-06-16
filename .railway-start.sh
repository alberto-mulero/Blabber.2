#!/bin/bash

# Comando para iniciar el backend
sails lift:backend &

# Espera un momento para asegurarse de que el backend se inicie correctamente
sleep 10

# Comando para iniciar el frontend
ng serve -o:frontend