const button = document.getElementById('checkBtn');
const output = document.getElementById('healthOutput');
const statusLine = document.getElementById('healthStatus');

button.addEventListener('click', async () => {
  button.disabled = true;
  button.textContent = 'Checking…';
  statusLine.className = 'status-line';
  statusLine.innerHTML = '<span class="status-dot"></span> Request in progress';
  try {
    const response = await fetch('api/health', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
    statusLine.className = 'status-line ok';
    statusLine.innerHTML = '<span class="status-dot"></span> Healthy · Java backend responded';
  } catch (error) {
    output.textContent = JSON.stringify({
      status: 'ERROR',
      message: error.message,
      hint: 'Confirm the app is deployed to Tomcat 10.1+ and open it through the same context path.'
    }, null, 2);
    statusLine.className = 'status-line fail';
    statusLine.innerHTML = '<span class="status-dot"></span> Health check failed · Check Tomcat logs';
  } finally {
    button.disabled = false;
    button.innerHTML = 'Run health check <span>→</span>';
  }
});
