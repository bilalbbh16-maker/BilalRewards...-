// تسجيل مستخدم جديد
async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else alert("Registered successfully");
}

// تسجيل الدخول
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else window.location = "dashboard.html";
}

// تسجيل الخروج
async function logout() {
  await supabase.auth.signOut();
  window.location = "login.html";
}
