import React, { useState } from "react";
import DropDown from "../componentsConvenio/DropDown";
import Hero from "../componentsConvenio/Hero";
import InfoSection from "../componentsConvenio/InfoSection";
import Navbar from "../componentsAdmin/Navbar";
import { InfoData, InfoDataTwo } from "../componentsConvenio/dataConvenios/InfoData";
import { SliderData } from "../componentsConvenio/dataConvenios/SliderData";
import GlobalStyle from "../globalStyles";

function ConveniosPage1() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <GlobalStyle />
      <Navbar toggle={toggle} />
      <DropDown isOpen={isOpen} toggle={toggle} />
      <Hero slides={SliderData} />
  
    </>
  );
}

export default ConveniosPage1;