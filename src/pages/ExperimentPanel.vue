<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <!-- <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <Camera :src-topic="imgTopic" :rotate="parseFloat(rotDeg)">
              <q-input v-model="imgTopic" label="CompressedImage Topic"></q-input>
              <q-input v-model="rotDeg" type="number" label="Rotation (deg)"></q-input>
            </Camera>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4">
            <Camera src-topic="/pupil/fpv_image" :rotate="0"> </Camera>
          </div>
        </div> -->
        <div>Task: <strong>current</strong></div>
        <q-btn-group rounded>
          <q-btn
            rounded
            color="primary"
            label="Toggle Task"
            @click="
              () => {
                triggerServiceByName('/clean_surface/trigger_clean_surface');
              }
            "
          />
          <q-btn
            rounded
            color="secondary"
            label="Stow"
            @click="
              () => {
                triggerServiceByName('/robot/stow');
              }
            "
          />
          <q-btn
            rounded
            color="warning"
            label="Rest"
            @click="
              () => {
                triggerServiceByName('/robot/rest');
              }
            "
          />
          <!-- <q-btn rounded color="red" label="Stop Task" /> -->
        </q-btn-group>
        <q-btn-group rounded>
          <q-btn
            rounded
            color="red"
            label="Stop"
            @click="
              () => {
                setRunstop(true);
              }
            "
          />
          <q-btn
            rounded
            color="green"
            label="Run"
            @click="
              () => {
                setRunstop(false);
              }
            "
          />
          <!-- <q-btn rounded color="red" label="Stop Task" /> -->
        </q-btn-group>
        <div>
          Facial expression: <strong>{{ lastExpression }}</strong>
        </div>
        <q-btn-group outline rounded>
          <template v-for="(expressionName, index) in expressionList" :key="index">
            <q-btn
              outline
              color="primary"
              @click="
                () => {
                  express(expressionName);
                }
              "
              :label="expressionName"
            />
          </template>
        </q-btn-group>
        <div class="row justify-start">
          <div class="col">
            Voice Command
            <q-list bordered separator style="max-width: 350px">
              <template v-for="(text, index) in speechList" :key="index">
                <q-item clickable v-ripple>
                  <q-item-section
                    @click="
                      () => {
                        speak(ttsService, text);
                      }
                    "
                  >
                    <q-item-label overline>Voice</q-item-label>
                    <q-item-label>{{ text }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <q-input outlined dense v-model="speechText">
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    color="primary"
                    icon="mic"
                    @click="
                      () => {
                        speak(ttsService, speechText);
                      }
                    "
                  />
                </template>
              </q-input>
            </q-list>
          </div>
          <div class="col">
            Machine-like Voice Command
            <q-list bordered separator style="max-width: 350px">
              <template v-for="(text, index) in machineSpeechList" :key="index">
                <q-item clickable v-ripple>
                  <q-item-section
                    @click="
                      () => {
                        speak(ttsMachineService, text);
                      }
                    "
                  >
                    <q-item-label overline>Machine Voice</q-item-label>
                    <q-item-label>{{ text }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <q-input outlined dense v-model="machineText">
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    color="primary"
                    icon="mic"
                    @click="
                      () => {
                        speak(ttsMachineService, machineText);
                      }
                    "
                  />
                </template>
              </q-input>
            </q-list>
          </div>
        </div>

        <div>
          <iframe
            width="400"
            height="250"
            src="https://vclock.com/embed/timer/#countdown=00:00:10&enabled=0&seconds=10&onzero=1&theme=1&ampm=1&sound=xylophone"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { toRefs, ref, reactive, watch, watchEffect, computed, onMounted } from "vue";
import { rosConnection, triggerServiceByName, setRunstop } from "src/utils/RosUtils";
import Camera from "src/components/Camera.vue";

const expressionList = ["focused", "confused", "happy"]; //, "sad", "angry"];
const lastExpression = ref("None");

const imgTopic = ref("/camera/color/image_raw");
const rotDeg = ref(90);

const speechText = ref("");
const machineText = ref("");

const speechList = [
  "Hello, my name is Stretch.",
  "In a minute.",
  "Hi.",
  "You should sort this by shape.",
  "You should sort this by color.",
  "You should sort this by number.",
  "By shape.",
  "By color.",
  "By number.",
  "You are welcome.",
  "No problem.",
  "Nice to meet you.",
  "Nice to meet you too.",
  "I'm not sure.",
  "Would you excuse me for a moment?",
  "Yes, how can I help you?",
  "Sorry, I don't know.",
  "Good job.",
  "Nice work.",
  "Well done.",
];

const machineSpeechList = [
  "Hi.",
  "Hello",
  "Shape",
  "Color",
  "Number",
  "You are welcome.",
  "Occupied.",
  "I don't know.",
];
var expressionTopic = new ROSLIB.Topic({
  ros: rosConnection.ros,
  name: "/robot_face/express",
  messageType: "std_msgs/String",
});

var ttsService = new ROSLIB.Service({
  ros: rosConnection.ros,
  name: "/tts",
  serviceType: "sp_msgs/Speech",
});

var ttsMachineService = new ROSLIB.Service({
  ros: rosConnection.ros,
  name: "/tts_machine",
  serviceType: "sp_msgs/Speech",
});

function express(expressionType) {
  var expressionMsg = new ROSLIB.Message({ data: expressionType });
  expressionTopic.publish(expressionMsg);
  lastExpression.value = expressionType;
}

function speak(client, text) {
  var request = new ROSLIB.ServiceRequest({ data: text });
  client.callService(request, function (result) {
    console.log(
      "Result for service call on " +
        client.name +
        ": " +
        result.success +
        " - " +
        result.message
    );
  });
}
</script>
<style scoped>
Camera {
  max-width: 100%;
}
</style>
