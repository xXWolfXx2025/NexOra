// DOM Elements
const flowCanvas = document.getElementById('flowCanvas');
const newFlowBtn = document.getElementById('newFlowBtn');
const saveFlowBtn = document.getElementById('saveFlowBtn');
const runFlowBtn = document.getElementById('runFlowBtn');

let flowBlocks = [];
let connections = []; // Future use for linking blocks

// Create new trigger block
newFlowBtn.addEventListener('click', () => {
  const block = document.createElement('div');
  block.className = 'flow-block';
  block.textContent = 'Trigger: New Booking';
  block.dataset.type = 'trigger';
  block.id = 'block_' + Date.now();

  // Add connectors
  const input = document.createElement('div');
  input.className = 'connector input';
  block.appendChild(input);

  const output = document.createElement('div');
  output.className = 'connector output';
  block.appendChild(output);

  flowCanvas.appendChild(block);
  flowBlocks.push({ id: block.id, type: 'trigger', name: 'new_booking' });
});

// Save flow to localStorage
saveFlowBtn.addEventListener('click', () => {
  localStorage.setItem('nexoraFlow', JSON.stringify(flowBlocks));
  alert('Flow saved!');
});

// Run flow (basic simulation)
runFlowBtn.addEventListener('click', () => {
  const flow = JSON.parse(localStorage.getItem('nexoraFlow'));
  if (flow && flow.length > 0) {
    alert(`Running flow with ${flow.length} blocks`);
    console.log('Flow:', flow);
  } else {
    alert('No flow saved yet.');
  }
});

// Drag-and-drop logic
const blocks = document.querySelectorAll('.block');

blocks.forEach(block => {
  block.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', block.dataset.type + '|' + block.textContent);
  });
});

flowCanvas.addEventListener('dragover', (e) => {
  e.preventDefault(); // Allow drop
});

flowCanvas.addEventListener('drop', (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const [type, label] = data.split('|');

  const newBlock = document.createElement('div');
  newBlock.className = 'flow-block';
  newBlock.textContent = label;
  newBlock.dataset.type = type;
  newBlock.id = 'block_' + Date.now();

  // Add connectors
  const input = document.createElement('div');
  input.className = 'connector input';
  newBlock.appendChild(input);

  const output = document.createElement('div');
  output.className = 'connector output';
  newBlock.appendChild(output);

  flowCanvas.appendChild(newBlock);
  flowBlocks.push({ id: newBlock.id, type, name: label });
});
