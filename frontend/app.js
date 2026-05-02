const API_BASE = "/api";

async function checkHealth() {
  const banner = document.getElementById("health-banner");
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    banner.innerHTML = `<div class="status ok">API status: ${data.status}</div>`;
  } catch {
    banner.innerHTML = `<div class="status err">API unreachable</div>`;
  }
}

async function loadItems() {
  try {
    const res = await fetch(`${API_BASE}/items`);
    const items = await res.json();
    const tbody = document.getElementById("items-body");
    tbody.innerHTML = items.length
      ? items.map(i => `
          <tr>
            <td>${escHtml(i.name)}</td>
            <td>${escHtml(i.description ?? "—")}</td>
            <td>$${Number(i.price).toFixed(2)}</td>
            <td><button class="btn-danger" onclick="deleteItem('${i.id}')">Delete</button></td>
          </tr>`).join("")
      : `<tr><td colspan="4" style="color:#999">No items yet.</td></tr>`;
  } catch (e) {
    console.error("Failed to load items", e);
  }
}

async function addItem() {
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim() || null;
  const price = parseFloat(document.getElementById("price").value);

  if (!name || isNaN(price)) {
    alert("Name and price are required.");
    return;
  }

  const res = await fetch(`${API_BASE}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price }),
  });

  if (res.ok) {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    loadItems();
  } else {
    alert("Failed to add item.");
  }
}

async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/items/${id}`, { method: "DELETE" });
  if (res.ok) loadItems();
  else alert("Failed to delete item.");
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

checkHealth();
loadItems();
