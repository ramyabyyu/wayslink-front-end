import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";

const PreviewLink = () => {
  const [previewLink, setPreviewLink] = useState(null);
  const [linkSosmeds, setLinkSosmeds] = useState([]);
  const { unique_link } = useParams();

  const getSosmed = async (linkId) => {
    try {
      const response = await API.get(`/sosmed/${linkId}`);
      setLinkSosmeds(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPreviewLinks = async () => {
    try {
      const response = await API.get(`/preview_link/${unique_link}`);
      setPreviewLink(response.data.data);
      getSosmed(response.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPreviewLinks();
  }, []);

  if (previewLink?.template === "phone1") {
    return (
      <Template1
        title={previewLink?.title}
        description={previewLink?.description}
        image={previewLink?.image}
        sosmeds={linkSosmeds}
      />
    );
  } else if (previewLink?.template === "phone2") {
    return (
      <Template2
        title={previewLink?.title}
        description={previewLink?.description}
        image={previewLink?.image}
        sosmeds={linkSosmeds}
      />
    );
  } else if (previewLink?.template === "phone3") {
    return (
      <Template3
        title={previewLink?.title}
        description={previewLink?.description}
        image={previewLink?.image}
        sosmeds={linkSosmeds}
      />
    );
  } else {
    return (
      <Template4
        title={previewLink?.title}
        description={previewLink?.description}
        image={previewLink?.image}
        sosmeds={linkSosmeds}
      />
    );
  }
};

export default PreviewLink;
