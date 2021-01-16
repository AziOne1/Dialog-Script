plugin=this,function(t,e){for(var n in e)t[n]=e[n];e.__esModule&&Object.defineProperty(t,"__esModule",{value:!0})}(this,function(){"use strict";var t={551:function(t,e,n){n.r(e),Math.PI,Math.PI;var i,r=Math.pow,a=(Math.sin,Math.cos,Math.sqrt,Math.PI,function(t){return t}),o=function(t){return 1-r(1-t,3)},s=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),l=GL11.glPushMatrix,h=GL11.glPopMatrix,u=GL11.glTranslatef,c=GL11.glRotatef,f=GL11.glScalef,d=(GL11.glDepthMask,GL11.glColor4f),v={x:.5,y:.5},g={x:1,y:.5},p={x:.5,y:0},y={x:.5,y:1},b={x:0,y:0},w=function(){function t(t){this.value=t,this.started=0,this.duration=0,this.fromValue=0,this.toValue=0,this.easer=a,this.onFinish=null,this.toValue=t}return t.prototype.transit=function(t,e,n,i){this.fromValue=this.value,this.toValue=t,this.started=x(),this.duration=e,this.easer=n,this.onFinish=i},t.prototype.update=function(t){if(this.started){var e=(t-this.started)/this.duration;if(e>1){this.value=this.toValue,this.started=0;var n=this.onFinish;this.onFinish=null,null!=n&&n()}else e=this.easer(e),this.value=this.fromValue+(this.toValue-this.fromValue)*e}},t}();function x(){return System.currentTimeMillis()}var k=function(){function t(t){this.x=new w(t.x||0),this.y=new w(t.y||0),this.z=new w(t.z||0);var e=t.color||{};this.a=new w(null==e.a?1:e.a),this.r=new w(null==e.r?0:e.r),this.g=new w(null==e.g?0:e.g),this.b=new w(null==e.b?0:e.b),this.scale=new w(null==t.scale?1:t.scale);var n=t.align||{x:0,y:0};this.alignX=new w(n.x||0),this.alignY=new w(n.y||0);var i=t.origin||{x:0,y:0};this.originX=new w(i.x||0),this.originY=new w(i.y||0),this.rotationX=new w(t.rotationX||0),this.rotationY=new w(t.rotationY||0),this.rotationZ=new w(t.rotationZ||0),this.enabled=null==t.enabled||t.enabled,this.noDepth=!!t.noDepth,this.animatables=[this.x,this.y,this.z,this.a,this.r,this.g,this.b,this.scale,this.rotationX,this.rotationY,this.rotationZ,this.alignX,this.alignY,this.originX,this.originY]}return t.prototype.prepare=function(t,e,n,i,r){var a,o,s,l;this.enabled&&(this.updateAnimatables(t),this.prepareAlign(e,n),this.prepareRotation(),this.prepareOffset(),this.prepareScale(),this.prepareOrigin(i,r),this.lastColor=(a=this.a.value,o=this.r.value,s=this.g.value,l=this.b.value,255*a<<24|255*o<<16|255*s<<8|255*l))},t.prototype.updateAnimatables=function(t){for(var e=this.animatables,n=0;n<e.length;n++){var i=e[n];i.started&&i.update(t)}},t.prototype.prepareAlign=function(t,e){(this.alignX.value||this.alignY.value)&&u(t*this.alignX.value,e*this.alignY.value,0)},t.prototype.prepareRotation=function(){this.rotationX.value&&c(this.rotationX.value,1,0,0),this.rotationY.value&&c(this.rotationY.value,0,1,0),this.rotationZ.value&&c(this.rotationZ.value,0,0,1)},t.prototype.prepareOffset=function(){(this.x.value||this.y.value||this.z.value)&&u(this.x.value,this.y.value,0)},t.prototype.prepareScale=function(){1!=this.scale.value&&f(this.scale.value,this.scale.value,this.scale.value)},t.prototype.prepareOrigin=function(t,e){(this.originX.value||this.originY.value)&&u(-t*this.originX.value,-e*this.originY.value,0)},t}();function S(t){return new m(t)}var m=function(t){function e(e){var n=t.call(this,e)||this;return n.text=e.text||"",n.shadow=!!e.shadow,n.autoFit=!!e.autoFit,n}return s(e,t),e.prototype.render=function(e,n,i){if(this.enabled){var r=Draw.getStringWidth(this.text);if(r&&this.autoFit){var a=(n-2)/r;a<1&&(this.scale.value=a)}l(),t.prototype.prepare.call(this,e,n,i,r,9),this.scale.value&&Draw.drawString(this.text,0,fontRenderer.getUnicodeFlag()?0:1,-1,this.shadow),h()}},e.prototype.checkHovered=function(t,e,n){},e}(k);function _(t){return new Y(t)}var Y=function(t){function e(e){var n=t.call(this,e)||this;return n.hovered=!1,n.width=new w(e.width||0),n.height=new w(e.height||0),n.children=e.children||[],n.texture=e.texture||null,n.onLeftClick=e.onLeftClick||null,n.onRightClick=e.onRightClick||null,n.onHover=e.onHover||null,n.uMin=e.uMin||0,n.vMin=e.vMin||0,n.uDelta=e.uDelta||256,n.vDelta=e.vDelta||256,n.textureWidth=e.textureWidth||256,n.textureHeight=e.textureHeight||256,n.temp_magic=!!e.temp_magic,n.beforeRender=e.beforeRender||null,n.afterRender=e.afterRender||null,n}return s(e,t),e.prototype.render=function(e,n,i){if(this.enabled){this.width.update(e),this.height.update(e);var r=this.width.value,a=this.height.value;l(),t.prototype.prepare.call(this,e,n,i,r,a),this.render0(r,a),u(0,0,.01);for(var o=0;o<this.children.length;o++)this.children[o].render(e,r,a);h()}},e.prototype.render0=function(t,e){this.scale.value&&(this.beforeRender&&this.beforeRender(),this.texture?(GlStateManager.enableBlend(),Textures.bindTexture(this.texture),d(this.a.value,this.r.value,this.g.value,this.b.value),Draw.drawScaledCustomSizeModalRect(0,0,this.uMin,this.vMin,this.uDelta,this.vDelta,t,e,this.textureWidth,this.textureHeight)):Draw.drawRect(0,0,t,e,this.lastColor),this.afterRender&&this.afterRender())},e.prototype.checkHovered=function(t,e,n){if(this.enabled){var i=this.originX.value,r=this.originY.value,a=this.alignX.value,o=this.alignY.value,s=this.width.value,l=this.height.value,h=this.scale.value,u=this.x.value,c=this.y.value;t.stackX+=e*a*t.stackScale,t.stackY+=n*o*t.stackScale,t.stackX+=u*t.stackScale,t.stackY+=c*t.stackScale,t.stackScale*=h,t.stackX-=s*i*t.stackScale,t.stackY-=l*r*t.stackScale;var f=t.mouseX-t.stackX,d=t.mouseY-t.stackY,v=f>=0&&f<s*t.stackScale&&d>=0&&d<l*t.stackScale;this.hovered!=v&&this.onHover&&this.onHover(t,v),this.hovered=v,this.hovered&&(t.leftClick&&this.onLeftClick&&this.onLeftClick(t),t.rightClick&&this.onRightClick&&this.onRightClick(t));for(var g=0,p=this.children;g<p.length;g++)p[g].checkHovered(t,e,n);t.stackX+=s*i*t.stackScale,t.stackY+=l*r*t.stackScale,t.stackScale/=h,t.stackX-=u*t.stackScale,t.stackY-=c*t.stackScale,t.stackX-=e*a*t.stackScale,t.stackY-=n*o*t.stackScale}},e}(k);function X(){var t=Draw.getResolution().getScaleFactor(),e=Display.getWidth()/t,n=Display.getHeight()/t,i=Mouse.getX()/t,r=n-Mouse.getY()/t,a=Mouse.isButtonDown(0),o=Mouse.isButtonDown(1);return{factor:t,width:e,height:n,mouseX:i,mouseY:r,time:x(),leftClick:a,rightClick:o,stackX:0,stackY:0,stackScale:1}}!function(t){function e(e){var n=t.call(this,e)||this;return n.item=e.item,n}s(e,t),e.prototype.render=function(e,n,i){this.enabled&&(l(),RenderHelper.enableGUIStandardItemLighting(),t.prototype.prepare.call(this,e,n,i,16,16),Draw.renderItemAndEffectIntoGUI(this.item,0,0),RenderHelper.disableStandardItemLighting(),h())},e.prototype.checkHovered=function(t,e,n){}}(k);var R=[];Events.on(plugin,"gui_overlay_render",(function(t){var e=X();u(0,0,0);for(var n=0,i=R;n<i.length;n++)i[n].render(e.time,e.width,e.height);u(0,0,-0)})),Events.on(plugin,"game_loop",(function(t){for(var e=X(),n=0,i=R;n<i.length;n++)i[n].checkHovered(e,e.width,e.height)})),function(t){var e=-1;function n(t){stdout.println(t)}var i=function(){function t(t){this.type="open_screen",this.screen=t}return t.prototype.do=function(){q(this.screen)},t.parse=function(e){var i=e.screen;if(!i)return n("Action's screen is not set!"),null;var r=d(i);return r?new t(r):(n("Action's screen is not correct!"),null)},t}(),r=function(){function t(t){this.type="command_action",this.command=t}return t.prototype.do=function(){ChatExtensions.sendChatMessage(this.command)},t.parse=function(e){var i=e.command;return i?new t(i):(n("Action's command is not set!"),null)},t}(),s=function(){function t(){this.type="previous_screen"}return t.prototype.do=function(){q(m.pop())},t}(),l=function(){function t(){this.type="close"}return t.prototype.do=function(){J(x)},t}(),h=function(t,e){this.text=t,this.actions=e},u=function(t,e){this.text=t,this.buttons=e},c=function(t,e,n,i){this.id=t,this.title=e,this.subtitle=n,this.screen=i};function f(t){var e=t.id;if(!e)return n('"id" field of entrypoint is not set!'),null;var i=t.title;if(!i)return n('"title" field of '+e+" entrypoint is not set!"),null;var r=t.subtitle,a=t.screen;if(!a)return n('"screen" field of '+e+" entrypoint is not set!"),null;var o=d(a);return a?new c(e,i,r,o):(n("Screen data of "+e+" entrypoint is not correct!"),null)}function d(t){var e=t.text;if(!e)return n('"text" field of the screen is not set!'),null;var i=t.buttons;if(!i)return n('"buttons" field of the screen is not set!'),null;for(var r=[],a=0,o=i;a<o.length;a++){var s=w(o[a]);s&&r.push(s)}return 0==r.length?(n("No one correct button data in the screen's json!"),null):new u(e,r)}function w(t){var e=t.text;if(!e)return n('"text" field of the button is not set!'),null;var a=t.actions;if(!a)return n('"actions" field of the button is not set!'),null;for(var o=[],u=0,c=a;u<c.length;u++){var f=c[u],d=f.type,v=void 0;switch(d){case"open_screen":v=i.parse(f);break;case"command":v=r.parse(f);break;case"previous_screen":v=new s;break;case"close":v=new l;break;default:n("Unknown action type: "+d)}if(!v)return n("Action of the button is not correct!"),null;o.push(v)}return new h(e,o)}new c("test","§6Тайлт","Сабтайтл",new u(["§6~~~ §fЭто первый экран §6~~~","Тыкай на кнопки, пока §6тыкалка есть §f㬂","§aА ещё у нас есть вкусное печенье!"],[new h("§6G §f| Команда /help",[new r("help")]),new h("§6Y §f| 㨺 Открыть другое меню",[new i(new u(["Тут всего одна строка текста 㬗"],[new h("§6G §f| Закрыть меню",[new l])]))]),new h("§6Z §f| 䂄 Закрыть",[new l])]));var x,k,m,Y,X,M=[],E=!1;PluginMessages.on(t,"dialog-screen",(function(t){var i,r=UtilNetty.readString(t,16);switch(r.toLowerCase()){case"load":var a=UtilNetty.readString(t,16384),o=JSON.parse(a),s=[];if(null!=o.entrypoints)for(var l=0,h=o.entrypoints;l<h.length;l++){var u=h[l],c=f(u),d=u.id;c?s.push(c):n(d?"Entrypoint "+d+" is not correct!":"Entrypoint without id is not correct!")}M=s;break;case"open":n("Opening "+(d=UtilNetty.readString(t,64))+" entrypoint..");for(var v=!1,g=0,p=M;g<p.length;g++){var y=p[g];y.id==d&&(v=!0,H=0,x=i=y,k=i.screen,E=!0,m=[],e=0,j())}v||n("Entrypoint "+d+" is not exists!");break;case"close":n("Closing "+(d=UtilNetty.readString(t,64))+" entrypoint.."),v=!1;for(var b=0,w=M;b<w.length;b++){var S=w[b];S.id==d&&(v=!0,J(S))}v||n("Entrypoint "+d+" is not exists!");break;default:n("Unknown action: "+r)}})),Events.on(t,"key_press",(function(t){for(var e in N)if(t.key==N[e])return B(k.buttons[e]),void n(k.buttons[e]+" "+e);switch(t.key){case Keyboard.KEY_UP:K(1);break;case Keyboard.KEY_DOWN:K(-1);break;case Keyboard.KEY_RETURN:D()}}));var C=!1;function D(){if(C){C=!1,A.rotationZ.transit(0,-1,a);for(var t=0,n=U.children;t<n.length;t++){var i=n[t];i.rotationZ.transit(0,-1,a),i.scale.value=1}return P.alignX.transit(.5,300,o),O.x.transit(-10,100,a),void z.x.transit(-10,100,a)}B(k.buttons[e])}var H=0;function G(){for(var t=0,e=0,n=0,i=L.children;n<i.length;n++)i[n],(e=fontRenderer.getStringWidth(T(k.buttons[t].text,t)))>H&&(H=e),t++;return H}function K(t){(e+=t)<0&&(e=k.buttons.length-1),e>=k.buttons.length&&(e=0);for(var n=0,i=0,r=k.buttons;i<r.length;i++){var a=r[i];L.children[n].text=T(a.text,n),L.children[n].x.value=0,L.children[n].x.value=(H-fontRenderer.getStringWidth(T(k.buttons[n].text,n)))/2+.2,z.children[n].enabled=!0,n++}O.y.transit(e*I+5*e,300,o),z.children[e].enabled=!1,O.width.value=H+19}var L=_({}),O=_({z:-9,height:15,x:1,color:{a:1,r:42/255,g:.4,b:189/255}}),z=_({x:1,z:-10}),P=_({z:-10,align:g,children:[O,z,L]}),W=S({z:-9,origin:p,align:p,scale:1.4,color:{a:1,r:1,g:195/255,b:0},y:7.02}),Z=S({z:-9,origin:p,align:p,scale:.9,color:{a:1,r:213/255,g:202/255,b:141/255},y:21.06}),U=_({origin:b,align:b,y:32}),A=_({z:-9,width:Y,height:55,color:{a:.62,r:0,g:0,b:0},y:10,origin:y,align:y,children:[W,Z,U]}),F=_({width:Y,height:.33,color:{a:0,r:0,g:0,b:0},enabled:E,origin:y,align:y,children:[P,A]});R.push(F);var I=15,V=["G","Y","Z","X"],N=[Keyboard.KEY_G,Keyboard.KEY_Y,Keyboard.KEY_Z,Keyboard.KEY_X];function T(t,e){return V[e]+"§f | "+t}function j(){if(Y=minecraft.getResolution().getScaledWidth(),X=minecraft.getResolution().getScaledHeight(),U.width.value=Y,A.width.value=Y,F.width.value=Y,F.height.value=X,F.enabled=E,x&&k){U.children=[];for(var t=0,e=0,i=0,r=0,s=0,l=0,h=k.text;l<h.length;l++)for(var u=h[l].split(" "),c="";u.length;){for(var f=0,d=[];f<.8*Y&&u.length;){c&&(c+=" ");var g=u.shift();d.push(S({text:g,x:fontRenderer.getStringWidth(c)+fontRenderer.getStringWidth(g)/2,y:10*t,origin:p,align:p})),c+=g,f=fontRenderer.getStringWidth(c)}c="",t++;for(var y=function(t){U.children.push(t),t.x.value-=f/2,t.scale.value=1e-4,e++,i+=t.text.length,s=60*e+40*r,t.rotationZ.transit(0,s,a,(function(){t.scale.value=1})),t.text.match(/[,\.?!]/)&&(r+=i,i=0)},b=0,w=d;b<w.length;b++)y(w[b])}var m;C=!0,A.rotationZ.transit(0,s,a,(function(){D()})),A.height.transit(10*t+64,300,o),n(X.toString()),m=10*t+64,W.text=x.title,x.subtitle&&(Z.text=x.subtitle),L.children=[],z.children=[];for(var R=0,M=0,H=k.buttons;M<H.length;M++){var O=H[M],V=S({align:v,text:T(O.text,R),y:I*R+3+5*R});L.children.push(V);var N=_({z:-99,height:15,align:v,y:I*R+3+5*R,color:{a:100/255,r:0,g:0,b:0}});N.y.transit(R*I+5*R,300,o),N.width.value=G()+19,z.children.push(N),R++}P.y.value=-R*I+.25*(X-m),K(0)}}function B(t){if(t)for(var e=0,n=t.actions;e<n.length;e++)n[e].do()}function q(t){H=0,m.push(k),k=t,E=!0,e=0,j()}function J(t){P.alignX.value=0,O.x.value=1,z.x.value=1,x=t,t.screen=void 0,t.screen||(E=!1),e=-1,A.height.value=0,P.alignX.value=1,j()}Events.on(t,"hotbar_render",(function(t){return t.cancelled=E})),Events.on(t,"hunger_render",(function(t){return t.cancelled=E})),Events.on(t,"exp_render",(function(t){return t.cancelled=E})),Events.on(t,"armor_render",(function(t){return t.cancelled=E})),Events.on(t,"health_render",(function(t){return t.cancelled=E}))}(plugin)}},e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={exports:{}};return t[i](r,r.exports,n),r.exports}return n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(551)}());