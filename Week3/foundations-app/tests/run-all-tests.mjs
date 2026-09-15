import { spawn } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n======================================================');
console.log(' MindGuard AI · Foundations Automated Verification Suite ');
console.log('======================================================\n');

const testFiles = readdirSync(__dirname)
  .filter((f) => f.endsWith('.test.mjs'))
  .map((f) => join(__dirname, f));

console.log(`Discovered ${testFiles.length} test suites:`);
testFiles.forEach((f, i) => console.log(`  [${i + 1}] ${f.split(/[\\/]/).pop()}`));
console.log('\nExecuting tests with Node.js built-in test runner...\n');

const child = spawn('node', ['--test', ...testFiles], { stdio: 'inherit' });

child.on('close', (code) => {
  console.log('\n------------------------------------------------------');
  if (code === 0) {
    console.log('✅ ALL TEST SUITES PASSED (Coverage across components, tools & guardrails)');
  } else {
    console.log(`❌ Test execution exited with code ${code}`);
  }
  console.log('------------------------------------------------------\n');
  process.exit(code);
});
