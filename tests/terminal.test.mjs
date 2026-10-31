import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCommand} from '../src/lib/terminal/parser.ts';
import {commands,executeCommand,completeCommand,resolveVirtualPath} from '../src/lib/terminal/registry.ts';
const ctx={cwd:'/portfolio',history:['help','skills'],theme:'charcoal',now:new Date('2026-10-31T12:00:00Z')};
test('parser handles casing, quotes, escaping and incomplete input safely',()=>{
 assert.deepEqual(parseCommand('  EcHo "two words" \'another phrase\' escaped\\ space  '),{name:'echo',args:['two words','another phrase','escaped space']});
 assert.ok(parseCommand('echo "unfinished').error);assert.ok(parseCommand('x'.repeat(257)).error);
 assert.deepEqual(parseCommand('echo <script>alert(1)</script>'),{name:'echo',args:['<script>alert(1)</script>']});
});
test('all advertised commands execute through a registry with no inherited entries',()=>{
 const expected='help whoami about projects project skills education experience achievements resume contact github linkedin ls pwd cd cat echo date clear history theme coffee exit'.split(' ');
 assert.deepEqual(Object.keys(commands).sort(),expected.sort());
 for(const name of expected){const r=executeCommand(name==='project'?'project campusos':name,ctx);assert.ok(Array.isArray(r.blocks),name);}
 for(const name of ['constructor','__proto__','unknown'])assert.equal(executeCommand(name,ctx).blocks[0].kind,'error');
});
test('professional outputs stay structured and use central verified content',()=>{
 assert.ok(executeCommand('skills',ctx).blocks.some(b=>b.kind==='group'&&b.items.includes('Python')));
 assert.ok(executeCommand('education',ctx).blocks.some(b=>b.kind==='rows'&&b.rows.some(r=>r.value.includes('Ajeenkya'))));
 assert.equal(executeCommand('experience',ctx).blocks.filter(b=>b.kind==='timeline').length,2);
 assert.ok(JSON.stringify(executeCommand('achievements',ctx)).includes('70,000+'));
 assert.equal(executeCommand('projects',ctx).blocks.filter(b=>b.kind==='project').length,3);
 for(const name of ['campusos','aeris','ingress','"Ingress Within"'])assert.equal(executeCommand('PROJECT '+name,ctx).blocks[0].expanded,true);
});
test('virtual directory commands cannot read host files or environment variables',()=>{
 assert.equal(executeCommand('cd projects',ctx).cwd,'/portfolio/projects');
 assert.equal(executeCommand('cd ..',{...ctx,cwd:'/portfolio/projects'}).cwd,'/portfolio');
 assert.equal(resolveVirtualPath('../../etc/passwd',ctx.cwd),'/etc/passwd');
 for(const path of ['../../etc/passwd','.env.local','reference/resume.pdf','C:\\Users','/portfolio/__proto__'])assert.equal(executeCommand('cat '+path,ctx).blocks[0].kind,'error');
 assert.equal(executeCommand('cat campusos.txt',{...ctx,cwd:'/portfolio/projects'}).blocks[0].kind,'project');
 assert.ok(executeCommand('cat about.txt',ctx).blocks.length>1);
});
test('actions, themes, history and completion are deterministic',()=>{
 assert.equal(executeCommand('resume',ctx).action.type,'resume');assert.equal(executeCommand('clear',ctx).action.type,'clear');assert.equal(executeCommand('exit',ctx).action.type,'exit');
 assert.equal(executeCommand('contact',ctx).action.href,'#send-a-postcard');
 for(const name of ['github','linkedin'])assert.ok(executeCommand(name,ctx).action.href.startsWith('https://'));
 assert.equal(executeCommand('theme',ctx).theme,'paper');assert.equal(executeCommand('theme invalid',ctx).blocks[0].kind,'error');
 assert.equal(executeCommand('history',ctx).blocks[1].rows.length,2);
 assert.deepEqual(completeCommand('res'),['resume']);assert.deepEqual(completeCommand('project a'),['project aeris']);
 assert.equal(executeCommand('echo "hello world"',ctx).blocks[0].text,'hello world');
});
