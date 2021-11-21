import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";

export function App() {
  // listas: estado
  // setListas: modificador del estado
  const [listas, setListas] = useState([
    { id: 1, task: "Tarea 1", completed: false },
  ]);

  //Referencia para obtener a la data ingresada y usarla en el handle
  const taskRef = useRef();

  //Para escuchar y guardar las nuevas tareas creadas
  useEffect(() => {
    localStorage.setItem("listApp.lists", JSON.stringify(listas));
  }, [listas]);

  //Para visualizar aquellas tareas que ya se encuentren creadas
  useEffect(() => {
    //Obtener tareas guardadas
    const storedTasks = JSON.parse(localStorage.getItem("listApp.lists"));
    //Validar que existan,
    if (storedTasks) {
      setListas(storedTasks);
    }
  }, []);

  const toggleTask = (id) => {
    //copia de las tareas
    const newTasks = [...listas];
    //encontrar tarea seleccionada, según su id
    const task = newTasks.find((task) => task.id === id);
    task.completed = !task.completed; // si es true se convierte en false, si es false se convierte en true
    setListas(newTasks); //actualizamos el listado de tareas
  };

  //Método para añadir tareas
  const handleTaskAdd = () => {
    const task = taskRef.current.value;
    // En caso de que la data sea vacia no realizamos nada
    if (task === "") return;

    //En caso de recibir información, creamos un nuevo
    //elemento y hacemos cambios sobre el estado
    setListas((prevTasks) => {
      return [...prevTasks, { id: uuidv4(), task, completed: false }];
    });
    taskRef.current.value = null; //Limpia el input cuando se añade
  };

  //Método para eliminar tareas
  const handleClearAll = () => {
    //Hacemos una copia de las tareas creadas y
    // filtramos por aquellas que han sido seleccionadas
    const newTasks = listas.filter((task) => !task.completed);
    // Utilizamos setListas para setear los elementos,
    setListas(newTasks);
  };

  return (
    // Fragment se utiliza como padre para englobar varios elementos.
    <Fragment>
      <TodoList listas={listas} toggleTask={toggleTask} />
      <input ref={taskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleTaskAdd}>+</button>
      <button onClick={handleClearAll}>-</button>
      <div>
        Te quedan {listas.filter((task) => !task.completed).length} tareas por
        terminar
      </div>
    </Fragment>
  );
}
