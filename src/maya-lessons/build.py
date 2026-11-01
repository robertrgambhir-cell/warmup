import os
D = os.path.dirname(os.path.abspath(__file__))
import sys, json
src = open(D+'/base-v10-lean.html').read()
css = open(D+'/v11.css').read()
lessons = open(D+'/lessons11.js').read()
engine = open(D+'/engine11.js').read() + open(D+'/door11.js').read()
def between(a, b):
    i = src.index(a); j = src.index(b, i); return src[i:j]
import re as _re
_css = src[:src.index('</style>')]
_css = _re.sub(r'\n\s*\.(voter|voter svg|voter b|voter span|stage|stage::before|stage svg|btn|btn\.ghost|btn:disabled) \{[^}]*\}', '', _css)
head = _css + css + '</style>\n'
html = between('<div class="wrap">', '<script>')
pre = between('(function () {', '  /* ---------- small builders')
voices = between('  /* ---------- voices ---------- */', '  /* ---------- story cards')
tail = '\n  render();\n  if (IN_CLAUDE && claude.use) claude.use("sample").then(function (s) { sample = s; }).catch(function () { sample = null; });\n})();\n</script>\n'
clips = sys.argv[1] if len(sys.argv) > 1 else None
if clips:
    voices = voices.replace(voices[voices.index('  var CLIPS = {};'):voices.index('\n', voices.index('  var CLIPS = {};'))], '  var CLIPS = ' + open(clips).read() + ';')
C = '<circle cx="50" cy="52" r="34" fill="\' + s + \'"/>'
voices = voices.replace(C + "' + hair", "' + (v.style === \"puff\" ? hair + '" + C + "' : '" + C + "' + hair)")
assert 'v.style === "puff" ? hair' in voices
head = head.replace('<title>Maya Kaur Lessons</title>', '<title>Maya Kaur Lessons</title>\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">', 1)
assert 'name="viewport"' in head
out = head + html + '<script>\n' + pre + voices + lessons + engine + tail
open(sys.argv[2] if len(sys.argv) > 2 else D+'/maya11-lean.html', 'w').write(out)
print(len(out))
