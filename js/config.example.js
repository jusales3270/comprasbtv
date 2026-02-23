/* ═══════════════════════════════════════════════════════
   ⚙️  EXEMPLO DE CONFIGURAÇÃO
   
   1. Copie este arquivo para config.js
   2. Substitua os valores pelas suas credenciais do Supabase
   3. Encontre as credenciais em: Supabase Dashboard → Settings → API
   ═══════════════════════════════════════════════════════ */

const SUPABASE_CONFIG = {
  URL: 'https://seu-projeto.supabase.co',
  ANON_KEY: 'sua-anon-key-aqui'
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}
