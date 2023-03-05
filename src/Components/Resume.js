import React, { Component, useEffect,useState,useRef } from "react";


// use it later
// const useElementOnScreen = (options) => {
//   const containerRef = useRef(null)
//   const [ isVisible, setIsVisible ] = useState(false)

//   const callbackFunction = (entries,observer) => {
//     const [ entry ] = entries
//     setIsVisible(entry.isIntersecting)
    
//   }

//   useEffect(() => {
    
//     const observer = new IntersectionObserver(callbackFunction, options)
//     if (containerRef.current) observer.observe(containerRef.current)
    
//     return () => {
//       if(containerRef.current) observer.unobserve(containerRef.current)
//     }
//   }, [containerRef, options])

//   return [containerRef, isVisible]
// }


function SkillsSection ({skillmessage,skills}){
  const [renderedSkills,setRenderedSkills] = useState(null);
  const ref = useRef(null);
  useEffect(()=>{
    
    let observer = new IntersectionObserver((entries, observer) => { // This takes a callback function that receives two arguments: the elements list and the observer instance.
      entries.forEach(entry => {
        // `entry.isIntersecting` will be true if the element is visible
        
        if(entry.isIntersecting) {
        if(skills){

          const newSkills = (skills?.map(function (skills) {
            const className = "bar-expand " + skills.name.toLowerCase();
            return (
              <li key={skills.name}>
                <span style={{ width: skills.level }} className={className}></span>
                <em>{skills.name}</em>
              </li>
            );
          }))
          setRenderedSkills(newSkills)
          console.error(newSkills)
        }
        // We are removing the observer from the element after adding the active class
        if(ref?.current){
          observer.unobserve(ref.current)
        }
      }
    })
  })
  if(ref?.current){
    observer.observe(ref.current)
  }

  },[ref,skills])


  
  // const renderedSkills = skills?.map(function (skills) {
  //   const className = "bar-expand " + skills.name.toLowerCase();
  //   return (
  //     <li key={skills.name}>
  //       <span style={{ width: skills.level }} className={className}></span>
  //       <em>{skills.name}</em>
  //     </li>
  //   );
  // });
  return (
    <div className="row skill" ref={ref}>
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <p>{skillmessage}</p>

            <div className="bars">
              <ul className="skills">{renderedSkills}</ul>
              
            </div>
          </div>
        </div>
  )
}


class Resume extends Component {
  render() {
    if (this.props.data) {
      var skillmessage = this.props.data.skillmessage;
      var skills = this.props.data.skills;
      var education = this.props.data.education.map(function (education) {
        return (
          <div key={education.school}>
            <h3>{education.school}</h3>
            {education?.degrees?.map((degree) => {
              return (
                <>
                  <p className="info">
                    {degree.degree} <span>&bull;</span>
                    <em className="date">{degree.graduated}</em>
                  </p>
                  <p>{degree.description}</p>
                  <br />
                </>
              );
            })}
          </div>
        );
      });
      var work = this.props.data.work.map(function (work) {
        return (
          <div key={work.company}>
            <h3>{work.company}</h3>
            <p className="info">
              {work.title}
              <span>&bull;</span> <em className="date">{work.years}</em>
            </p>
            {/* <p dangerouslySetInnerHTML={{ __html: work.description }}></p> */}
            <ul style={{ listStyleType: "disc", marginLeft: 20 }}>
              {work?.description?.map((feature) => {
                return <li>{feature}</li>;
              })}
            </ul>
          </div>
        );
      });
      
    }

    return (
      <section id="resume">
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>Education</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">{education}</div>
            </div>
          </div>
        </div>

        <div className="row work">
          <div className="three columns header-col">
            <h1>
              <span>Experience</span>
            </h1>
          </div>

          <div className="nine columns main-col">{work}</div>
        </div>

        <SkillsSection skillmessage={skillmessage} skills={skills}/>
      </section>
    );
  }
}

export default Resume;
