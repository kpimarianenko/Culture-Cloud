import React, { Component } from 'react';
import '../Styles/Home.css';

let timer;

class Home extends Component {
  componentDidMount() {
    const slider = {
      slides: document.querySelectorAll(".slide"),
      prev_: document.getElementById("prev"),
      next_: document.getElementById("next"),
      createCircles: function() {
        for (let i = 0; i < slider.slides.length; i++)
        {
          const circle = document.createElement('div');
          circle.classList.add("circle");
          if (i === 0) circle.classList.add("active");
          circle.addEventListener("click", function(){
            const index = [...this.parentElement.children].indexOf(this)
            slider.index = index;
            slider.changeSlide();
          })
          document.getElementById("circles").appendChild(circle);
        }
      },
      prev: function() {
        if (slider.index === 0) slider.index = slider.slides.length-1;
        else slider.index--;
        slider.changeSlide();
      },
      next: function() {
        if (slider.index === slider.slides.length-1) slider.index = 0;
        else slider.index++;
        slider.changeSlide();
      },
      changeSlide:function() {
        document.querySelector(".slide.active").classList.remove("active");
        slider.slides[slider.index].classList.add("active");
        document.querySelector('.circle.active').classList.remove("active");
        document.querySelectorAll('.circle')[slider.index].classList.add("active");
      },
      index: 0
    }

    slider.createCircles();
    slider.prev_.addEventListener("click", slider.prev);
    slider.next_.addEventListener("click", slider.next);
    timer = setInterval(slider.next, 6000);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    return (
      <div id="main">
        <div className="slider">
          <div className="slide slide-1 active">
            <div className="container">
              <div className="caption">
                <h2>Vstavliu tut cho-to krasivoe i mb dlinnoe</h2>
                <p>Lorem ipsum tudim siudim</p>
              </div>
            </div>
          </div>
          <div className="slide slide-2">
            <div className="container">
              <div className="caption">
                <h2>Bla-bla-bla-bla-bla</h2>
                <p>Lorem ipsum tudim siudim</p>
              </div>
            </div>
          </div>
          <div className="slide slide-3">
            <div className="container">
              <div className="caption">
                <h2>i tut tozhe bla-bla-bla)00</h2>
                <p>Lorem ipsum tudim siudim</p>
              </div>
            </div>
          </div>
          <div className="slide slide-4">
            <div className="container">
              <div className="caption">
                <h2>Nu pozhalui i tut bla-bla-bla!</h2>
                <p>Lorem ipsum tudim siudim</p>
              </div>
            </div>
          </div>
          <div className="controls">
            <div className="controls-inner">
              <img className="slider-control" src="/images/back.svg" alt="back arrow" id="prev" />
              <div id="circles">
              </div>
              <img className="slider-control" src="/images/forward.svg" alt="forward arrow" id="next" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
