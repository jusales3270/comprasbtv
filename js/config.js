/* ═══════════════════════════════════════════════════════
   ⚙️  CONFIGURAÇÃO SUPABASE — BOITUVA
   ═══════════════════════════════════════════════════════ */

const SUPABASE_CONFIG = {
  URL: 'https://tmncnjiqyaakouitlrfo.supabase.co',
  ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbmNuamlxeWFha291aXRscmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjM3MzgsImV4cCI6MjA4NzQzOTczOH0.ZOCTxVwJu8YSboM0v0yWD9a_0Zc98W3UBxbVWJF--pE'
};

// Exporta para uso nos módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}
