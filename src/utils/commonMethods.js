// Funcion para formatear fehca de nacimiento para poder mostrarla
export const formatDate = date => {
  const dateObj = new Date(date);

  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  const dateFormateada = `${year}-${month}-${day}`;

  return dateFormateada;
};

// Funcion para calcular edad a partir de una fecha de nacimiento
export const calculateAge = date => {
  const dateArray = date.split(' ');
  const birthdayDate = new Date(dateArray[0]);
  const currentDate = new Date();

  const age = currentDate.getFullYear() - birthdayDate.getFullYear();

  return age;
};

// Funcion para calcular tiempo faltante entre la hora actual y otro horario
export const calculateTimeDifference = (dateString, secondsToAdd) => {
  const originalDate = new Date(dateString);
  const currentTime = new Date();

  const modifiedDate = new Date(originalDate.getTime() + secondsToAdd * 1000);

  const timeDifferenceInSeconds = Math.floor(
    (modifiedDate - currentTime) / 1000,
  );

  return timeDifferenceInSeconds;
};
