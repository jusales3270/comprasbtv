/* ═══════════════════════════════════════════════════════
   BUILD SCRIPT - Injeta variáveis de ambiente no config.js
   ═══════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

// Tenta ler as variáveis de ambiente
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Se não encontrar, usa valores placeholder (não quebra o deploy)
const finalUrl = supabaseUrl || 'COLE_SUA_SUPABASE_URL_AQUI';
const finalKey = supabaseKey || 'COLE_SUA_ANON_KEY_AQUI';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  AVISO: Variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY não encontradas!');
  console.warn('   Configure no Vercel em: Project Settings → Environment Variables');
  console.warn('   O deploy vai continuar, mas o app não vai conectar ao Supabase.');
}

const configContent = `/* ═══════════════════════════════════════════════════════
   ⚙️  CONFIGURAÇÃO SUPABASE — BOITUVA
   (Gerado automaticamente pelo build)
   ═══════════════════════════════════════════════════════ */

const SUPABASE_CONFIG = {
  URL: '${finalUrl}',
  ANON_KEY: '${finalKey}'
};

// Exporta para uso nos módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SUPABASE_CONFIG;
}
`;

const configPath = path.join(__dirname, 'js', 'config.js');

fs.writeFileSync(configPath, configContent);

if (supabaseUrl && supabaseKey) {
  console.log('✅ js/config.js gerado com sucesso!');
  console.log('   URL:', supabaseUrl);
} else {
  console.log('⚠️  js/config.js gerado com valores placeholder.');
}
