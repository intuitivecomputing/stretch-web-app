"use strict";(self["webpackChunkstretch_ui"]=self["webpackChunkstretch_ui"]||[]).push([[800],{29378:(e,o,n)=>{n.d(o,{_7:()=>s,Cw:()=>r,Ws:()=>a,bW:()=>c,Qu:()=>l,Do:()=>i,W7:()=>d,TP:()=>m,uH:()=>_,sc:()=>w,TW:()=>S,hb:()=>h,Fw:()=>b,cf:()=>y});n(8858);var t=n(61959);const s=(0,t.qj)({ros:new ROSLIB.Ros,connected:!1});function r(e){s.ros.connect(e),s.ros.on("connection",(()=>{s.connected=!0,console.log("ROS Connected!")})),s.ros.on("error",(e=>{console.log("Error connecting to websocket server: ",e)})),s.ros.on("close",(()=>{s.connected=!1,console.log("Connection to websocket server closed.")}))}const a=()=>{s.ros.close(),s.connected=!1};function c(e,o){return new ROSLIB.Topic({ros:s.ros,name:e,messageType:o})}const l=(0,t.qj)({jointState:null,stateTopic:new ROSLIB.Topic({ros:s.ros,name:"/state_machine/smach/container_status",messageType:"smach_msgs/SmachContainerStatus"}),jointStateTopic:new ROSLIB.Topic({ros:s.ros,name:"/stretch/joint_states/",messageType:"sensor_msgs/JointState"}),orderTopic:new ROSLIB.Topic({ros:s.ros,name:"/sp_sm/post_orders",messageType:"std_msgs/Int16MultiArray"}),cmdVelTopic:new ROSLIB.Topic({ros:s.ros,name:"/stretch/cmd_vel",messageType:"geometry_msgs/Twist"}),calibrateClient:new ROSLIB.Service({ros:s.ros,name:"/calibrate_the_robot",serviceType:"std_srvs/Trigger"}),magnetClient:new ROSLIB.Service({ros:s.ros,name:"/magnet_toggle",serviceType:"std_srvs/Trigger"}),startClient:new ROSLIB.Service({ros:s.ros,name:"/sp_sm/start",serviceType:"std_srvs/Trigger"}),clearClient:new ROSLIB.Service({ros:s.ros,name:"/sp_sm/clear_orders",serviceType:"std_srvs/Trigger"}),switchToNavClient:new ROSLIB.Service({ros:s.ros,name:"/switch_to_navigation_mode",serviceType:"std_srvs/Trigger"}),switchToPosClient:new ROSLIB.Service({ros:s.ros,name:"/switch_to_position_mode",serviceType:"std_srvs/Trigger"}),runstopClient:new ROSLIB.Service({ros:s.ros,name:"/runstop",serviceType:"std_srvs/SetBool"}),trajectoryClient:new ROSLIB.ActionClient({ros:s.ros,serverName:"/stretch_controller/follow_joint_trajectory",actionName:"control_msgs/FollowJointTrajectoryAction"})});function i(e){var o=new ROSLIB.ServiceRequest({data:e});l.runstopClient.callService(o,(function(e){console.log("Result for service call on "+l.runstopClient.name+": "+e.success+" - "+e.message)}))}function u(e){var o=new ROSLIB.ServiceRequest({});e.callService(o,(function(o){console.log("Result for service call on "+e.name+": "+o.success+" - "+o.message)}))}function d(e){var o=new ROSLIB.Service({ros:s.ros,name:e,serviceType:"std_srvs/Empty"});u(o)}function m(e){var o=new ROSLIB.Service({ros:s.ros,name:e,serviceType:"std_srvs/Trigger"});u(o)}function p(e){var o="{";for(var n in e)o=o+String(n)+":"+String(e[n])+", ";o+="}",console.log("generatePoseGoal( "+o+" )");var t=[],s=[];for(var n in e)t.push(n),s.push(e[n]);var r=new ROSLIB.Goal({actionClient:l.trajectoryClient,goalMessage:{trajectory:{header:{stamp:{secs:0,nsecs:0}},joint_names:t,points:[{positions:s,time_from_start:{secs:0,nsecs:1}}]}}});return console.log("newGoal created ="+r),r.on("feedback",(function(e){console.log("Feedback: "+e.sequence)})),r.on("result",(function(e){console.log("Final Result: "+e.sequence)})),r}function v(e,o){var n=e.name.indexOf(o);return e.position[n]}function g(e){return v(l.jointState,e)}function _(e){console.log("sending baseTranslate command");var o=p({translate_mobile_base:e});o.send()}function w(e){console.log("sending baseTurn command");var o=p({rotate_mobile_base:3.14*e/180});o.send()}function S(e){e?p({gripper_aperture:0}).send():p({gripper_aperture:.125}).send()}function f(e,o){if(console.log("sendIncrementalMove start: jointName ="+e),null!==l.jointState){var n=g(e);console.log(n),n+=o,console.log("poseGoal call: jointName ="+e);var t={[e]:n},s=p(t);return s.send(),!0}return!1}function h(e){console.log("attempting to sendarmMove command"),f("wrist_extension",e)}function b(e){console.log("attempting to sendliftMove command"),f("joint_lift",e)}function y(e){console.log("attempting to send wristMove command"),f("joint_wrist_yaw",3.14*e/180)}l.jointStateTopic.subscribe((function(e){null===l.jointState&&console.log("Received first joint state from ROS"),l.jointState=e}))},72012:(e,o,n)=>{n.d(o,{Z:()=>u});var t=n(83673),s=n(29378),r=n(61959);const a={id:"video-container"},c={props:{srcTopic:{type:String,required:!0},rotate:{type:Number,default:0}},setup(e){const o=e,{srcTopic:n,rotate:c}=(0,r.BK)(o),l=(0,r.iH)(null);let i;const u=(0,r.Fl)((()=>(0,s.bW)(n.value+"/compressed","sensor_msgs/CompressedImage")));function d(e){var o=Math.PI/180*e;if(0!=i.width&&0!=i.height){var n=Math.abs(Math.sin(o)),t=Math.abs(Math.cos(o)),s=i.width,r=i.height;console.log("Image size: "+s+"x"+r);var a=n*r+t*s,c=t*r+n*s;l.value.setAttribute("width",a),l.value.setAttribute("height",c);var u=l.value.getContext("2d");u.save(),u.translate(a/2,c/2),u.rotate(o),u.drawImage(i,-s/2,-r/2,s,r),u.restore()}}return(0,t.bv)((()=>{u.value.subscribe((function(e){i=new Image,i.src="data:image/jpg;base64,"+e.data,i.onload=function(){i.decode().then((()=>{d(o.rotate)}))}}))})),(e,o)=>((0,t.wg)(),(0,t.iD)("div",a,[(0,t._)("canvas",{class:"canvas",ref:(e,o)=>{o["canvas"]=e,l.value=e}},null,512),(0,t.WI)(e.$slots,"default")]))}};var l=n(74260);const i=(0,l.Z)(c,[["__scopeId","data-v-767f8338"]]),u=i},11800:(e,o,n)=>{n.r(o),n.d(o,{default:()=>q});var t=n(83673),s=n(61959),r=n(62323),a=n(29378);n(72012);const c=e=>((0,t.dD)("data-v-6360e641"),e=e(),(0,t.Cn)(),e),l={class:"q-pa-md"},i={class:"q-gutter-sm"},u=c((()=>(0,t._)("div",null,[(0,t.Uk)("Task: "),(0,t._)("strong",null,"current")],-1))),d=(0,t.Uk)(" Facial expression: "),m={class:"row justify-start"},p={class:"col"},v=(0,t.Uk)(" Voice Command "),g=(0,t.Uk)("Voice"),_={class:"col"},w=(0,t.Uk)(" Machine-like Voice Command "),S=(0,t.Uk)("Machine Voice"),f=c((()=>(0,t._)("div",null,[(0,t._)("iframe",{width:"400",height:"250",src:"https://vclock.com/embed/timer/#countdown=00:00:10&enabled=0&seconds=10&onzero=1&theme=1&ampm=1&sound=xylophone",frameborder:"0",allowfullscreen:""})],-1))),h={setup(e){const o=["focused","confused","happy"],n=(0,s.iH)("None"),c=((0,s.iH)("/camera/color/image_raw"),(0,s.iH)(90),(0,s.iH)("")),h=(0,s.iH)(""),b=["Hello, my name is Stretch.","In a minute.","Hi.","You should sort this by shape.","You should sort this by color.","You should sort this by number.","By shape.","By color.","By number.","You are welcome.","No problem.","Nice to meet you.","Nice to meet you too.","I'm not sure.","Would you excuse me for a moment?","Yes, how can I help you?","Sorry, I don't know.","Good job.","Nice work.","Well done."],y=["Hi.","Hello","Shape","Color","Number","You are welcome.","Occupied.","I don't know."];var T=new ROSLIB.Topic({ros:a._7.ros,name:"/robot_face/express",messageType:"std_msgs/String"}),I=new ROSLIB.Service({ros:a._7.ros,name:"/tts",serviceType:"sp_msgs/Speech"}),k=new ROSLIB.Service({ros:a._7.ros,name:"/tts_machine",serviceType:"sp_msgs/Speech"});function C(e){var o=new ROSLIB.Message({data:e});T.publish(o),n.value=e}function R(e,o){var n=new ROSLIB.ServiceRequest({data:o});e.callService(n,(function(o){console.log("Result for service call on "+e.name+": "+o.success+" - "+o.message)}))}return(e,T)=>{const B=(0,t.up)("q-btn"),W=(0,t.up)("q-btn-group"),O=(0,t.up)("q-item-label"),j=(0,t.up)("q-item-section"),L=(0,t.up)("q-item"),U=(0,t.up)("q-input"),q=(0,t.up)("q-list"),H=(0,t.up)("q-page"),M=(0,t.Q2)("ripple");return(0,t.wg)(),(0,t.j4)(H,{padding:""},{default:(0,t.w5)((()=>[(0,t._)("div",l,[(0,t._)("div",i,[u,(0,t.Wm)(W,{rounded:""},{default:(0,t.w5)((()=>[(0,t.Wm)(B,{rounded:"",color:"primary",label:"Toggle Task",onClick:T[0]||(T[0]=()=>{(0,s.SU)(a.TP)("/clean_surface/trigger_clean_surface")})}),(0,t.Wm)(B,{rounded:"",color:"secondary",label:"Stow",onClick:T[1]||(T[1]=()=>{(0,s.SU)(a.TP)("/robot/stow")})}),(0,t.Wm)(B,{rounded:"",color:"warning",label:"Rest",onClick:T[2]||(T[2]=()=>{(0,s.SU)(a.TP)("/robot/rest")})})])),_:1}),(0,t.Wm)(W,{rounded:""},{default:(0,t.w5)((()=>[(0,t.Wm)(B,{rounded:"",color:"red",label:"Stop",onClick:T[3]||(T[3]=()=>{(0,s.SU)(a.Do)(!0)})}),(0,t.Wm)(B,{rounded:"",color:"green",label:"Run",onClick:T[4]||(T[4]=()=>{(0,s.SU)(a.Do)(!1)})})])),_:1}),(0,t._)("div",null,[d,(0,t._)("strong",null,(0,r.zw)(n.value),1)]),(0,t.Wm)(W,{outline:"",rounded:""},{default:(0,t.w5)((()=>[((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(o,((e,o)=>(0,t.Wm)(B,{key:o,outline:"",color:"primary",onClick:()=>{C(e)},label:e},null,8,["onClick","label"]))),64))])),_:1}),(0,t._)("div",m,[(0,t._)("div",p,[v,(0,t.Wm)(q,{bordered:"",separator:"",style:{"max-width":"350px"}},{default:(0,t.w5)((()=>[((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(b,((e,o)=>(0,t.wy)((0,t.Wm)(L,{key:o,clickable:""},{default:(0,t.w5)((()=>[(0,t.Wm)(j,{onClick:()=>{R((0,s.SU)(I),e)}},{default:(0,t.w5)((()=>[(0,t.Wm)(O,{overline:""},{default:(0,t.w5)((()=>[g])),_:1}),(0,t.Wm)(O,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,r.zw)(e),1)])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1536),[[M]]))),64)),(0,t.Wm)(U,{outlined:"",dense:"",modelValue:c.value,"onUpdate:modelValue":T[6]||(T[6]=e=>c.value=e)},{append:(0,t.w5)((()=>[(0,t.Wm)(B,{round:"",dense:"",color:"primary",icon:"mic",onClick:T[5]||(T[5]=()=>{R((0,s.SU)(I),c.value)})})])),_:1},8,["modelValue"])])),_:1})]),(0,t._)("div",_,[w,(0,t.Wm)(q,{bordered:"",separator:"",style:{"max-width":"350px"}},{default:(0,t.w5)((()=>[((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(y,((e,o)=>(0,t.wy)((0,t.Wm)(L,{key:o,clickable:""},{default:(0,t.w5)((()=>[(0,t.Wm)(j,{onClick:()=>{R((0,s.SU)(k),e)}},{default:(0,t.w5)((()=>[(0,t.Wm)(O,{overline:""},{default:(0,t.w5)((()=>[S])),_:1}),(0,t.Wm)(O,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,r.zw)(e),1)])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1536),[[M]]))),64)),(0,t.Wm)(U,{outlined:"",dense:"",modelValue:h.value,"onUpdate:modelValue":T[8]||(T[8]=e=>h.value=e)},{append:(0,t.w5)((()=>[(0,t.Wm)(B,{round:"",dense:"",color:"primary",icon:"mic",onClick:T[7]||(T[7]=()=>{R((0,s.SU)(k),h.value)})})])),_:1},8,["modelValue"])])),_:1})])]),f])])])),_:1})}}};var b=n(74260),y=n(24379),T=n(61206),I=n(36375),k=n(48240),C=n(27011),R=n(83414),B=n(52035),W=n(2350),O=n(46489),j=n(7518),L=n.n(j);const U=(0,b.Z)(h,[["__scopeId","data-v-6360e641"]]),q=U;L()(h,"components",{QPage:y.Z,QInput:T.Z,QBtnGroup:I.Z,QBtn:k.Z,QList:C.Z,QItem:R.Z,QItemSection:B.Z,QItemLabel:W.Z}),L()(h,"directives",{Ripple:O.Z})}}]);