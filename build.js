/* ═══════════════════════════════════════════════════════
   BUILD SCRIPT - Injeta variáveis de ambiente no config.js
   ═══════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRO: Variáveis de ambiente não encontradas!');
  console.error('   Configure no Vercel: SUPABASE_URL e SUPABASE_ANON_KEY');
  process.exit(1);
}

const configContent = `/* ═══════════════════════════════════════════════════════
   ⚙️  CONFIGURAÇÃO SUPABASE — BOITUVA
   (Gerado automaticamente pelo build)
   ═══════════════════════════════════════════════════════ */

const SUPABASE_CONFIG = {
  URL: '${supabaseUrl}',
  ANON_KEY: '${supabaseKey}'
};

// Exporta para uso nos módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}
`;

const configPath = path.join(__dirname, 'js', 'config.js');

fs.writeFileSync(configPath, configContent);
console.log('✅ js/config.js gerado com sucesso!');
console.log('   URL:', supabaseUrl);
