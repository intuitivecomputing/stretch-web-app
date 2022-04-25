"use strict";(self["webpackChunkstretch_ui"]=self["webpackChunkstretch_ui"]||[]).push([[472],{29378:(e,o,t)=>{t.d(o,{_7:()=>s,Cw:()=>r,Ws:()=>a,bW:()=>i,Qu:()=>c,Do:()=>l,W7:()=>d,TP:()=>m,uH:()=>f,sc:()=>_,TW:()=>S,hb:()=>y,Fw:()=>T,cf:()=>b});t(8858);var n=t(61959);const s=(0,n.qj)({ros:new ROSLIB.Ros,connected:!1});function r(e){s.ros.connect(e),s.ros.on("connection",(()=>{s.connected=!0,console.log("ROS Connected!")})),s.ros.on("error",(e=>{console.log("Error connecting to websocket server: ",e)})),s.ros.on("close",(()=>{s.connected=!1,console.log("Connection to websocket server closed.")}))}const a=()=>{s.ros.close(),s.connected=!1};function i(e,o){return new ROSLIB.Topic({ros:s.ros,name:e,messageType:o})}const c=(0,n.qj)({jointState:null,stateTopic:new ROSLIB.Topic({ros:s.ros,name:"/state_machine/smach/container_status",messageType:"smach_msgs/SmachContainerStatus"}),jointStateTopic:new ROSLIB.Topic({ros:s.ros,name:"/stretch/joint_states/",messageType:"sensor_msgs/JointState"}),orderTopic:new ROSLIB.Topic({ros:s.ros,name:"/sp_sm/post_orders",messageType:"std_msgs/Int16MultiArray"}),cmdVelTopic:new ROSLIB.Topic({ros:s.ros,name:"/stretch/cmd_vel",messageType:"geometry_msgs/Twist"}),calibrateClient:new ROSLIB.Service({ros:s.ros,name:"/calibrate_the_robot",serviceType:"std_srvs/Trigger"}),magnetClient:new ROSLIB.Service({ros:s.ros,name:"/magnet_toggle",serviceType:"std_srvs/Trigger"}),startClient:new ROSLIB.Service({ros:s.ros,name:"/sp_sm/start",serviceType:"std_srvs/Trigger"}),clearClient:new ROSLIB.Service({ros:s.ros,name:"/sp_sm/clear_orders",serviceType:"std_srvs/Trigger"}),switchToNavClient:new ROSLIB.Service({ros:s.ros,name:"/switch_to_navigation_mode",serviceType:"std_srvs/Trigger"}),switchToPosClient:new ROSLIB.Service({ros:s.ros,name:"/switch_to_position_mode",serviceType:"std_srvs/Trigger"}),runstopClient:new ROSLIB.Service({ros:s.ros,name:"/runstop",serviceType:"std_srvs/SetBool"}),trajectoryClient:new ROSLIB.ActionClient({ros:s.ros,serverName:"/stretch_controller/follow_joint_trajectory",actionName:"control_msgs/FollowJointTrajectoryAction"})});function l(e){var o=new ROSLIB.ServiceRequest({data:e});c.runstopClient.callService(o,(function(e){console.log("Result for service call on "+c.runstopClient.name+": "+e.success+" - "+e.message)}))}function u(e){var o=new ROSLIB.ServiceRequest({});e.callService(o,(function(o){console.log("Result for service call on "+e.name+": "+o.success+" - "+o.message)}))}function d(e){var o=new ROSLIB.Service({ros:s.ros,name:e,serviceType:"std_srvs/Empty"});u(o)}function m(e){var o=new ROSLIB.Service({ros:s.ros,name:e,serviceType:"std_srvs/Trigger"});u(o)}function p(e){var o="{";for(var t in e)o=o+String(t)+":"+String(e[t])+", ";o+="}",console.log("generatePoseGoal( "+o+" )");var n=[],s=[];for(var t in e)n.push(t),s.push(e[t]);var r=new ROSLIB.Goal({actionClient:c.trajectoryClient,goalMessage:{trajectory:{header:{stamp:{secs:0,nsecs:0}},joint_names:n,points:[{positions:s,time_from_start:{secs:0,nsecs:1}}]}}});return console.log("newGoal created ="+r),r.on("feedback",(function(e){console.log("Feedback: "+e.sequence)})),r.on("result",(function(e){console.log("Final Result: "+e.sequence)})),r}function g(e,o){var t=e.name.indexOf(o);return e.position[t]}function v(e){return g(c.jointState,e)}function f(e){console.log("sending baseTranslate command");var o=p({translate_mobile_base:e});o.send()}function _(e){console.log("sending baseTurn command");var o=p({rotate_mobile_base:3.14*e/180});o.send()}function S(e){e?p({gripper_aperture:0}).send():p({gripper_aperture:.125}).send()}function w(e,o){if(console.log("sendIncrementalMove start: jointName ="+e),null!==c.jointState){var t=v(e);console.log(t),t+=o,console.log("poseGoal call: jointName ="+e);var n={[e]:t},s=p(n);return s.send(),!0}return!1}function y(e){console.log("attempting to sendarmMove command"),w("wrist_extension",e)}function T(e){console.log("attempting to sendliftMove command"),w("joint_lift",e)}function b(e){console.log("attempting to send wristMove command"),w("joint_wrist_yaw",3.14*e/180)}c.jointStateTopic.subscribe((function(e){null===c.jointState&&console.log("Received first joint state from ROS"),c.jointState=e}))},59807:(e,o,t)=>{t.d(o,{Z:()=>g});var n=t(83673);function s(e,o,t,s,r,a){const i=(0,n.up)("q-btn"),c=(0,n.up)("q-input"),l=(0,n.Q2)("touch-repeat");return(0,n.wg)(),(0,n.j4)(c,{outlined:"",dense:"",filled:"",min:"0","model-value":s.modelValue,"onUpdate:modelValue":s.updateModelValue},{prepend:(0,n.w5)((()=>[(0,n.wy)((0,n.Wm)(i,{flat:"",icon:"remove"},null,512),[[l,s.decrement,"0:300:100",{mouse:!0,left:!0}]])])),append:(0,n.w5)((()=>[(0,n.wy)((0,n.Wm)(i,{flat:"",icon:"add"},null,512),[[l,s.increment,"0:300:100",{mouse:!0,right:!0}]])])),_:1},8,["model-value"])}var r=t(61959);const a={props:["modelValue"],emits:["update:modelValue"],setup(e,{expose:o,emit:t}){o();const s=e,{modelValue:a}=(0,r.BK)(s);function i(){var e=u(a.value-1);t("update:modelValue",e)}function c(){var e=u(a.value+1);t("update:modelValue",e)}function l(e){t("update:modelValue",u(e))}function u(e){return(!Number.isInteger(e)||e<0)&&(e=0),e}const d={props:s,emit:t,modelValue:a,decrement:i,increment:c,updateModelValue:l,valueValidation:u,toRefs:r.BK,watch:n.YP};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}};var i=t(74260),c=t(61206),l=t(48240),u=t(90269),d=t(7518),m=t.n(d);const p=(0,i.Z)(a,[["render",s]]),g=p;m()(a,"components",{QInput:c.Z,QBtn:l.Z}),m()(a,"directives",{TouchRepeat:u.Z})},54472:(e,o,t)=>{t.r(o),t.d(o,{default:()=>C});var n=t(83673),s=t(62323),r=t(61959),a=t(29378),i=t(59807),c=t(48825);const l={class:"q-pa-md row items-start q-gutter-md flex justify-start"},u={class:"text-h6"},d={setup(e){const o=(0,c.Z)();o.notify.setDefaults({timeout:800});const t=[{id:80},{id:81},{id:82}],d=(0,r.qj)({orders:{}});function m(){o.dialog({title:"Confirm",message:"Clear orders?",cancel:!0,persistent:!0}).onOk((()=>{for(var e in d.orders)d.orders[e]=0;console.log("Orders cleared."),o.notify({type:"positive",message:"Orders cleared."})})).onOk((()=>{})).onCancel((()=>{o.notify({type:"warning",message:"Canceled."})})).onDismiss((()=>{}))}function p(){o.dialog({title:"Confirm",message:"Submit orders?",cancel:!0,persistent:!0}).onOk((()=>{const e=o.notify({type:"ongoing",message:"Submitting..."});(0,a.TP)("/sp_sm/start"),e({type:"positive",message:"Orders submitted."})})).onOk((()=>{})).onCancel((()=>{o.notify({type:"warning",message:"Canceled."})})).onDismiss((()=>{}))}return(0,n.bv)((()=>{t.forEach(((e,o)=>{d.orders[e.id]=0}))})),(e,o)=>{const a=(0,n.up)("q-card-section"),c=(0,n.up)("q-separator"),g=(0,n.up)("q-card-actions"),v=(0,n.up)("q-card"),f=(0,n.up)("q-fab-action"),_=(0,n.up)("q-fab"),S=(0,n.up)("q-page-sticky"),w=(0,n.up)("q-page");return(0,n.wg)(),(0,n.j4)(w,{padding:""},{default:(0,n.w5)((()=>[(0,n._)("div",l,[((0,n.wg)(),(0,n.iD)(n.HY,null,(0,n.Ko)(t,((e,o)=>(0,n.Wm)(v,{key:o,flat:"",bordered:"",class:"col-auto my-card"},{default:(0,n.w5)((()=>[(0,n.Wm)(a,null,{default:(0,n.w5)((()=>[(0,n._)("div",u,(0,s.zw)(e.id),1)])),_:2},1024),(0,n.Wm)(c),(0,n.Wm)(g,null,{default:(0,n.w5)((()=>[(0,n.Wm)(i.Z,{modelValue:(0,r.SU)(d).orders[e.id],"onUpdate:modelValue":o=>(0,r.SU)(d).orders[e.id]=o,modelModifiers:{number:!0}},null,8,["modelValue","onUpdate:modelValue"])])),_:2},1024)])),_:2},1024))),64))]),(0,n.Wm)(S,{position:"bottom-right",offset:[18,18]},{default:(0,n.w5)((()=>[(0,n.Wm)(_,{icon:"shopping_cart",direction:"up",color:"accent"},{default:(0,n.w5)((()=>[(0,n.Wm)(f,{onClick:p,color:"primary",icon:"shopping_cart_checkout"}),(0,n.Wm)(f,{onClick:m,color:"primary",icon:"remove_shopping_cart"})])),_:1})])),_:1})])),_:1})}}};var m=t(74260),p=t(24379),g=t(10151),v=t(25589),f=t(65869),_=t(99367),S=t(21007),w=t(39200),y=t(39975),T=t(7518),b=t.n(T);const h=(0,m.Z)(d,[["__scopeId","data-v-4c1f33b8"]]),C=h;b()(d,"components",{QPage:p.Z,QCard:g.Z,QCardSection:v.Z,QSeparator:f.Z,QCardActions:_.Z,QPageSticky:S.Z,QFab:w.Z,QFabAction:y.Z})}}]);