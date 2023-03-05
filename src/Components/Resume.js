import React, { Component } from "react";


function SkillsSection ({skillmessage,skills}){
  const renderedSkills = skills?.map(function (skills) {
    const className = "bar-expand " + skills.name.toLowerCase();
    return (
      <li key={skills.name}>
        <span style={{ width: skills.level }} className={className}></span>
        <em>{skills.name}</em>
      </li>
    );
  });
  return (
    <div className="row skill">
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
