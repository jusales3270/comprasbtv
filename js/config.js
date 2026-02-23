/* ═══════════════════════════════════════════════════════
   ⚙️  CONFIGURAÇÃO SUPABASE — BOITUVA
   ═══════════════════════════════════════════════════════ */

const SUPABASE_CONFIG = {
  URL: 'https://piiccitnhcjhpadoqbk.supabase.co',
  ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaWNjaXRuaGNqaHBhZG9xYmsiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwNjY0ODAwMCwiZXhwIjoyMDIyMjI0MDAwfQ.qRk26nQ-ffhDMMbxvAuF6A_BZEid9ef'
};

// Exporta para uso nos módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}
