const translate = require('@vitalets/google-translate-api');
const fs = require('fs');
const path = require('path');

// Tumhari target languages
const LANGUAGES = [
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ar', name: 'Arabic' },
];

async function autoTranslateAll() {
  try {
    // Base English file read karo
    const enPath = path.join(__dirname, 'translations', 'en.json');
    const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    
    let allTranslations = {
      en: enTranslations
    };
    
    console.log('🚀 Starting auto translation...\n');
    
    for (let lang of LANGUAGES) {
      console.log(`\n📝 Translating to ${lang.name} (${lang.code})...`);
      allTranslations[lang.code] = {};
      
      for (let key in enTranslations) {
        try {
          const result = await translate(enTranslations[key], { to: lang.code });
          allTranslations[lang.code][key] = result.text;
          console.log(`  ✅ ${key}: ${result.text}`);
          
          // Rate limiting - 1 second delay between translations
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          console.error(`  ❌ Failed: ${key}`, error.message);
          // Fallback to English
          allTranslations[lang.code][key] = enTranslations[key];
        }
      }
    }
    
    // Save karo
    const outputPath = path.join(__dirname, 'translations.json');
    fs.writeFileSync(outputPath, JSON.stringify(allTranslations, null, 2));
    
    console.log('\n✨ Auto translation completed!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log('\n📊 Statistics:');
    console.log(`   Total Languages: ${Object.keys(allTranslations).length}`);
    console.log(`   Total Keys: ${Object.keys(enTranslations).length}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run karo
autoTranslateAll();