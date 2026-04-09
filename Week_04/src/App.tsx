import { useState } from "react";

interface Machine {
  id: number;
  name: string;
  type: string;
}

const initialData: Machine[] = [
  { id: 1, name: "Tractor", type: "Agrícola" },
  { id: 2, name: "Cosechadora", type: "Agrícola" },
  { id: 3, name: "Excavadora", type: "Construcción" }
];

export default function App() {
  const [machines] = useState<Machine[]>(initialData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [order, setOrder] = useState("asc");

  let filtered = machines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filter !== "all") {
    filtered = filtered.filter(m => m.type === filter);
  }

  filtered = [...filtered].sort((a, b) =>
    order === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Catálogo</h1>

      <input
        placeholder="Buscar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select onChange={e => setFilter(e.target.value)}>
        <option value="all">Todos</option>
        <option value="Agrícola">Agrícola</option>
        <option value="Construcción">Construcción</option>
      </select>

      <select onChange={e => setOrder(e.target.value)}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <hr />

      {filtered.length === 0 && <p>No hay resultados</p>}


      {filtered.map(m => (
        <div key={m.id}>
          {m.name} - {m.type}
        </div>
      ))}
    </div>
  );
}