import React, { Component } from 'react';


function SingleProject(props) {
  var projectImage = 'images/portfolio/'+props.project.image;
  return (

    <div key={props.project.title} className="columns portfolio-item">
      <div className="item-wrap">
        <a href={props.project.url} title={props.project.title}>
          <img alt={props.project.title} src={projectImage} />
          <div className="overlay">
              <div className="portfolio-item-meta">
            <h5>{props.project.title}</h5>
                <p>{props.project.category}</p>
              </div>
            </div>
          <div className="link-icon"><i className="fa fa-link"></i></div>
        </a>
      </div>
    </div>

  )
} 



function ProjectGroup(props){
  var title = props.projects.title
  var projects = props.projects.projects.map(function(project){
    console.log(project)
    return (
        <SingleProject project={project} />

    )
  })

  return (
    <div>
      <div className={props.projects.style}>
        <h1 >{props.projects.title}</h1>
      </div>
      {projects}
      <hr/>
    </div>
  )
}



class Portfolio extends Component {
  render() {

    if(this.props.data){
      var projects = this.props.data.projects.map(function(projects){
        console.log(projects)
        return (

            // <SingleProject project={projects} />
            <ProjectGroup projects={projects} />

        )
      })
    }

    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check Out Some of My Works.</h1>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;
