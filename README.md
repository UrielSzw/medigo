#  Medigo Manual de uso 

Bienvenido/a a nuestra aplicación de Médicos a Domicilio. Esta guía le proporcionará todas las instrucciones necesarias para conectar nuestra aplicación de manera efectiva con nuestro servidor para poder asi hacer uso de nuestros servicios.


- [MediGo Manual de Uso](#medigo-manual-de-uso)
  - [Introducción](#introducción)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Logica de Negocio](#logica-de-negocio)
  - [Guía de uso](#guía-de-uso)
    - [Caso Paciente](#caso-paciente)
    - [Caso Medico](#caso-medico)
  - [Contribución](#contribución)

## Introducción

Bienvenido al desarrollo del Proyecto Final de la materia PRF de nuestra aplicación diseñada para facilitar la comunicación segura y eficiente entre clientes y profesionales de la salud. Proporciona una plataforma privada y confiable para consultas, revisiones y cualquier interacción necesaria, sin la necesidad de equipos médicos especializados. La aplicación se centra en generar el encuentro entre paciente y medico para consultas, revisiones, etc , garantizando que la información compartida a la aplicacion y entre el paciente y el médico se mantenga confidencial y segura.

## Tecnologías Utilizadas

El proyecto utiliza las siguientes tecnologías y bibliotecas:

- React Native: El marco de trabajo principal utilizado para construir la aplicación móvil.
- Axios: Una biblioteca para hacer solicitudes HTTP a un servidor.
- React Native Maps: Una biblioteca para mostrar mapas y manejar la geolocalización.
- React Native SVG: Una biblioteca para renderizar imágenes SVG.
- React Navigation: Una biblioteca para manejar la navegación entre las pantallas en la aplicación.
- Redux: Una biblioteca de gestión de estado para JavaScript.

**Lógica de negocio**

EL incio de aplicacion es un basico login, con su registrar, el cual tiene 2 opciones. Medico y Paciente, estas 2 tienen un diferente formulario de registro. Cada uno por su parte tendra diferentes pedidos de informacion para poder registrarse. El Paciente cuenta con Nombre - Apellido - Sexo(M/F/O) - Fecha de Nacimiento(DD-MM-YYYY) - Email - Contraseña - Telefono - DNI - Direccion - Piso(opcional) - Departamento(opcional) - Ciudad - Codigo Postal - Miembros del Grupo Familiar que cada uno tiene Nombre - Apellido - Sexo(M/F/O) - Fecha de Nacimiento(DD-MM-YYYY) y el medico cuenta con Nombre - Apellido - Sexo(M/F/O) - Fecha de Nacimiento(DD-MM-YYYY) - Email - Contraseña - Telefono - DNI - Direccion - Especialidad que puede ser(Clinico - Pediatria - Ginecologia - Traumatologia - Alergista) - Precio - Radio de Accion(KM) - Numero de Matricula. Luego de esto se le permitira inciar sesion sin ningun inconveniente.

La aplicación permite a los médicos ponerse en activo y empezar a recibir peticiones de los pacientes. Cada petición incluye la ubicación, los datos del paciente, el motivo de la consulta, entre otros detalles. El médico puede decidir si desea aceptar la petición o no. Antes de aceptar, el médico debe seleccionar su ubicación actual en un mapa para que la aplicación pueda calcular la distancia entre el médico y el paciente. Una vez que la petición es aceptada, la aplicación informa al paciente el tiempo estimado de llegada del médico.

Por otro lado, los pacientes pueden crear una consulta indicando su dirección, zona, código postal, motivo de la consulta, especialidad requerida, entre otros detalles. Una vez creada la consulta, el paciente debe confirmarla y esperar hasta que un médico disponible la acepte. El tiempo de espera es de aproximadamente 1 minuto. Una vez que la consulta es aceptada, el paciente debe esperar el tiempo estimado de llegada del médico. En el caso de que la consulta con el medico seleccionado hacia superado el minuto, la peticion de consulta se cancela y ese medico a ese cliente no le volvera a aparecer, por lo cual debera de buscar otro medico disponible en la zona.

El pago se realiza en efectivo al finalizar la consulta. Ambas partes deben valorarse mutuamente con una breve descripcion sobre como estuvo cada uno por su parte, y la consulta se registra en el historial del paciente y del médico.

Este cuenta con una breve configuracion para cada uno de los usuarios en especifico:

El medico cuenta con Actividad con su historial de clientes atendidos con su valoracion y descripcion, se encuentra tambien los Datos Personales del medico, en este caso, que cuenta con toda la informacion obtenida del registrarse al inicio de la aplicacion, en este se encuentran el dni, telefono, especialidades, precio de la consulta, numero de matricula y radio de accion. Tanto el precio como radio de Accion son los 2 atributos que mas se suelen cambiar dependiendo el medico ya que son las mas importantes en cuanto a las peticiones hacia los usuarios. Y por ultimo se encuentra una parte de Ayuda, la cual contiene las preguntas mas frecuentes con sus respuestas, esta pueden ayudar  a los usuarios en el uso de la aplicacion.

Y en cuanto al cliente(paciente) cuenta con su historial de medicos recibidos con su valoracion y descripcion, se encuentra tambien los Datos Personales del cliente, en este caso, que cuenta con toda la informacion obtenida del registrarse al inicio de la aplicacion, el dni, telefono, .............  Y por ultimo se encuentra una parte de Ayuda, la cual contiene las preguntas mas frecuentes con sus respuestas, esta pueden ayudar  a los usuarios en el uso de la aplicacion.

## Guía de uso

1. Lo primero que se encuentra es el inicio de sesion con un boton de registrarse para crear un cuenta.
"Aca Foto de INICIAR SESION"

2. De ahi al pasar al registrarse podes elegir si ser un usuario Paciente o un usuario Medico, dependiendo de la razon del uso que le des a la aplicacion
"Aca Foto de SELECCION DE USUARIO"

3. Una vez seleccionado el tipo de usuario, este es el registrarse de Paciente
"Aca Foto de SELECCION DE USUARIO"

y este es el registrarse de Medico
"Aca Foto de SELECCION DE MEDICO"

### Caso Paciente
1. En el caso Paciente, lo primero que se ve es el home del Paciente donde podramos solicitar una consulta y elegir al medico que esten con la cuenta activada
"Aca Foto de la HOME DE PACIENTE"

2. Ademas de eso encontraremos en la parte superior para cambiar nuestra direccion en cualquier momento
"Aca Foto de la CAMBIO DE DIRECCION"

3. Luego en la parte inferior si presionamos el icono del usuario nos trasladara a lo que son nuestras Actividad(Historial de Consultas) - Datos Personales - Ayuda - Miembros Familiares. Ademas de todas esas opciones hay tambien un boton de logOut para cerrar sesion
"Aca Foto de la CONFIGURACION"

4. Al preisonar boton de "Solicitar Medico", se abrira un formulario donde el paciente debera ingresar informacion medica de la consulta
"Aca Foto de la INFORMACIO MEDICA PARA CONSULTA"

5. Te aparecera una lista de medicos para elegir cual quiere que le haga la consulta con la informacion del medico
"Aca Foto de la LISTA DE MEDICOS A ELEGIR"

6. Luego debera esperar por 1 minuto para ver si algun medico le acepta la consulta
"Aca Foto de la ESPERA DE 1 MINUTO"

7. Si se acepta lo mandara a otra pestaña donde le aparecera una card con los datos de la consulta
"Aca Foto de la MUESTRA DE CONSULTA ACEPTADA"

8. Una vez terminada la consulta, lo enviara al paciente directo a una pestaña donde debera valorar al medico y brindar, si quiere, una breve descripcion de la consulta del medico. Y eso luego pasara al historial de consultas(Actividad) en configuracion
"Aca Foto de la VALORACION AL MEDICO"

### Caso Medico
1. En el caso Medico, lo primero que se ve es el home del Medico donde podramos activar nuestra cuenta para empezar a recibir solicitudes de Pacientes
"Aca Foto de la HOME DE MEDICO"

2. Una vez activa la cuenta nos mandara a un mapa donde deberemos de confirmar nuestra ubicacion
"Aca Foto del MAPA"

3. Luego nos empezaran a aparecer los pacientes que nos hayan solicitado y nosotros deberemos de elegir si aceptar o no
"Aca Foto del ACEPTACION DE PACIENTE"

4. Una vez terminada la consulta, lo enviara al paciente directo a una pestaña donde debera valorar al medico y brindar, si quiere, una breve descripcion de la consulta del medico. Y eso luego pasara al historial de consultas(Actividad) en configuracion
"Aca Foto de la VALORACION AL MEDICO"

"Aca Foto de la ACTIVIDAD"

5. Luego en la parte inferior si presionamos el icono del usuario nos trasladara a lo que son nuestras Actividad(Historial de Consultas) - Datos Personales - Ayuda. Ademas de todas esas opciones hay tambien un boton de logOut para cerrar sesion
"Aca Foto de la CONFIGURACION"


## Contribución

- [Paula Fuentes](mailto:paulyta1983@gmail.com) - [@paulyta1983](https://github.com/paulyta1983/)
- [Mariano Di Gennaro](mailto:mariano.psico@gmail.com) - [@marianopsico](https://github.com/marianopsico/)
- [Ezequiel Korelblum](mailto:ezequiel@losko.com.ar) - [@EzeKoren](https://github.com/EzeKoren/)
- [Uriel Swarcman](mailto:urielszw@gmail.com) - [@UrielSzw](https://github.com/UrielSzw/)
- [Javier Bagdadi](mailto:javibagdadi@hotmail.com) - [@javibag](https://github.com/javibag/)
- [Federico Peirano](mailto:fedepr2345@gmail.com) - [@FedePeira](https://github.com/FedePeira/)
- [Facundo Lopez Bruno](mailto:faculopez93@hotmail.com.ar) - [@FacuuLopez](https://github.com/FacuuLopez/)
- [Matías Sosa](mailto:sosamatias171@gmail.com) - [@sosamatias1](https://github.com/sosamatias1/)