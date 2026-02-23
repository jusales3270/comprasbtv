/* ═══════════════════════════════════════════════════════
   ⚙️  CONFIGURAÇÃO SUPABASE — BOITUVA
   ═══════════════════════════════════════════════════════ */

const SUPABASE_CONFIG = {
  URL: 'https://piiccitnhcjhpadoqbk.supabase.co',
  ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaWNjaXRuaGNqaHBhYWRvcWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjAzODUsImV4cCI6MjA4NzQzNjM4NX0.GyvASJ05PWjQepQWVaYGFxiKXHAYFx5Gn2IKvk674PQ'
};

// Exporta para uso nos módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}
