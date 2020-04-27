import React, { Component } from 'react';
import '../Styles/Slider.css';

let timer;

class Slider extends Component {
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
          <Slide title="Vstavliu tut cho-to krasivoe i mb dlinnoe" caption="Lorem ipsum tudim sudim" active index={1} />
          <Slide title="Bla-bla-bla-bla-bla" caption="Lorem ipsum tudim sudim" index={2} />
          <Slide title="i tut tozhe bla-bla-bla)00" caption="Lorem ipsum tudim sudim" index={3} />
          <Slide title="Nu pozhalui i tut bla-bla-bla!" caption="Lorem ipsum tudim sudim" index={4} />
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

function Slide(props) {
  const { title, caption, index, active } = props;
  return (<div className={`slide slide-${index} ${active ? 'active' : null}`}>
      <div className="container">
          <div className="caption">
              <h2>{title}</h2>
              <p>{caption}</p>
          </div>
      </div>
  </div>)
}

export default Slider;
