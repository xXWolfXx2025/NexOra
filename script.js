// script.js
const flowCanvas = document.getElementById('flowCanvas');
const newFlowBtn = document.getElementById('newFlowBtn');
const saveFlowBtn = document.getElementById('saveFlowBtn');
const runFlowBtn = document.getElementById('runFlowBtn');

let flowBlocks = [];

newFlowBtn.addEventListener('click', () => {
  const block = document.createElement('div');
  block.className = 'flow-block';
  block.textContent = 'Trigger: New Booking';
  block.dataset.type = 'trigger';
  flowCanvas.appendChild(block);
  flowBlocks.push({ type: 'trigger', name: 'new_booking' });
});

saveFlowBtn.addEventListener('click', () => {
  localStorage.setItem('nexoraFlow', JSON.stringify(flowBlocks));
  alert('Flow saved!');
});

runFlowBtn.addEventListener('click', () => {
  const flow = JSON.parse(localStorage.getItem('nexoraFlow'));
  if (flow) {
    alert(`Running flow with ${flow.length} blocks`);
    console.log(flow);
  } else {
    alert('No flow saved yet.');
  }
});

  const flowCanvas = document.getElementById('flowCanvas');
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

  flowCanvas.appendChild(newBlock);
});
