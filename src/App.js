import React, { Component } from "react";
import Navigation from "./Component/Navigation/Navigation";
import FaceRecognition from "./Component/FaceRecognition/FaceRecognition";
import Logo from "./Component/Logo/Logo";
import ImageLinkForm from "./Component/ImageLinkForm/ImageLinkForm";
import SignIn from "./Component/SignIn/SignIn";
import Register from "./Component/Register/Register";
import Rank from "./Component/Rank/Rank";
import ParticlesBg from "particles-bg";
import "./App.css";

const Particles = () => {
  return (
    <>
      <ParticlesBg className="particles" type="cobweb" bg={true} num={1} />
    </>
  );
};

class App extends Component {
  // use the constructor to catch
  constructor() {
    super();
    this.state = {
      input: "",
      // imageUrl:'',
      box: {},
      route: "signIn",
      isSignIn: false,
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0]
      .region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFacebox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  };

  onBtnSubmit = () => {
    // this.setState({imageUrl: this.state.input});
    const raw = JSON.stringify({
      user_app_id: {
        user_id: "t510r1ll3dij",
        app_id: "my-first-application",
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input,
            },
          },
        },
      ],
    });

    fetch(
      "https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key 8508e00d64b743728cd13de8bc70183b",
        },
        body: raw,
      }
    )
      .then((response) => response.text())
      .then((result) => this.displayFacebox(this.calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signOut") {
      this.setState({ isSignIn: false });
    } else if (route === "home") {
      this.setState({ isSignIn: true });
    }
    this.setState({ route: route });
   
  };

  render() {
    return (
      <div className="App">
        <Particles />
        <Navigation isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange} />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onBtnSubmit={this.onBtnSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.input} />
          </div>
        ) : this.state.route === "signIn" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;

// https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs
