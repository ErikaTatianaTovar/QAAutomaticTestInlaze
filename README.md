# Prueba Técnica QA - Inlaze

Este repositorio contiene los casos de prueba automatizados para el sistema de registro y login de usuarios de Inlaze, una compañía de marketing de afiliados especializada en apuestas deportivas en Latinoamérica.

## Caso 1: Registrarse

### Requerimientos Técnicos
1. Se debe registrar un usuario con nombre, email y una contraseña.
2. El nombre debe tener mínimo 2 palabras que representen primer nombre y primer apellido en un mismo campo.
3. El email debe cumplir con el estándar de una dirección de correo electrónico y ser único en la base de datos.
4. La contraseña debe tener una longitud mínima de 8 caracteres, con al menos una mayúscula, una minúscula, un número y un carácter especial.
5. El formulario no debe ser enviado hasta que todos los campos obligatorios estén completos.
6. La contraseña debe ser ingresada 2 veces y debe coincidir en ambos campos.

### Pasos a Automatizar
1. Verificar que el usuario pueda ingresar nombre, email y contraseña válidos.
2. Comprobar que el nombre ingresado tiene al menos 2 palabras.
3. Validar que el email tenga el formato correcto y sea único en la base de datos.
4. Confirmar que la contraseña cumple con los requisitos de longitud y complejidad.
5. Asegurar que el formulario no se envíe si faltan campos obligatorios.
6. Verificar que la contraseña coincida al ser ingresada 2 veces.

## Caso 2: Login

### Requerimientos Técnicos
1. El usuario debe poder loguearse con el email y contraseña registrados.
2. No se debe enviar el formulario de login hasta que todos los campos estén completos.
3. Al ingresar a la plataforma, se debe mostrar el nombre del usuario.
4. La plataforma debe permitir al usuario cerrar la sesión.

### Pasos a Automatizar
1. Verificar que el usuario pueda iniciar sesión con el email y contraseña correctos.
2. Asegurar que el formulario de login no se envíe si faltan campos.
3. Comprobar que al ingresar, se muestre el nombre del usuario.
4. Verificar que el usuario pueda cerrar sesión correctamente.

## Entregables
1. [**Documentación de Casos de Prueba**](./documentacion_casos_prueba.pdf): Se adjunta la documentación detallada de todos los casos de prueba dentro del archivo documentacion_casos_prueba.pdf que se encuentra en este mismo repositorio.
2. [**Reporte de Bugs**](./reporte_bugs.pdf): Se proporciona un reporte de los bugs encontrados durante la ejecución de los casos de prueba dentro del archivo reporte_bugs.pdf que se encuentra en este mismo repositorio.
3. **Scripts de Automatización con Cypress:** Los scripts de automatización desarrollados con Cypress se encuentran en la ruta `cypress/e2e/integration` en este repositorio.