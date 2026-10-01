(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,83253,e=>{"use strict";var a=e.i(43476),t=e.i(75056),r=e.i(95393),l=e.i(90874),i=e.i(71645),o=e.i(90072),n=e.i(45974),s=e.i(62099);let p=`
  attribute vec3 aColor;
  attribute float aAlpha;
  attribute float aSize;
  attribute float aShape;
  attribute float aHalo;
  uniform float uScale;
  uniform float uMinPx;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vShape;
  varying float vHalo;
  varying float vPx;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float px = max(aSize * uScale / -mv.z, uMinPx);
    gl_PointSize = px;
    vPx = px;
    vColor = aColor;
    vAlpha = aAlpha;
    vShape = aShape;
    vHalo = aHalo;
  }
`,u=`
  uniform vec3 uAccent;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vShape;
  varying float vHalo;
  varying float vPx;
  float fill(float d, float edge, float aa) { return 1.0 - smoothstep(edge - aa, edge, d); }
  float glyph(vec2 p, float shape, float aa) {
    float r = length(p);
    if (shape < 0.5) return fill(r, 0.55, aa);
    if (shape < 1.5) return fill(r, 0.9, aa) * (1.0 - fill(r, 0.56, aa));
    if (shape < 2.5) return fill(r, 0.72, aa);
    if (shape < 3.5) return fill(abs(p.x) + abs(p.y), 0.95, aa);
    if (shape < 4.5) return fill(max(abs(p.x), abs(p.y)), 0.66, aa);
    vec2 q = vec2(p.x + p.y, p.x - p.y) * 0.70710678;
    return fill(min(abs(q.x), abs(q.y)), 0.2, aa) * fill(max(abs(q.x), abs(q.y)), 0.95, aa);
  }
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float aa = 2.4 / max(vPx, 1.0);
    float inner = mix(1.0, 1.45, vHalo);
    float g = glyph(p * inner, vShape, aa * inner);
    float r = length(p);
    float h = vHalo * fill(r, 0.98, aa) * (1.0 - fill(r, 0.8, aa));
    float a = max(g, h);
    if (a * vAlpha < 0.01) discard;
    vec3 c = (g * vColor + h * uAccent) / max(g + h, 0.0001);
    gl_FragColor = vec4(c, a * vAlpha);
  }
`,h=e=>{let a=parseInt(e.slice(1),16);return[(a>>16&255)/255,(a>>8&255)/255,(255&a)/255]},f=s.LAYA_TONE_HEX.map(h);function v({step:e,reducedMotion:t,lowPower:n}){let d=n?170:260,c=n?48:72,g=(0,i.useMemo)(()=>{let e,a,t,r,l;return a=(e=(0,s.buildLayaModel)(d,c)).total,t=new o.BufferGeometry,r=(e,a)=>{let t=new o.BufferAttribute(e,a);return t.setUsage(o.DynamicDrawUsage),t},t.setAttribute("position",r(new Float32Array(3*a),3)),t.setAttribute("aColor",r(new Float32Array(3*a),3)),t.setAttribute("aAlpha",r(new Float32Array(a),1)),t.setAttribute("aSize",r(new Float32Array(a),1)),t.setAttribute("aShape",r(new Float32Array(a),1)),t.setAttribute("aHalo",r(new Float32Array(a),1)),l=new o.ShaderMaterial({vertexShader:p,fragmentShader:u,uniforms:{uScale:{value:100},uMinPx:{value:3},uAccent:{value:new o.Vector3(...h(s.LAYA_AUTHORITY_HEX))}},transparent:!0,depthTest:!1,depthWrite:!1}),{model:e,target:(0,s.allocTargets)(a),prevTargetX:new Float32Array(a),prevStep:-1,t:s.LAYA_STATIC_T,settle:1,ledgerStart:null,initialised:!1,geometry:t,material:l}},[d,c]),m=(0,i.useRef)(g),A=(0,i.useRef)(e),y=(0,i.useRef)(!t),S=(0,l.useThree)(e=>e.invalidate),x=(0,l.useThree)(e=>e.viewport),b=(0,l.useThree)(e=>e.size);(0,i.useEffect)(()=>(m.current=g,()=>{g.geometry.dispose(),g.material.dispose()}),[g]),(0,i.useEffect)(()=>{A.current=Math.max(0,Math.min(s.LAYA_STEP_COUNT-1,Math.round(e))),y.current=!t,S()},[e,t,S]);let M=Math.min(x.width/(2*s.DESIGN_HALF_W),x.height/(2*s.DESIGN_HALF_H));return(0,r.useFrame)((e,a)=>{let t,r=m.current,l=r.model,i=l.n,o=l.total,n=y.current,p=A.current,u=Math.min(a,.05);n&&(r.t+=u);let h=n?r.t:s.LAYA_STATIC_T,v=!n||!r.initialised;r.prevStep!==p&&(r.settle=0),r.settle=v?1:Math.min(1,r.settle+u/1.3),n?(null===r.ledgerStart&&p===s.S_RECORD&&(r.ledgerStart=r.initialised?(0,s.ledgerCount)(l,h):(0,s.staticLedgerStart)(l,h)),t=r.ledgerStart??(0,s.ledgerCount)(l,h)):t=(0,s.staticLedgerStart)(l,h),(0,s.computeTargets)(l,p,h,+!!n,t,r.target);let d=r.target,c=r.geometry,g=c.attributes.position.array,S=c.attributes.aColor.array,x=c.attributes.aAlpha.array,b=c.attributes.aSize.array,T=c.attributes.aShape.array,w=c.attributes.aHalo.array,_=r.prevStep===p,C=r.settle*r.settle,P=v?1:1-Math.exp(-(7*u)),H=v?1:1-Math.exp(-(9*u)),E=v?1:1-Math.exp(-(9*u));for(let e=0;e<o;e++){let a,t=3*e,o=d.pos[t],n=d.pos[t+1];a=v?1:e<i?1-Math.exp(-u*l.rate[e]*(1+24*C)):E,_&&!v&&Math.abs(o-r.prevTargetX[e])>s.DESIGN_HALF_W?(g[t]=o,g[t+1]=n,x[e]=0):x[e]<.01&&(g[t]=o,g[t+1]=n),r.prevTargetX[e]=o,g[t]+=(o-g[t])*a,g[t+1]+=(n-g[t+1])*a,g[t+2]=0;let p=f[d.tone[e]];S[t]+=(p[0]-S[t])*P,S[t+1]+=(p[1]-S[t+1])*P,S[t+2]+=(p[2]-S[t+2])*P,x[e]+=(d.alpha[e]-x[e])*H,b[e]+=(d.size[e]-b[e])*H,w[e]+=(d.halo[e]-w[e])*P,T[e]=d.glyph[e]}r.prevStep=p,c.attributes.position.needsUpdate=!0,c.attributes.aColor.needsUpdate=!0,c.attributes.aAlpha.needsUpdate=!0,c.attributes.aSize.needsUpdate=!0,c.attributes.aShape.needsUpdate=!0,c.attributes.aHalo.needsUpdate=!0;let L=e.camera;L.position.set(0,0,9),L.lookAt(0,0,0);let U=e.viewport.dpr,z=Math.min(1.45,Math.max(1,520/Math.max(Math.min(e.size.width,e.size.height),1))),F=r.material.uniforms;F.uScale.value=e.size.height*U*M*z/(2*Math.tan(35*Math.PI/360)),F.uMinPx.value=3*U,r.initialised=!0}),(0,i.useEffect)(()=>{S()},[b.width,b.height,S]),(0,a.jsx)("group",{scale:M,children:(0,a.jsx)("points",{geometry:g.geometry,material:g.material,frustumCulled:!1})})}e.s(["default",0,function({step:e,stepCount:r,reducedMotion:l,lowPower:i,visible:o}){let p=Math.max(0,Math.min(Math.min(r,s.LAYA_STEP_COUNT)-1,Math.round(e))),u=o?l?"demand":"always":"never";return(0,a.jsx)(n.LayaStage,{step:p,still:l,children:(0,a.jsx)(t.Canvas,{"aria-hidden":!0,frameloop:u,dpr:[1,i?1.5:2],flat:!0,gl:{alpha:!0,antialias:!i,powerPreference:i?"low-power":"high-performance"},camera:{fov:35,position:[0,0,9],near:.1,far:50},style:{position:"absolute",inset:0,pointerEvents:"none",touchAction:"auto"},children:(0,a.jsx)(v,{step:p,reducedMotion:l,lowPower:i})},i?"low":"full")})}])}]);