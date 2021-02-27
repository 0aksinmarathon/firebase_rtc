import FirebaseSignalingClient from "./FirebaseSignalingClient";

export default class RtcClient {
  constructor(remoteVideoRef, setRtcClient) {
    const config = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.firebaseSignalingClient = new FirebaseSignalingClient();
    this.remoteVideoRef = remoteVideoRef;
    this.localPeerName = "";
    this.remotePeerName = "";
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
  }
  setRtcClient() {
    this._setRtcClient(this);
  }

  async getUserMedia() {
    try {
      const constraints = { audio: true, video: true };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      console.log(err);
    }
  }

  async setMediaStream() {
    await this.getUserMedia();
    this.addTracks();
    this.setRtcClient();
  }

  addTracks() {
    this.addAudioTrack();
    this.addVideoTrack();
  }

  addAudioTrack() {
    this.rtcPeerConnection.addTrack(this.audioTrack, this.mediaStream);
  }

  addVideoTrack() {
    this.rtcPeerConnection.addTrack(this.videoTrack, this.mediaStream);
  }

  get audioTrack() {
    return this.mediaStream.getAudioTracks()[0];
  }
  get videoTrack() {
    return this.mediaStream.getVideoTracks()[0];
  }

  async offer() {
    const sessionDescription = await this.createOffer();
    await this.setLocalDescription(sessionDescription);
    await this.sendOffer();
  }

  async createOffer() {
    try {
      return await this.rtcPeerConnection.createOffer();
    } catch (e) {
      console.error(e);
    }
  }

  async setLocalDescription(sessionDescription) {
    try {
      await this.rtcPeerConnection.setLocalDescription(sessionDescription);
    } catch (e) {
      console.error(e);
    }
  }

  async sendOffer() {
    this.firebaseSignalingClient.setPeerNames(
      this.localPeerName,
      this.remotePeerName
    );
    await this.firebaseSignalingClient.sendOffer(this.localDescription);
  }

  setOnTrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if (rtcTrackEvent.track.kind !== "video") return;
      const remoteMediaStream = rtcTrackEvent.streams[0];
      this.remoteVideoRef.current.srcObject = remoteMediaStream;
      this.setRtcClient();
    };
    this.setRtcClient();
  }

  async answer(sender, sessionDescription) {
    try {
      this.remotePeerNaqme = sender;
      this.setOniceCandidateCallback();
      this.setOnTrack();
      await this.setRemoteDescription(sessionDescription);
      const answer = this.rtcPeerConnection.createAnswer();
      this.rtcPeerConnection.setLocalDescription(answer);
      console.log(answer);
      await this.sendAnswer();
    } catch (e) {
      console.error(e);
    }
  }

  async connect(remotePeerName) {
    this.remotePeerName = remotePeerName;
    this.setOniceCandidateCallback();
    this.setOnTrack();
    await this.offer();
    this.setRtcClient();
  }

  async setRemoteDescription(sessionDescription) {
    await this.rtcPeerConnection.setRemoteDescription(sessionDescription);
  }

  async sendAnswer() {
    this.firebaseSignalingClient.setPeerNames(
      this.localPeerName,
      this.remotePeername
    );

    await this.firebaseSignalingClient.sendAnswer(this.localDescription);
  }

  get localDescription() {
    return this.rtcPeerConnection.localDescription.toJSON();
  }

  async saveReceivedSessionDescription(sessionDescription) {
    try {
      await this.setRemoteDescription(sessionDescription);
    } catch (e) {
      console.error(e);
    }
  }

  setOniceCandidateCallback() {
    this.rtcPeerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        //remoteへcandidtaeを通知
      }
    };
  }

  async tartListening(localPeerName) {
    this.localPeerName = localPeerName;
    this.setRtcClient();
    await this.firebaseSignalingClient.remove(localPeerName);
    this.firebaseSignalingClient.database
      .ref(localPeerName)
      .on("value", async (snapshot) => {
        const data = snapshot.val();
        if (data === null) return;
        const { sender, sessionDescription, type } = data;
        switch (type) {
          case "offer":
            await this.answer(sender, sessionDescription);
          case "answer":
            await this.saveReceivedSessionDescription(sessionDescription);
          default:
            break;
        }
      });
  }
}
