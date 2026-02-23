let lastAction = 0;
function antiCheat() {
  const now = Date.now();
  if (now - lastAction < 5000) { alert("Wait 5 seconds between actions"); return false; }
  lastAction = now;
  return true;
}
