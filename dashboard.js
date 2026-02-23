Enterlet user;

async function loadUser() {
  const { data } = await supabase.auth.getUser();
  user = data.user;
  document.getElementById("user-email").innerText = user.email;
  loadBalance();
}

async function loadBalance() {
  const { data } = await supabase.from("users").select("balance").eq("id", user.id).single();
  document.getElementById("balance").innerText = data.balance;
}

async function watchAd() {
  if (!antiCheat()) return;
  await supabase.rpc("add_balance", { uid: user.id, amount: CONFIG.AD_REWARD });
  loadBalance();
}

async function clickLink() {
  if (!antiCheat()) return;
  await supabase.rpc("add_balance", { uid: user.id, amount: CONFIG.LINK_REWARD });
  loadBalance();
}

async function withdraw(method) {
  const { data } = await supabase.from("users").select("balance").eq("id", user.id).single();
  if (data.balance < CONFIG.MIN_WITHDRAW) { alert("Minimum withdraw 0.5$"); return; }
  await supabase.from("withdraws").insert({ user_id: user.id, amount: data.balance, method });
  alert("Withdraw requested");
}

loadUser();
