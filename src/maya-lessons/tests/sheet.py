import sys
from PIL import Image
d=sys.argv[1]; out=sys.argv[2]; names=sys.argv[3:]
ims=[Image.open(f'{d}/{n}.png') for n in names]
ims=[im.crop((0,70,im.size[0],im.size[1]-40)) for im in ims]
w,h=ims[0].size
W=Image.new('RGB',(w*len(ims)+10*(len(ims)-1),h),'white')
for i,im in enumerate(ims): W.paste(im,((w+10)*i,0))
W=W.resize((W.size[0]*2//5,W.size[1]*2//5)); W.save(out)
