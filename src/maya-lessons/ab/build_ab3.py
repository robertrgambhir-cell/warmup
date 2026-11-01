# Builds ab3.html: Georgia's Practice golden screen (GA P2, the 1st try at Bri's door) in two layouts, A/B round 3.
# A: the door picture on top, the conversation under it. B: the conversation fills the screen, the door shrinks to a thumbnail.
# Same words, same moment: Bri's follow-up has just arrived and the canvasser is answering it out loud.
import pathlib, subprocess, sys
here = pathlib.Path(__file__).parent
door = subprocess.run(["node", str(here / "door_bri.js")], capture_output=True, text=True, check=True).stdout
thumb = door.replace('viewBox="0 0 320 240"', 'viewBox="96 56 128 128"', 1).replace('id="sc1"', 'id="sc2"').replace("url(#sc1)", "url(#sc2)")
src = (here / "ab3-src.html").read_text()
out = src.replace("DOOR_SVG", door.replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" ', 1).replace('viewBox="0 0 320 240"', 'viewBox="0 36 320 204"', 1)).replace("DOOR_THUMB", thumb)
pathlib.Path(sys.argv[1]).write_text(out)
print("wrote", sys.argv[1], len(out))
