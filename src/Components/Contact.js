import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Button from "@mui/material/Button";
const Contact = ({ data }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({name:"",email:"",subject:"",message:""});

  const [ButtonText, setButtonText] = useState("Submit");

  const form = useRef();

  const clearData = () => {
    setMessage("");
    setEmail("");
    setSubject("");
    setName("");
    setButtonText("Submit");
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const localErrors = {};
    if(!name){
      localErrors.name = "name is required"
    }
    if(!subject){
      localErrors.subject = "subject is required"
    }
    if(!message){
      localErrors.message = "message is required"
    }
    if(!email){
      localErrors.email = "email is required"
    }
    if(email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
      localErrors.email = "Invalid email address"
    }
    setErrors(localErrors)
    if(!localErrors.name && !localErrors.email && !localErrors.subject && !localErrors.message){
      setButtonText("Loading…");
      emailjs
        .sendForm(
          "service_p52e6u8",
          "template_v4xi7jo",
          form.current,
          "FfQSjympnsCkJG2qr"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("email sent successfully we will reply soon");
            clearData();
          },
          (error) => {
            console.log(error.text);
            alert("some error happen please try again later");
            setButtonText("Submit");
          }
        );
    }
    

    // window.open(`mailto:${email}?subject=${subject}&body=${name}: ${message}`);
  };

  return (
    <section id="contact">
      <div className="row section-head">
        <div className="two columns header-col">
          <h1>
            <span>Get In Touch.</span>
          </h1>
        </div>

        <div className="ten columns">
          <p className="lead">{data?.message}</p>
        </div>
      </div>

      <div className="row">
        <div className="eight columns">
          <form
            id="contactForm"
            name="contactForm"
            ref={form}
            onSubmit={handleSubmit}
          >
            <fieldset>
              <div className="form-field">
                <label htmlFor="contactName">
                  Name <span className="required">*</span>
                </label>
                <input
                  value={name}
                  type="text"
                  defaultValue=""
                  size="35"
                  id="contactName"
                  name="contactName"
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="form-field-error">{errors.name}</span>
              </div>

              <div className="form-field">
                <label htmlFor="contactEmail">
                  Email <span className="required">*</span>
                </label>
                <input
                  value={email}
                  type="text"
                  defaultValue=""
                  size="35"
                  id="contactEmail"
                  name="contactEmail"
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <span className="form-field-error">{errors.email}</span>
                
              </div>

              <div className="form-field">
                <label htmlFor="contactSubject">Subject</label>
                <input
                  value={subject}
                  type="text"
                  defaultValue=""
                  size="35"
                  id="contactSubject"
                  name="contactSubject"
                  onChange={(e) => setSubject(e.target.value)}
                />
                <span className="form-field-error">{errors.subject}</span>
              </div>

              <div className="form-field">
                <label htmlFor="contactMessage">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  cols="50"
                  rows="15"
                  id="contactMessage"
                  name="contactMessage"
                ></textarea>
                <span className="form-field-error">{errors.message}</span>
              </div>

              <div>
                {/* <button type="submit" className="submit">
                  Submit
                </button> */}
                <Button
                  sx={{
                    fontWeight: "bold",
                    fontSize: 16,
                    padding: "12px 20px",
                  }}
                  className="submit"
                  type="submit"
                >
                  {ButtonText}
                </Button>
                <span id="image-loader">
                  <img alt="" src="images/loader.gif" />
                </span>
              </div>
            </fieldset>
          </form>

          <div id="message-warning"> Error boy</div>
          <div id="message-success">
            <i className="fa fa-check"></i>Your message was sent, thank you!
            <br />
          </div>
        </div>

        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">
            <h4>Address and Phone</h4>
            <p className="address">
              {data?.name}
              <br />
              {data?.address.city}
              <br />
              <span>{data?.phone}</span>
              <br />
              <span>{data?.email}</span>
            </p>
          </div>

          <div className="widget widget_tweets"></div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
