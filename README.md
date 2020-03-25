# ABM-TableJS
-> abm funcional que almacena en local storage, Create/Read/Update/Delete
no es necesario recargar la pagina, los datos se actualizan cada ves que ocurre un evento en el DOM

encontre necesario utilizar location.reload(true) -> porque generaba problemas al actualizar los datos despues de ser modificados
tambien opte por agregarlos a la funcion que agrega y envia, ya que era necesario para recargar el contador de elementos.

utliza LocalStorage y funciones que comparten datos de padre a hijo y actualizan finalizado el cambio.
