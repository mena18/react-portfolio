import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Lightbox from "react-image-lightbox";

import {
  Typography,
  Box,
  Modal,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Stack } from "@mui/system";
import "react-image-lightbox/style.css"; // T

const NormalModalstyle = {
  position: "absolute",

  width: "90%",
  height: "80%",
  maxHeight: "720px",
  maxWidth: "1000px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowX: "hidden",
  overflowY: "scroll",
};

function ImageComponent({ src, handleClick }) {
  return (
    <img
      style={{ cursor: "pointer" }}
      src={"images/portfolio/" + src}
      onClick={handleClick}
      alt={src}
    />
  );
}

function CarouselBody({
  project,
  handleModalClose,
  isLightBoxOpen,
  setIsLightBoxOpen,
  lightBoxPhotoIndex,
  setLightBoxPhotoIndex,
  images,
  setImages,
}) {
  const handleImageClicked = () => {
    setIsLightBoxOpen(true);
    setLightBoxPhotoIndex(0);
    setImages(
      project.images.map((image) => {
        return "images/portfolio/" + image;
      })
    );
    handleModalClose();
  };

  const data =
    project?.images?.length > 1 ? (
      <ImageComponent
        src={project.images[0]}
        handleClick={handleImageClicked}
      />
    ) : (
      <ImageComponent src={project.image} handleClick={handleImageClicked} />
    );

  return (
    <>
      {/* <button type="button" onClick={() => setIsOpen(true)}>
        Open Lightbox
      </button> */}
      {data}
    </>
  );
}

function SkillsBody({ project }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={"row"}
      spacing={1}
      alignItems={isSmallScreen ? "flex-start" : "center"}
      justifyContent={isSmallScreen ? "flex-start" : "center"}
      flexWrap={"wrap"}
    >
      {project?.skills?.map((skill) => {
        return (
          <Chip
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              mt: isSmallScreen ? "10px !important" : "0px",
              ml: isSmallScreen ? "5px !important" : "0px",
            }}
            label={skill}
            color="primary"
          />
        );
      })}
    </Stack>
  );
}

function Buttons({ project }) {
  return (
    <Stack
      direction={"column"}
      spacing={3}
      alignItems="flex-start"
      justifyContent={"flex-start"}
      sx={{ fontSize: "1.5em" }}
    >
      {Object.keys(project?.links).map((link_type, index) => {
        const url = project.links[link_type];

        return (
          <>
            {url ? (
              <a
                className="project_button"
                key={index}
                target={"_blank"}
                rel="noopener noreferrer"
                href={url}
              >
                <u>{link_type}</u>
              </a>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </Stack>
  );
}
function ModalBody({
  open,
  handleClose,
  project,
  isLightBoxOpen,
  setIsLightBoxOpen,
  lightBoxPhotoIndex,
  setLightBoxPhotoIndex,
  images,
  setImages,
}) {
  const ProjectDescription = project?.description
    ? `<ul><li style="line-height: 2.2em;">${project?.description?.join(
        "</li><li>"
      )}</li></ul>`
    : project.small_description;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={NormalModalstyle}>
        <Stack spacing={2} direction={"column"}>
          <Typography id="modal-modal-title" variant="h3" component="h3">
            {project.title}
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="p"
            component="p"
            sx={{ mt: 2, lineHeight: 5 }}
            dangerouslySetInnerHTML={{ __html: ProjectDescription }}
          ></Typography>
          <SkillsBody project={project} />
          <Buttons project={project} />
          <CarouselBody
            project={project}
            handleModalClose={handleClose}
            isLightBoxOpen={isLightBoxOpen}
            setIsLightBoxOpen={setIsLightBoxOpen}
            lightBoxPhotoIndex={lightBoxPhotoIndex}
            setLightBoxPhotoIndex={setLightBoxPhotoIndex}
            images={images}
            setImages={setImages}
          />
        </Stack>
      </Box>
    </Modal>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SingleProject({ handleOpen, project }) {
  var projectImage = "images/portfolio/" + project.image;

  return (
    <div key={project.title} className="columns portfolio-item">
      <div onClick={handleOpen} className="item-wrap">
        {/* <a href={project.url} title={project.title}> */}
        <img alt={project.title} src={projectImage} />
        <div className="overlay">
          <div className="portfolio-item-meta">
            <h5>{project.title}</h5>
            <p>{project.small_description}</p>
          </div>
        </div>
        {/* <div className="link-icon">
          <i className="fa fa-link"></i>
        </div> */}
        {/* </a> */}
      </div>
    </div>
  );
}

function ProjectGroup({ handleOpen, projects }) {
  const projectsView = projects?.map((project, index) => {
    return (
      <SingleProject
        handleOpen={() => {
          handleOpen(index);
        }}
        project={project}
      />
    );
  });

  return <div>{projectsView}</div>;
}

function TestPortfolio({ data }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const tabsSmallStyle = isSmallScreen
    ? {
        flexDirection: "column",
        alignItems: "flex-start",
      }
    : {};

  const [open, setOpen] = useState(-1);
  const handleOpen = (v) => setOpen(v);
  const handleClose = () => setOpen(-1);
  const [activeProject, setActiveProject] = useState({});
  const [value, setValue] = useState(0);

  //  light box states
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [lightBoxPhotoIndex, setLightBoxPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const act = data?.projects?.[value]?.projects[open];
    if (act) {
      setActiveProject(act);
    } else {
      setActiveProject({});
    }
  }, [open, data, value]);

  const projects = data?.projects?.[value]?.projects;
  const projectsView = (
    <ProjectGroup handleOpen={handleOpen} projects={projects} />
  );

  return (
    <section id="portfolio">
      <ModalBody
        open={open !== -1}
        handleClose={handleClose}
        project={activeProject}
        isLightBoxOpen={isLightBoxOpen}
        setIsLightBoxOpen={setIsLightBoxOpen}
        lightBoxPhotoIndex={lightBoxPhotoIndex}
        setLightBoxPhotoIndex={setLightBoxPhotoIndex}
        images={images}
        setImages={setImages}
      />
      {isLightBoxOpen && (
        <Lightbox
          mainSrc={images[lightBoxPhotoIndex]}
          nextSrc={images[(lightBoxPhotoIndex + 1) % images.length]}
          prevSrc={
            images[(lightBoxPhotoIndex + images.length - 1) % images.length]
          }
          onCloseRequest={() => setIsLightBoxOpen(false)}
          onMovePrevRequest={() =>
            setLightBoxPhotoIndex(
              (lightBoxPhotoIndex + images.length - 1) % images.length
            )
          }
          onMoveNextRequest={() =>
            setLightBoxPhotoIndex((lightBoxPhotoIndex + 1) % images.length)
          }
        />
      )}
      <div className="row">
        <div className="twelve columns">
          <h1>Check Out Some of My Works.</h1>

          <div id="portfolio-wrapper" className="bgrid-quarters">
            <Box>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider", m: "1em 3em" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  TabIndicatorProps={{ sx: { display: "none" } }}
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      flexWrap: "wrap",
                      ...tabsSmallStyle,
                    },
                  }}
                >
                  {data?.projects?.map((projectsGroup, index) => {
                    return (
                      <Tab
                        sx={{ fontSize: 16 }}
                        label={projectsGroup.title}
                        {...a11yProps(index)}
                      />
                    );
                  })}
                </Tabs>
              </Box>

              {data?.projects?.map((_, index) => {
                return (
                  <TabPanel value={value} index={index}>
                    {projectsView}
                  </TabPanel>
                );
              })}
            </Box>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestPortfolio;
