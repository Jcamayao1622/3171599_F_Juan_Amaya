// Interface principal
interface Machine {
  id: number;
  name: string;
  type: string;
  pricePerDay: number;
  status: 'available' | 'in-use' | 'maintenance';
}

// Type (union)
type MachineStatus = 'available' | 'in-use' | 'maintenance';

// Función para crear máquina
function createMachine(
  id: number,
  name: string,
  type: string,
  pricePerDay: number,
  status: MachineStatus = 'available'
): Machine {
  return { id, name, type, pricePerDay, status };
}

// Lista
let machines: Machine[] = [];

// Agregar
function addMachine(machine: Machine): void {
  machines.push(machine);
}

// Obtener
function getMachines(): Machine[] {
  return machines;
}

// Actualizar
function updateMachine(id: number, updates: Partial<Machine>): void {
  machines = machines.map(m =>
    m.id === id ? { ...m, ...updates } : m
  );
}

// Eliminar
function deleteMachine(id: number): void {
  machines = machines.filter(m => m.id !== id);
}

// PRUEBA (esto demuestra que funciona)
const tractor = createMachine(1, "Tractor X", "tractor", 500);

addMachine(tractor);

updateMachine(1, { status: 'in-use' });

console.log(getMachines());

deleteMachine(1);

console.log(getMachines());