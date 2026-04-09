import { useState } from "react";

interface Machine {
  id: number;
  name: string;
  type: string;
}

export default function App() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    if (editingId) {
      setMachines(
        machines.map(m =>
          m.id === editingId ? { ...m, name, type } : m
        )
      );
      setEditingId(null);
    } else {
      setMachines([...machines, { id: Date.now(), name, type }]);
    }

    setName("");
    setType("");
  };

  const deleteMachine = (id: number) => {
    setMachines(machines.filter(m => m.id !== id));
  };

  const editMachine = (m: Machine) => {
    setName(m.name);
    setType(m.type);
    setEditingId(m.id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Agrotech</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Tipo"
          value={type}
          onChange={e => setType(e.target.value)}
        />

        <button type="submit">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <hr />

      <p>Total: {machines.length}</p>

      {machines.length === 0 && <p>No hay máquinas</p>}

      {machines.map(m => (
        <div key={m.id}>
          {m.name} - {m.type}

          <button onClick={() => editMachine(m)}>Editar</button>
          <button onClick={() => deleteMachine(m.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}