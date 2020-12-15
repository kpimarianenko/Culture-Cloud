import React, { useState } from 'react';
import '../Styles/Slider.css';
import { useEffect } from 'react';

export default function Slider(props) {
  const [slider, setSlider] = useState({})

  useEffect(() => {
    const slider_ = {
      slides: document.querySelectorAll(".slide"),
      prev_: document.getElementById("prev"),
      next_: document.getElementById("next"),

      prev: () => {
        if (slider_.index === 0) slider_.index = slider_.slides.length-1;
        else slider_.index--;
        slider_.changeSlide();
      },

      next: () => {
        if (slider_.index === slider_.slides.length-1) slider_.index = 0;
        else slider_.index++;
        slider_.changeSlide();
      },

      changeSlide: () => {
        document.querySelector(".slide.active").classList.remove("active");
        slider_.slides[slider_.index].classList.add("active");
        document.querySelector('.circle.active').classList.remove("active");
        document.querySelectorAll('.circle')[slider_.index].classList.add("active");
      },

      timerId: null,
      index: 0
    }

    slider_.timerId = setInterval(slider_.next, 6000);
    setSlider(slider_)

    return () => {
      clearInterval(slider_.timerId);
    }
  }, [])

  return (
    <div id="main">
      <div className="slider">
        <Slide title="Great excitement!" caption="Discover something interesting and new" active index={1} />
        <Slide title="Fast and Beauty" caption="Use your gadjet with comfort" index={2} />
        <Slide title="New technology from tommorow but today" caption="Best cloud services in your hands" index={3} />
        <Slide title="The best or nothing!" caption="All we do is for you" index={4} />
        <Controls slider={slider}/>
      </div>
    </div>
  )
}

function Slide(props) {
  const { title, caption, index, active } = props;
  return (<div className={`slide slide-${index} ${active ? 'active' : ''}`}>
      <div className="caption-container">
          <div className="caption">
              <h2>{title}</h2>
              <p>{caption}</p>
          </div>
      </div>
  </div>)
}

function Controls(props) {
  const { slider } = props;
  return (<div className="controls">
  <div className="controls-inner">
    <img className="slider-control" onClick={slider.prev} src="/images/back.svg" alt="back arrow" id="prev" />
      <Circles slider={ slider } />
    <img className="slider-control" onClick={slider.next} src="/images/forward.svg" alt="forward arrow" id="next" />
  </div>
</div>)
}

function Circles(props) {
  const { slider } = props;
  const [circles, setCircles] = useState(null)

  useEffect(() => {
    if (!slider.slides) return;
    const circlesArr = [];

    for (let i = 0; i < slider.slides.length; i++)
    {
      function changeSlideOnCircle(e){
        const self = e.target;
        const index = [...self.parentElement.children].indexOf(self)
        slider.index = index;
        slider.changeSlide();
      }

      const circle = <div key={i} className={i === 0 ? "circle active" : "circle"} onClick={changeSlideOnCircle}></div>
      circlesArr.push(circle);
    }
    setCircles(circlesArr)
  }, [slider])

  return (
    <div id="circles">
      {circles}
    </div>
  )
}
