(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,69871,e=>{"use strict";var t=e.i(43476),r=e.i(75056),a=e.i(95393),i=e.i(90874),l=e.i(71645),o=e.i(90072),n=e.i(46459),s=e.i(33428);let u=2*n.DESIGN_HALF_W+.2,p=2*n.DESIGN_HALF_H,d=`
  attribute vec3 aColor;
  attribute float aAlpha;
  attribute float aSize;
  attribute float aShape;
  attribute float aMix;
  uniform float uScale;
  uniform float uMinPx;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vShape;
  varying float vMix;
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
    vMix = aMix;
  }
`,c=`
  varying vec3 vColor;
  varying float vAlpha;
  varying float vShape;
  varying float vMix;
  varying float vPx;
  float fill(float d, float edge, float aa) { return 1.0 - smoothstep(edge - aa, edge, d); }
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float aa = 2.4 / max(vPx, 1.0);
    float r = length(p);
    float dot = fill(r, 0.62, aa);
    float glyph;
    if (vShape < 0.5) {
      glyph = fill(r, 0.66, aa);
    } else if (vShape < 1.5) {
      glyph = fill(r, 0.92, aa) * (1.0 - fill(r, 0.58, aa));
    } else if (vShape < 2.5) {
      glyph = fill(abs(p.x) + abs(p.y), 0.92, aa);
    } else {
      vec2 q = vec2(p.x + p.y, p.x - p.y) * 0.70710678;
      float bar = min(abs(q.x), abs(q.y));
      glyph = fill(bar, 0.2, aa) * fill(max(abs(q.x), abs(q.y)), 0.95, aa);
    }
    float a = mix(dot, glyph, vMix) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`,f=`
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,h=`
  uniform vec3 uColor;
  uniform float uAlpha;
  void main() {
    gl_FragColor = vec4(uColor, uAlpha);
  }
`;function m({step:e,reducedMotion:r,lowPower:s}){let v=s?900:1800,y=(0,l.useMemo)(()=>(function(e){let t=(0,n.buildOwlModel)(e),r=t.n,a=new o.BufferGeometry,i=(e,t)=>{let r=new o.BufferAttribute(e,t);return r.setUsage(o.DynamicDrawUsage),r};a.setAttribute("position",i(new Float32Array(3*r),3)),a.setAttribute("aColor",i(new Float32Array(3*r),3)),a.setAttribute("aAlpha",i(new Float32Array(r),1)),a.setAttribute("aSize",i(new Float32Array(r),1)),a.setAttribute("aMix",i(new Float32Array(r),1));let l=new Float32Array(r);for(let e=0;e<r;e++)l[e]=t.kind[e];a.setAttribute("aShape",new o.BufferAttribute(l,1));let s=new o.BufferGeometry;s.setAttribute("position",i(new Float32Array(6*t.linkCount),3));let u=t.feed.length,p=n.OWL_LOOP_CHEVRONS.length/4,m=new Float32Array((u+p)*6);for(let e=0;e<p;e++){let t=(u+e)*6;m[t]=n.OWL_LOOP_CHEVRONS[4*e],m[t+1]=n.OWL_LOOP_CHEVRONS[4*e+1],m[t+3]=n.OWL_LOOP_CHEVRONS[4*e+2],m[t+4]=n.OWL_LOOP_CHEVRONS[4*e+3]}let v=new o.BufferGeometry;v.setAttribute("position",i(m,3));let y=new o.ShaderMaterial({vertexShader:d,fragmentShader:c,uniforms:{uScale:{value:100},uMinPx:{value:2}},transparent:!0,depthTest:!1,depthWrite:!1}),g=()=>new o.ShaderMaterial({vertexShader:f,fragmentShader:h,uniforms:{uColor:{value:new o.Vector3(1,1,1)},uAlpha:{value:0}},transparent:!0,depthTest:!1,depthWrite:!1}),x=g(),O=g();return{model:t,target:(0,n.allocTargets)(r),prevTargetX:new Float32Array(r),prevTargetY:new Float32Array(r),prevStep:-1,t:0,initialised:!1,link:[...n.OWL_LINK_STYLE[0]],guide:[...n.OWL_GUIDE_STYLE[0]],action:0,gate:{...n.OWL_GATE[0]},cam:{x:0,y:0},pointer:{x:0,y:0},geometry:a,lineGeometry:s,guideGeometry:v,pointsMaterial:y,linesMaterial:x,guideMaterial:O}})(v),[v]),g=(0,l.useRef)(y),x=(0,l.useRef)(e),O=(0,l.useRef)(!r),A=(0,l.useRef)(null),M=(0,l.useRef)(null),_=(0,l.useRef)(null),b=(0,l.useRef)(null),S=(0,l.useRef)(null),L=(0,l.useRef)(null),w=(0,l.useRef)(null),T=(0,l.useRef)(null),C=(0,l.useRef)(null),W=(0,i.useThree)(e=>e.invalidate),E=(0,i.useThree)(e=>e.viewport),j=(0,i.useThree)(e=>e.size);(0,l.useEffect)(()=>(g.current=y,()=>{y.geometry.dispose(),y.lineGeometry.dispose(),y.guideGeometry.dispose(),y.pointsMaterial.dispose(),y.linesMaterial.dispose(),y.guideMaterial.dispose()}),[y]),(0,l.useEffect)(()=>{x.current=Math.max(0,Math.min(n.OWL_STEP_COUNT-1,Math.round(e))),O.current=!r,W()},[e,r,W]),(0,l.useEffect)(()=>{if(r)return;let e=e=>{if("touch"===e.pointerType)return;let t=g.current.pointer;t.x=e.clientX/window.innerWidth*2-1,t.y=e.clientY/window.innerHeight*2-1};return window.addEventListener("pointermove",e,{passive:!0}),()=>window.removeEventListener("pointermove",e)},[r]);let G=Math.min(E.width/u,E.height/p);return(0,a.useFrame)((e,t)=>{let r=g.current,a=r.model,i=a.n,l=O.current,o=x.current,s=Math.min(t,.05);l&&(r.t+=s);let u=!l||!r.initialised;(0,n.computeTargets)(a,o,r.t,+!!l,r.target);let p=r.target,d=r.geometry,c=d.attributes.position.array,f=d.attributes.aColor.array,h=d.attributes.aAlpha.array,m=d.attributes.aSize.array,v=d.attributes.aMix.array,y=(0,n.isFlowState)(o)&&r.prevStep===o;for(let e=0;e<i;e++){let t=3*e,i=p.pos[t],l=p.pos[t+1],o=u?1:1-Math.exp(-s*a.rate[e]);if(y){let a=i-r.prevTargetX[e],o=l-r.prevTargetY[e];(Math.abs(a)>n.DESIGN_HALF_W||a*a+o*o>1)&&(c[t]=i,c[t+1]=l,c[t+2]=p.pos[t+2],h[e]=0)}r.prevTargetX[e]=i,r.prevTargetY[e]=l,c[t]+=(i-c[t])*o,c[t+1]+=(p.pos[t+1]-c[t+1])*o,c[t+2]+=(p.pos[t+2]-c[t+2])*o;let d=u?1:Math.min(1,1.3*o);f[t]+=(p.col[t]-f[t])*d,f[t+1]+=(p.col[t+1]-f[t+1])*d,f[t+2]+=(p.col[t+2]-f[t+2])*d,h[e]+=(p.alpha[e]-h[e])*d,m[e]+=(p.size[e]-m[e])*d,v[e]+=(p.mix[e]-v[e])*d}r.prevStep=o,d.attributes.position.needsUpdate=!0,d.attributes.aColor.needsUpdate=!0,d.attributes.aAlpha.needsUpdate=!0,d.attributes.aSize.needsUpdate=!0,d.attributes.aMix.needsUpdate=!0;let A=u?1:1-Math.exp(-(3.6*s)),W=n.OWL_LINK_STYLE[o];for(let e=0;e<4;e++)r.link[e]+=(W[e]-r.link[e])*A;let E=r.linesMaterial.uniforms;if(E.uColor.value.set(r.link[0],r.link[1],r.link[2]),E.uAlpha.value=r.link[3],r.link[3]>.002){let e=r.lineGeometry.attributes.position.array,t=a.links;for(let r=0;r<a.linkCount;r++){let a=3*t[2*r],i=3*t[2*r+1],l=6*r;e[l]=c[a],e[l+1]=c[a+1],e[l+2]=c[a+2],e[l+3]=c[i],e[l+4]=c[i+1],e[l+5]=c[i+2]}r.lineGeometry.attributes.position.needsUpdate=!0}let j=n.OWL_GUIDE_STYLE[o];for(let e=0;e<4;e++)r.guide[e]+=(j[e]-r.guide[e])*A;let P=r.guideMaterial.uniforms;if(P.uColor.value.set(r.guide[0],r.guide[1],r.guide[2]),P.uAlpha.value=r.guide[3],r.guide[3]>.002){let e=r.guideGeometry.attributes.position.array;for(let t=0;t<a.feed.length;t++){let r=3*a.feed[t],i=6*t;e[i]=c[r],e[i+1]=c[r+1],e[i+2]=c[r+2],e[i+3]=n.OWL_ACTION.x,e[i+4]=n.OWL_ACTION.y,e[i+5]=0}r.guideGeometry.attributes.position.needsUpdate=!0}r.action+=(n.OWL_ACTION.opacity[o]-r.action)*A;let R=S.current;R&&(R.visible=r.action>.01),L.current&&(L.current.opacity=r.action),w.current&&(w.current.opacity=r.action);let N=T.current;if(N&&C.current){let e=l?r.t/3.2%1:0;N.scale.setScalar(1+1.6*e),C.current.opacity=l?.5*r.action*(1-e):0}let I=n.OWL_GATE[o],F=r.gate;F.x+=(I.x-F.x)*A,F.y+=(I.y-F.y)*A,F.rotY+=(I.rotY-F.rotY)*A,F.scale+=(I.scale-F.scale)*A,F.opacity+=(I.opacity-F.opacity)*A;let U=M.current;U&&(U.position.set(F.x,F.y,0),U.rotation.set(0,F.rotY,0),U.scale.setScalar(F.scale),U.visible=F.opacity>.01),_.current&&(_.current.opacity=F.opacity),b.current&&(b.current.opacity=.35*F.opacity);let H=e.camera,k=l?.45*r.pointer.x:0,z=l?-(.3*r.pointer.y):0,B=u?1:1-Math.exp(-(2*s));r.cam.x+=(k-r.cam.x)*B,r.cam.y+=(z-r.cam.y)*B,H.position.set(r.cam.x,r.cam.y,9),H.lookAt(0,0,0);let Y=e.viewport.dpr,D=Math.min(1.45,Math.max(1,560/Math.max(Math.min(e.size.width,e.size.height),1))),X=r.pointsMaterial.uniforms;X.uScale.value=e.size.height*Y*G*D/(2*Math.tan(35*Math.PI/360)),X.uMinPx.value=2*Y,R&&R.scale.setScalar(D),r.initialised=!0}),(0,l.useEffect)(()=>{W()},[j.width,j.height,W]),(0,t.jsxs)("group",{ref:A,scale:G,children:[(0,t.jsx)("lineSegments",{geometry:y.lineGeometry,material:y.linesMaterial,frustumCulled:!1,renderOrder:1}),(0,t.jsx)("lineSegments",{geometry:y.guideGeometry,material:y.guideMaterial,frustumCulled:!1,renderOrder:1}),(0,t.jsxs)("group",{ref:S,position:[n.OWL_ACTION.x,n.OWL_ACTION.y,0],renderOrder:2,visible:!1,children:[(0,t.jsxs)("mesh",{renderOrder:2,children:[(0,t.jsx)("torusGeometry",{args:[n.OWL_ACTION.radius,.018,6,64]}),(0,t.jsx)("meshBasicMaterial",{ref:L,color:n.OWL_HEX.evidence,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1})]}),(0,t.jsxs)("mesh",{renderOrder:2,children:[(0,t.jsx)("circleGeometry",{args:[.4*n.OWL_ACTION.radius,32]}),(0,t.jsx)("meshBasicMaterial",{ref:w,color:n.OWL_HEX.evidence,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1})]}),(0,t.jsxs)("mesh",{ref:T,renderOrder:2,children:[(0,t.jsx)("torusGeometry",{args:[n.OWL_ACTION.radius,.007,4,64]}),(0,t.jsx)("meshBasicMaterial",{ref:C,color:n.OWL_HEX.evidence,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1})]})]}),(0,t.jsxs)("group",{ref:M,renderOrder:2,visible:!1,children:[(0,t.jsxs)("mesh",{renderOrder:2,children:[(0,t.jsx)("torusGeometry",{args:[n.OWL_GATE_RADIUS,.014,6,180]}),(0,t.jsx)("meshBasicMaterial",{ref:_,color:n.OWL_HEX.trusted,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1})]}),(0,t.jsxs)("mesh",{renderOrder:2,children:[(0,t.jsx)("torusGeometry",{args:[n.OWL_GATE_RADIUS+.1,.006,4,180]}),(0,t.jsx)("meshBasicMaterial",{ref:b,color:n.OWL_HEX.trusted,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1})]})]}),(0,t.jsx)("points",{geometry:y.geometry,material:y.pointsMaterial,frustumCulled:!1,renderOrder:3})]})}e.s(["default",0,function({step:e,reducedMotion:a,lowPower:i,visible:l}){let o=Math.max(0,Math.min(n.OWL_STEP_COUNT-1,Math.round(e)));return(0,t.jsxs)("div",{style:{position:"absolute",inset:0,pointerEvents:"none"},children:[(0,t.jsx)(r.Canvas,{"aria-hidden":!0,frameloop:l?a?"demand":"always":"never",dpr:[1,i?1.5:2],flat:!0,gl:{alpha:!0,antialias:!i,powerPreference:i?"low-power":"high-performance"},camera:{fov:35,position:[0,0,9],near:.1,far:50},style:{position:"absolute",inset:0,pointerEvents:"none",touchAction:"auto"},children:(0,t.jsx)(m,{step:e,reducedMotion:a,lowPower:i})},i?"low":"full"),(0,t.jsx)(s.OwlLabels,{step:o,boxW:u,boxH:p})]})}])}]);