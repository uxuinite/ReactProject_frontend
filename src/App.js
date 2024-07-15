import { useState, useEffect } from "react";
import { request } from "./util/request";
import "./App.css";

function App() {
  const [List, setList] = useState([]);
  const [formData, setFormData] = useState({
    Title: "",
    Image: null,
    Description: "",
    CreateBy: ""
  });  
  
  
  const [selectedImage, setSelectedImage] = useState(null);



  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await request("items", "get", {});
    console.log(res);
    if (res) {
      setList(res.List);
      console.log("success fetch API");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];


    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    if (file) {
      setFormData({
        ...formData,
        Image: file
      });
    }
  };

  const clearform = () =>{
    // Clear the form data
    setFormData({
      Title: "",
      Image: null,
      Description: "",
      CreateBy: ""
    });
    setSelectedImage(null);
    // Clear the file input
    document.getElementById("file-input").value = "";
  }
  const handleSubmit = async (event) => {

    event.preventDefault();
    const { Title, Image, Description, CreateBy } = formData;
    const data = new FormData();
    data.append("Title", Title);
    data.append("image_upload", Image); // Make sure this matches the field name used in multer
    data.append("Description", Description);
    data.append("CreateBy", CreateBy);

    try {
      const response = await fetch("http://localhost:8081/api/items", {
        method: "POST",
        body: data
      });

      if (response.ok) {
        console.log("Successfully submitted");
        getList(); // Refresh the list after submission
        clearform();
      } else {
        console.log("Failed to submit", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div >
      <div className="App">
      {List?.map((item, index) => (
        <div  className="ItemsBox" key={item.Id}>
          <h3>ID : {item.Id} </h3>
          <h3>Title : {item.Title} </h3>
          
          
            
          <img
            src={`http://localhost/image_path/vorsa_news/${item.Image}`}
            alt={item.Title}
            style={{ width: "100%", height: "60%", objectFit: "cover" }}
          />
          


          <h3>Description : {item.Description} </h3>
          <h3>CreateBy : {item.CreateBy} </h3>
          <h3>CreateAt : {item.CreateAt} </h3>
        </div>
      ))}
      
      </div>



<form onSubmit={handleSubmit}>
        <div className="formInput">
          <input
            type="text"
            name="Title"
            placeholder="Title"
            value={formData.Title}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="Description"
            placeholder="Description"
            value={formData.Description}
            onChange={handleInputChange}
          />
          <input
            type="file"
            id="file-input"
            name="image_upload"
            onChange={handleImageChange}
            style={selectedImage && { display: "none" } }

          />
          {selectedImage && (
            <div>
              <h3>Selected Image:</h3>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "300px", height: "auto" }}
              />
            </div>
          )}
          <input
            type="text"
            name="CreateBy"
            placeholder="Create By"
            value={formData.CreateBy}
            onChange={handleInputChange}
          />
          <input
            type="submit"
            value="Submit"
          />
        </div>
      </form>




    </div>
  );
}

export default App;
