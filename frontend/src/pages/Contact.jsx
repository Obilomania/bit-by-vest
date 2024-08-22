import React from "react";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";

const background = require("../assets/BG-IMG.jpg");

const Contact = () => {
  return (
    <MainLayout>
      <ContactPage>
        <img src={background} alt="" className="bg-img" />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2 className="heading">Contact Us</h2> <br /> 
        <div className="contact-form">
          {/* <form onSubmit={handleSubmit} ref={form}> */}
          <form>
            <div className="top-form">
              <div className="form-input">
                <input
                  type="text"
                  placeholder="Full Name *"
                  name="name"
                  required
                  //   value={contactInfo.name}
                  //   onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="form-input">
                <input
                  type="email"
                  placeholder="Email Address *"
                  name="email"
                  required
                  //   value={contactInfo.email}
                  //   onChange={(e) => handleInput(e)}
                />
              </div>
            </div>
            <div className="form-message">
              <textarea
                placeholder="Message *"
                cols={30}
                rows={10}
                name="message"
                required
                // value={contactInfo.message}
                // onChange={(e) => handleInput(e)}
              ></textarea>
            </div>
            <button type="submit">SEND MESSAGE</button>
          </form>
        </div>
      </ContactPage>
    </MainLayout>
  );
};

const ContactPage = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  height: fit-content;
  padding-top: 5rem;
  padding-bottom: 3rem;
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .heading {
    position: relative;
    margin: 0 auto;
    width: 100%;
  }
  .contact-form {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    width: 100%;
    position: relative;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 40%;
    gap: 1rem;
  }
  .top-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 2%;
  }
  form .form-message,
  form .form-input {
    width: 100%;
  }
  textarea {
    width: 100%;
    resize: none;
    padding: 0.5rem 1rem;
    border: 1px solid var(--light-black);
    background: none;
    outline: none;
    color: var(--primary);
    &::placeholder {
      color: var(--primary);
    }
  }
  .form-input input {
    outline: none;
    width: 100%;
    padding: 0.5rem 1rem;
    background: none;
    color: var(--primary);
    border: 1px solid var(--light-black);
    &::placeholder {
      color: var(--primary);
    }
  }
  button {
    border: 1px solid var(--primary);
    background: var(--primary);
    color: white;
    padding: 0.5rem 2rem;
    font-weight: 500;
    letter-spacing: 1px;
    transition: var(--transition);
    &:hover {
      border: 1px solid white;
      color: var(--primary);
      background: none;
      transition: var(--transition);
    }
  }
  @media screen and (max-width: 1200px) {
    .hero-content h1 {
      font-size: 1.5rem;
    }
    .hero-content p {
      width: 90%;
      text-align: center;
    }
    .contact-form {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      width: 100%;
    }
    form {
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      width: 100%;
      gap: 1rem;
    }
    .top-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 2%;
    }
    form .form-message,
    form .form-input {
      width: 100%;
    }
    textarea {
      width: 100%;
      resize: none;
      padding: 0.5rem 1rem;
    }
    .form-input input {
      width: 100%;
      padding: 0.5rem 1rem;
    }
    button {
      border: 1px solid var(--primary);
      background: var(--primary);
      color: white;
      padding: 0.5rem 2rem;
      font-weight: 500;
      letter-spacing: 1px;
    }
  }
  @media screen and (max-width: 900px) {
    .hero-content h1 {
      font-size: 1.5rem;
    }
    .hero-content p {
      width: 90%;
      text-align: center;
    }
    .contact-form {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      width: 100%;
    }
    form {
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      width: 100%;
      gap: 1rem;
    }
    .top-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      gap: 1rem;
    }
    form .form-message,
    form .form-input {
      width: 100%;
    }
    textarea {
      width: 100%;
      resize: none;
      padding: 0.5rem 1rem;
    }
    .form-input input {
      width: 100%;
      padding: 0.5rem 1rem;
      margin-top: 1rem;
    }
    button {
      border: 1px solid var(--primary);
      background: var(--primary);
      color: white;
      padding: 0.5rem 2rem;
      font-weight: 500;
      letter-spacing: 1px;
      width: 100%;
    }
  }
  @media screen and (max-width: 600px) {
    .hero-content h1 {
      font-size: 1.5rem;
    }
    .hero-content p {
      width: 90%;
      text-align: center;
    }
    .contact-form {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      width: 100%;
    }
    form {
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      width: 100%;
      gap: 1rem;
    }
    .top-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      gap: 1rem;
    }
    form .form-message,
    form .form-input {
      width: 100%;
    }
    textarea {
      width: 100%;
      resize: none;
      padding: 0.5rem 1rem;
    }
    .form-input input {
      width: 100%;
      padding: 0.5rem 1rem;
      /* margin-top: .8rem; */
    }
    button {
      border: 1px solid var(--primary);
      background: var(--primary);
      color: white;
      padding: 0.5rem 2rem;
      font-weight: 500;
      letter-spacing: 1px;
      width: 100%;
    }
  }
  @media screen and (max-width: 420px) {
    .hero-content h1 {
      font-size: 1.5rem;
    }
    .hero-content p {
      width: 90%;
      text-align: center;
    }
    .contact-form {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      width: 100%;
    }
    form {
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      width: 100%;
      gap: 1rem;
    }
    .top-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      /* gap: 1rem; */
    }
    form .form-message,
    form .form-input {
      width: 100%;
    }
    textarea {
      width: 100%;
      resize: none;
      padding: 0.5rem 1rem;
    }
    .form-input input {
      width: 100%;
      padding: 0.5rem 1rem;
      /* margin-top: .8rem; */
    }
    button {
      border: 1px solid var(--primary);
      background: var(--primary);
      color: white;
      padding: 0.5rem 2rem;
      font-weight: 500;
      letter-spacing: 1px;
      width: 100%;
    }
  }
  @media screen and (max-width: 350px) {
    .hero-content h1 {
      font-size: 1.5rem;
    }
    .hero-content p {
      width: 90%;
      text-align: center;
    }
    .contact-form {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      width: 100%;
    }
    form {
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      width: 100%;
      gap: 1rem;
    }
    .top-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      gap: 1rem;
    }
    form .form-message,
    form .form-input {
      width: 100%;
    }
    textarea {
      width: 100%;
      resize: none;
      padding: 0.5rem 1rem;
    }
    .form-input input {
      width: 100%;
      padding: 0.5rem 1rem;
      /* margin-top: .8rem; */
    }
    button {
      border: 1px solid var(--primary);
      background: var(--primary);
      color: white;
      padding: 0.5rem 2rem;
      font-weight: 500;
      letter-spacing: 1px;
      width: 100%;
    }
  }
`;
export default Contact;
