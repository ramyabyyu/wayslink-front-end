import react, { useState, useContext, useEffect } from "react";
import styleCSS from "./CreateLink.module.css";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import Phone1 from "../../assets/Phone1.png";
import Phone2 from "../../assets/Phone2.png";
import Phone3 from "../../assets/Phone3.png";
import Phone4 from "../../assets/Phone4.png";
import Chess from "../../assets/Chess.png";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const CreateLink = ({ template }) => {
  let templateSrc;

  if (template === "phone1") templateSrc = Phone1;
  if (template === "phone2") templateSrc = Phone2;
  if (template === "phone3") templateSrc = Phone3;
  if (template === "phone4") templateSrc = Phone4;

  const [showSosmedForm, setShowSosmedForm] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  // Add card in form
  const [cardForm, setCardForm] = useState([
    { titlelinks: "", links: "" },
    { titlelinks: "", links: "" },
  ]);

  // Function for add a card when add button clicked
  const addForm = () => {
    setCardForm([...cardForm, { titlelinks: "", links: "" }]);
  };

  // Function for delete a card when delete button clicked
  const removeForm = (index) => {
    const values = [...cardForm];
    values.splice(index, 1);
    setCardForm(values);
  };

  // Function to change the value of links components
  const formOnChange = (index, e) => {
    const values = [...cardForm];
    values[index][e.target.name] = e.target.value;
    setCardForm(values);
  };

  const arr1 = cardForm.map(({ titlelinks }) => titlelinks);
  const arr2 = cardForm.map(({ links }) => links);

  // For title, description and image
  const [imagePreview, setImagePreview] = useState(null);
  const [linkData, setLinkData] = useState({
    titleform: "",
    descriptionform: "",
    imageform: "",
    template,
  });

  const mainOnChange = (e) => {
    setLinkData({
      ...linkData,
      [e.target.name]: e.target.value,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setImagePreview(url);
    }
  };

  // sosmed form
  const [imageSosmedPreview, setImageSosmedPreview] = useState(null);
  const [sosmedData, setSosmedData] = useState({
    titlesosmed: "",
    url: "",
    imagesomed: "",
  });

  const [linkID, setLinkID] = useState("");

  const handleSosmedChange = (e) => {
    setSosmedData({
      ...sosmedData,
      [e.target.name]: e.target.value,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setImageSosmedPreview(url);
    }
  };

  // handleSubmitSosmed
  const handleSubmitSosmed = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { imagesomed, titlesosmed, url } = sosmedData;

      const formData = new FormData();
      formData.set("link_id", linkID);
      formData.set("title_sosmed", titlesosmed);
      formData.set("url", url);
      formData.set("file", imagesomed[0], imagesomed[0].name);

      const response = await API.post("/sosmed", formData, config);
      console.log("somed response=", response);

      if (response.data.code === 200) {
        console.log("smosed is success");
        setSosmedData({
          imagesomed: "",
          linkId: "",
          titlesosmed: "",
          url: "",
        });
        setImageSosmedPreview(null);
      } else {
        console.log("smosed is error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // POST API
  // const handleOnSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     const formData = new FormData();
  //     formData.set("title", linkData.titleform);
  //     formData.set("description", linkData.descriptionform);
  //     formData.set("image", linkData.imageform[0], linkData.imageform[0].name);
  //     formData.set("titlelink", arr1);
  //     formData.set("link", arr2);

  //     const response = await API.post("/publishlink", formData, config);
  //     console.log(response);
  //     navigate("/myLinks");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Submit Link
  const handleSubmitLink = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { titleform, descriptionform, imageform, template } = linkData;

      const formData = new FormData();
      formData.set("titlelink", titleform);
      formData.set("descriptionlink", descriptionform);
      formData.set("file", imageform[0], imageform[0].name);
      formData.set("template", template);

      const response = await API.post("/link", formData, config);
      console.log(response);

      if (response.data.code === 200) {
        setShowSosmedForm(true);
        setLinkID(response.data.data.id);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );

        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(arr1);

  return (
    <div className={styleCSS.createLinkContent}>
      <div className={styleCSS.createLinkHeader}>
        <p>Template</p>
      </div>
      <div className={styleCSS.createLinkForm}>
        <div className={styleCSS.createLinkFormTop}>
          <p>Create Link</p>
          {/* <button className={styleCSS.formTopButton} type="submit">
              Publish Link
            </button> */}
        </div>
        <div className={styleCSS.createLinkFormBottom}>
          <div className={styleCSS.createLinkFormInput}>
            <div className={styleCSS.createLinkFormInputChild}>
              <form onSubmit={handleSubmitLink}>
                <div className={styleCSS.imagePreview}>
                  {imagePreview && <img src={imagePreview} alt="Preview" />}
                  <label for="image">Upload</label>
                  <input
                    type="file"
                    name="imageform"
                    id="image"
                    className={styleCSS.uploadButton}
                    onChange={mainOnChange}
                  />
                </div>
                <div className={styleCSS.mainInput}>
                  <label for="titleform">Title</label>
                  <input
                    type="text"
                    name="titleform"
                    onChange={mainOnChange}
                    autoComplete="off"
                    required
                  />
                  <label for="descriptionform">Description</label>
                  <input
                    type="text"
                    name="descriptionform"
                    onChange={mainOnChange}
                    autoComplete="off"
                    required
                  />
                  <div className="mt-3">
                    <button className={styleCSS.addLinkButton} type="submit">
                      Publish Link
                    </button>
                  </div>
                </div>
              </form>
              {showSosmedForm && (
                <>
                  <div className={styleCSS.secondInput}>
                    <div className={styleCSS.linksCard}>
                      <form id="sosmedForm" onSubmit={handleSubmitSosmed}>
                        <div className={styleCSS.linkImage}>
                          <img
                            src={
                              imageSosmedPreview ? imageSosmedPreview : Chess
                            }
                            alt="link image"
                          />
                          <label htmlFor="imagesomed">Upload</label>
                          <input
                            type="file"
                            id="imagesomed"
                            name="imagesomed"
                            accept="image/*"
                            className="d-none"
                            onChange={handleSosmedChange}
                          />
                        </div>
                        <div className={styleCSS.linkInput}>
                          <label for="titlesosmed">Title Link</label>
                          <input
                            type="text"
                            id="titlesosmed"
                            name="titlesosmed"
                            autoComplete="off"
                            required
                            onChange={handleSosmedChange}
                            value={sosmedData.titlesosmed}
                          />
                          <label for="url">Link</label>
                          <input
                            type="text"
                            id="url"
                            name="url"
                            autoComplete="off"
                            required
                            onChange={handleSosmedChange}
                            value={sosmedData.url}
                          />
                        </div>
                        <button
                          className={styleCSS.addLinkButton}
                          type="submit"
                        >
                          Add new Link
                        </button>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styleCSS.createLinkFormTemplatePreview}>
            <img src={templateSrc} alt="Template 2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
